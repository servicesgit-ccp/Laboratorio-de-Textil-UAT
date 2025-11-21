<?php

namespace App\Http\Services;

use App\Models\Style;
use App\Models\Terminology;
use App\Models\Test;
use App\Models\TestRequest;
use App\Models\TestResult;
use App\Models\TestType;
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

    public function __construct()
    {
        $this->mTestRequest = new TestRequest();
        $this->mTest = new Test();
        $this->mTestResult = new TestResult();
        $this->mTestType = new TestType();
        $this->mTerminology = new Terminology();
        $this->mStyle = new Style();
    }

    public function getAllTestRequest(int $perPage = 10, ?string $search = null, $status = null)
    {
        $query = $this->mTestRequest
            ->with(['test', 'test.results', 'style', 'style.provider', 'style.department']);

        if ($search) {
            $query->where(function ($qq) use ($search) {
                $qq->where('number', 'like', "%{$search}%");
            });
        }

        if ($status !== null && $status !== '' && $status != 4) {
            $query->where('status', (int) $status);
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

        $style = $this->mStyle->where('number', $data['item'])->first();
        DB::beginTransaction();
        try {
            $testRequest = $this->mTestRequest->create([
                'user_id' => 1,
                'style_id' => $style->id ?? null,
                'item' => $style != null ? $style->number : $data['item'],
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

            return $testRequest;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw ValidationException::withMessages([
                'error' => 'Error al crear la solicitud: ' . $e->getMessage(),
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
}
