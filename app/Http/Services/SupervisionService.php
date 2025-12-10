<?php

namespace App\Http\Services;

use App\Models\Test;
use App\Models\TestRequest;
use Carbon\Carbon;

class SupervisionService
{

    protected $mTestRequest;
    protected $mTest;

    public function __construct()
    {
        $this->mTestRequest = new TestRequest();
        $this->mTest = new Test();
    }


    public function getAllTest(
        int $perPage = 10,
        ?string $search = null,
        $status = null,
        ?string $dateRange = null
    ) {
        $query = $this->mTestRequest
            ->with(['test', 'test.results', 'style', 'style.provider', 'style.department']);
            //->where('in_committee', 0);

        if ($search) {
            $query->where(function ($qq) use ($search) {
                $qq->where('number', 'like', "%{$search}%");
            });
        }

        if ($status !== null && $status !== '' && (int) $status !== 6) {
            $query->where('status', (int) $status);
        } else {
            $query->whereIn('status',
                [
                    $this->mTestRequest::STATUS['IN_PROGRESS'],
                    $this->mTestRequest::STATUS['PENDING_REVIEW'],
                    $this->mTestRequest::STATUS['COMPLETED_REVIEW'],
                    $this->mTestRequest::STATUS['APPROVED'],
                    $this->mTestRequest::STATUS['REJECTED'],
                ]
            );
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
            ->through(function ($item) {
                $content = $item->test[0]->results[0]->content ?? [];

                $total = 0;
                $done = 0;

                foreach ($content as $key => $block) {
                    if (!is_array($block)) {
                        continue;
                    }

                    if (array_key_exists('status', $block)) {
                        $total++;
                        if ($block['status'] == 2) {
                            $done++;
                        }
                    }
                }

                $item->completed_tests = $done;
                $item->total_tests = $total;

                return $item;
            })
            ->withQueryString();
    }

    public function getStats()
    {
        $total = $this->mTestRequest->whereIn('status',
            [
            $this->mTestRequest::STATUS['IN_PROGRESS'],
            $this->mTestRequest::STATUS['PENDING_REVIEW'],
            $this->mTestRequest::STATUS['APPROVED'],
            $this->mTestRequest::STATUS['REJECTED'],
            ]
        )
            ->count();
        $inProgress = $this->mTestRequest->where('status', $this->mTestRequest::STATUS['IN_PROGRESS'])->count();
        $pendingReview = $this->mTestRequest->where('status', $this->mTestRequest::STATUS['PENDING_REVIEW'])->count();
        $approved = $this->mTestRequest->where('status', $this->mTestRequest::STATUS['APPROVED'])->count();
        $rejected = $this->mTestRequest->where('status', $this->mTestRequest::STATUS['REJECTED'])->count();

        return [
            'total' => $total,
            'in_progress' => $inProgress,
            'pending_review' => $pendingReview,
            'approved' => $approved,
            'rejected' => $rejected,
        ];
    }

    public function sendToCommittee($id)
    {
        $test = $this->mTestRequest->findOrFail($id);
        $test->in_committee = 1;
        $test->save();
    }

    public function getTestById($id)
    {
        return $this->mTestRequest::with(['test', 'test.results', 'style', 'style.provider', 'style.department'])->findOrFail($id);
    }

    public function rejectTest($request)
    {
        $testResult = $this->mTest->with(['results'])
            ->findOrFail($request->test_id);

        $result = $testResult->results->first();

        if (!$result) {
            return $result;
        }

        $content = $result->content ?? [];
        $testName = $request->test_name;

        // Validar que el test exista
        if (!isset($content[$testName])) {
            return response()->json([
                'error' => 'Test no encontrado dentro del contenido'
            ], 422);
        }

        // Crear bloque REJECTED si no existe dentro del test
        if (!isset($content[$testName]['REJECTED'])) {
            $content[$testName]['REJECTED'] = [];
        }

        // Si existe ese test rechazado, incrementar intentos
        if (isset($content[$testName]['REJECTED'][$testName])) {
            $content[$testName]['REJECTED'][$testName]['intentos'] += 1;
        } else {
            // Crear primera vez
            $content[$testName]['REJECTED'][$testName] = [
                'intentos' => 1,
                'observations' => $request->observations,
            ];
        }

        // Actualizar observaciones si vienen nuevas
        if ($request->observations) {
            $content[$testName]['REJECTED'][$testName]['observations'] = $request->observations;
        }

        // Marcar test como rechazado
        $content[$testName]['approved'] = false;
        $content[$testName]['status'] = 2;

        $result->content = $content;
        $result->save();

        return $result;
    }




    public function approveTest($request)
    {
        $testResult = $this->mTest->with(['results'])
            ->findOrFail($request->test_id);

        $result = $testResult->results->first();

        if (!$result) {
            return $result;
        }

        $content = $result->content ?? [];

        $testName = $request->test_name;

        $content[$testName]['approved'] = true;
        $content[$testName]['status'] = 2;

        $result->content = $content;
        $result->save();
    }

    public function approveTestRequest($request)
    {
        $testRequest = $this->mTestRequest->findOrFail($request->test_id);
        $testRequest->status = $this->mTestRequest::STATUS['APPROVED'];
        $testRequest->save();
    }

    public function rejectTestRequest($request)
    {
        $testRequest = $this->mTestRequest->findOrFail($request->test_id);
        $testRequest->cancelation_notes = $request->notes;
        $testRequest->status = $this->mTestRequest::STATUS['REJECTED'];
        $testRequest->save();
    }

}
