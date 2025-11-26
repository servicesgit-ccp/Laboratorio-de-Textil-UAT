<?php

namespace App\Http\Services;

use App\Models\Style;
use App\Models\Terminology;
use App\Models\Test;
use App\Models\TestRequest;
use App\Models\TestResult;
use App\Models\TestType;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class TestRequestService
{

    protected $mTestRequest;
    protected $mTest;
    protected $mTestResult;
    protected $mTestType;
    protected $mTerminology;
    protected $mStyle;

    protected $sRecentActivity;

    public function __construct()
    {
        $this->mTestRequest = new TestRequest();
        $this->mTest = new Test();
        $this->mTestResult = new TestResult();
        $this->mTestType = new TestType();
        $this->mTerminology = new Terminology();
        $this->mStyle = new Style();
        $this->sRecentActivity = new RecentActivityService();
    }

    public function getAllTestRequest(
        int $perPage = 10,
        ?string $search = null,
        $status = null,
        ?string $dateRange = null
    ) {
        $query = $this->mTestRequest
            ->with(['test', 'test.results', 'style', 'style.provider', 'style.department']);

        if ($search) {
            $query->where(function ($qq) use ($search) {
                $qq->where('number', 'like', "%{$search}%");
            });
        }

        if ($status !== null && $status !== '' && (int) $status !== 4) {
            $query->where('status', (int) $status);
        }

        if ($dateRange) {
            $parts = explode(' a ', $dateRange);

            if (count($parts) === 2) {
                [$fromStr, $toStr] = $parts;

                try {
                    $from = Carbon::createFromFormat('d/m/Y', trim($fromStr))->startOfDay();
                    $to   = Carbon::createFromFormat('d/m/Y', trim($toStr))->endOfDay();
                    $query->whereBetween('created_at', [$from, $to]);
                } catch (\Throwable $e) {
                    // \Log::warning('Rango de fechas inválido en getAllTestRequest', [
                    //     'dateRange' => $dateRange,
                    //     'error' => $e->getMessage(),
                    // ]);
                }
            }
        }

        return $query->orderByDesc('id')
            ->paginate($perPage)
            ->withQueryString();
    }
    public function showTestRequest($id)
    {
        return $this->mTestRequest::with(['test', 'test.results', 'style', 'style.provider', 'style.department'])->findOrFail($id);
    }

    public function storeTest(array $data)
    {
        DB::beginTransaction();
        try {
            $testRequest = $this->mTestRequest->create([
                'user_id' => 1,
                'style_id' => $data['style_id'] ?? null,
                'item' => $data['item'],
                'status' => 0,
                'number' => $this->generateTestNumber(),
                'notes' => $data['notes']
            ]);

            $test = $this->mTest->create([
                'test_request_id' => $testRequest->id,
            ]);

            $content = [];

            foreach ($data['test_type_ids'] as $testTypeId) {
                $testType = $this->mTestType::find($testTypeId);
                if (!$testType) continue;

                $terminologies = $this->mTerminology::where('test_type_id', $testTypeId)->get();

                $groupKey = $testType->name_es ?? $testType->name;
                $content[$groupKey] = [];

                foreach ($terminologies as $term) {
                    $content[$groupKey][$term->id] = [
                        'label' => $term->name,
                        'display_name' => $term->display_name_es,
                        'value' => null,
                    ];
                }

                $content[$groupKey]['img'] = [];
            }

            $this->mTestResult->create([
                'test_id' => $test->id,
                'content' => $content,
            ]);

            DB::commit();

            $this->sRecentActivity->registerActivity(
                "Nueva solicitud creada",
                "El usuario creó una nueva solicitud de pruebas",
                "tabler:clipboard-plus"
            );

            return $testRequest;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw ValidationException::withMessages([
                'error' => 'Error al crear la solicitud: ' . $e->getMessage(),
            ]);
        }
    }

    public function updateTest(int $id, array $data)
    {
        DB::beginTransaction();

        try {
            $testRequest = $this->mTestRequest
                ->with(['test.results'])
                ->findOrFail($id);

            $testRequest->update([
                'style_id' => $data['style_id'] ?? null,
                'item'     => $data['item'],
                'notes'    => $data['notes'] ?? null,
            ]);

            $test = $testRequest->test()->first();

            if (!$test) {
                $test = $this->mTest->create([
                    'test_request_id' => $testRequest->id,
                ]);
            }

            $existingResult = $test->results()->first();
            $existingContent = $existingResult?->content ?? [];

            $content = [];

            $testTypeIds = $data['test_type_ids'] ?? [];

            foreach ($testTypeIds as $testTypeId) {
                $testType = $this->mTestType::find($testTypeId);
                if (!$testType) {
                    continue;
                }

                $terminologies = $this->mTerminology::where('test_type_id', $testTypeId)->get();

                $groupKey = $testType->name_es ?? $testType->name;
                $content[$groupKey] = [];

                foreach ($terminologies as $term) {
                    $oldValue = $existingContent[$groupKey][$term->id]['value'] ?? null;

                    $content[$groupKey][$term->id] = [
                        'label'        => $term->name,
                        'display_name' => $term->display_name_es,
                        'value'        => $oldValue,
                    ];
                }

                $content[$groupKey]['img'] = $existingContent[$groupKey]['img'] ?? [];
            }

            if ($existingResult) {
                $existingResult->update([
                    'content' => $content,
                ]);
            } else {
                $this->mTestResult->create([
                    'test_id' => $test->id,
                    'content' => $content,
                ]);
            }

            DB::commit();

            $this->sRecentActivity->registerActivity(
                "Solicitud actualizada",
                "El usuario actualizó la solicitud de pruebas #{$testRequest->number}",
                "tabler:clipboard-check"
            );

            return $testRequest->fresh(['test.results', 'style', 'style.provider', 'style.department']);
        } catch (\Throwable $e) {
            DB::rollBack();
            throw ValidationException::withMessages([
                'error' => 'Error al actualizar la solicitud: ' . $e->getMessage(),
            ]);
        }
    }

    public function generateTestNumber()
    {
        $max = $this->mTestRequest
            ->selectRaw('COUNT(*) as count')
            ->whereRaw('EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM SYSDATE)')
            ->first();
        return 'CCP0' . date('Y') . '' . date('m') . '' . ($max->count + 1);
    }

    public function getTestRequestStats()
    {
        $now = now();

        // Conteo actual
        $total = $this->mTestRequest->count();
        $pending = $this->mTestRequest->where('status', 0)->count();
        $send = $this->mTestRequest->where('status', 2)->count();
        $finished = $this->mTestRequest->where('status', 1)->count();

        // Mes pasado
        $lastMonth = $now->copy()->subMonth();

        $totalLastMonth = $this->mTestRequest
            ->whereMonth('created_at', $lastMonth->month)
            ->whereYear('created_at', $lastMonth->year)
            ->count();

        $finishedLastMonth = $this->mTestRequest
            ->where('status', 1)
            ->whereMonth('created_at', $lastMonth->month)
            ->whereYear('created_at', $lastMonth->year)
            ->count();

        // Semana pasada (para pendientes)
        $pendingLastWeek = $this->mTestRequest
            ->where('status', 0)
            ->whereBetween('created_at', [
                $now->copy()->subWeek()->startOfWeek(),
                $now->copy()->subWeek()->endOfWeek()
            ])
            ->count();

        return [
            'total' => $total,
            'pending' => $pending,
            'send' => $send,
            'finished' => $finished,

            // Variaciones
            'total_variation' => $this->variationCalc($totalLastMonth, $total),
            'pending_variation' => $this->variationCalc($pendingLastWeek, $pending),
            'send_variation' => $this->variationCalc($totalLastMonth, $send),
            'finished_variation' => $this->variationCalc($finishedLastMonth, $finished),
        ];
    }

    private function variationCalc($prev, $current)
    {
        if ($prev == 0) return 0;
        return round((($current - $prev) / $prev) * 100, 1);
    }

    public function sendTest($id)
    {
        $test = TestRequest::findOrFail($id);
        $test->status = 2;
        $test->save();
    }
}
