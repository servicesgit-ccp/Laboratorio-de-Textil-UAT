<?php

namespace App\Http\Services;

use App\Models\Test;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TestResultService
{
    protected $mTest;

    public function __construct()
    {
        $this->mTest = new Test();
    }

    /**
     * Obtener todos los test para analisis
     */
    public function getAllTest($request)
    {
        $perPage = $request->input('per_page', 10);
        $query = $this->mTest
            ->whereHas('testRequest', function ($q) {
                $q->where('status', 2);
            })
            ->with([
                'testRequest' => function ($q) {
                    $q->where('status', 2);
                },
                'testRequest.user',
                'results'
            ]);
        if ($request->filled('q')) {
            $q = $request->input('q');

            $query->whereHas('testRequest', function ($sub) use ($q) {
                $sub->where('number', 'like', "%{$q}%");
            });
        }

        return $query->orderByDesc('created_at')
                    ->paginate($perPage)
                    ->withQueryString();
    }

    /**
     * Obtener el detalle de un test para analisis
     */
    public function getTestDetail($id)
    {
        return $this->mTest->with(['testRequest.user', 'results'])->findOrFail($id);
    }

    /**
     * Obtener todos los test para stats
     */
    public function getStats(): array
    {
        $userId = Auth::id();
        $tests = $this->mTest->whereHas('testRequest', function ($q) {
                $q->where('status', 2);
            })->with('results')->get();
        $inAnalysis = $tests->count();
        $pending = 0;
        $inProcess = 0;
        $completed = 0;

        foreach ($tests as $test) {
            foreach ($test->results as $result) {
                $content = $result->content ?? [];
                foreach ($content as $sectionKey => $section) {
                    if (!is_array($section)) {
                        continue;
                    }
                    if (!array_key_exists('status', $section)) {
                        continue;
                    }
                    $status = (int) $section['status'];
                    $sectionUserId = $section['user_id'] ?? null;
                    if ($status === 0) {
                        $pending++;
                    }
                    if ($sectionUserId && (int) $sectionUserId === $userId) {
                        if ($status === 1) {
                            $inProcess++;
                        } elseif ($status === 2) {
                            $completed++;
                        }
                    }
                }
            }
        }
        return [
            'inAnalysis' => $inAnalysis,
            'pending'    => $pending,
            'inProcess'  => $inProcess,
            'completed'  => $completed,
        ];
    }

    public function startSection(int $testId, string $sectionKey)
    {
        $testResult = $this->mTest
            ->with(['testRequest.user', 'results'])
            ->findOrFail($testId);

        $result = $testResult->results->first();

        if (!$result) {
            return $testResult;
        }
        $content = $result->content ?? [];
        if (!isset($content[$sectionKey])) {
           return;
        }

        $content[$sectionKey]['status']    = 1;
        $content[$sectionKey]['user_id']   = auth()->id();
        $content[$sectionKey]['user_name'] = auth()->user()?->name;

        $result->content = $content;
        $result->save();
        if (is_null($testResult->started_at)) {
            $testResult->started_at = now();
            $testResult->save();
        }

        return $testResult->fresh(['testRequest.user', 'results']);
    }

    public function updateSection(int $testId, string $sectionKey, array $fields)
    {
        $testResult = $this->mTest
            ->with('results')
            ->findOrFail($testId);

        $result = $testResult->results->first();
        if (!$result) {
            throw new \RuntimeException('El test no tiene resultados asociados.');
        }

        $content = $result->content ?? [];

        if (!isset($content[$sectionKey])) {
            throw new \RuntimeException("La sección {$sectionKey} no existe en el contenido del test.");
        }

        foreach ($fields as $key => $value) {
            if (
                isset($content[$sectionKey][$key]) &&
                is_array($content[$sectionKey][$key]) &&
                array_key_exists('value', $content[$sectionKey][$key])
            ) {
                $content[$sectionKey][$key]['value'] = $value;
            }
        }
        if (isset($content[$sectionKey]['status'])) {
            $content[$sectionKey]['status'] = 1;
            $content[$sectionKey]['user_id'] = auth()->id();
            $content[$sectionKey]['user_name'] = auth()->user()?->name;
        }

        $result->content = $content;
        $result->save();

        return $testResult->fresh(['testRequest.user', 'results']);
    }

    public function finishInitialSection(Test $test)
    {
        $user = Auth::user();
        $result = $test->results()->first();
        if (!$result) {
            return $test;
        }
        $content = $result->content ?? [];
        if (!isset($content['Inicial'])) {
            return $test;
        }
        $content['Inicial']['status'] = 2;
        $content['Inicial']['user_id'] = $user->id;
        $content['Inicial']['user_name'] = $user->name;
        $result->content = $content;
        $result->save();
        return $test->fresh(['testRequest', 'results']);
    }

    public function finishSection(int $testId, string $section): void
    {
        $user = Auth::user();
        $test = $this->mTest->with('results')->findOrFail($testId);
        $result = $test->results->first();

        if (!$result) {
            return;
        }

        $content = $result->content ?? [];
        if (!isset($content[$section])) {
            return;
        }
        $content[$section]['status']    = 2;
        $content[$section]['user_id']   = $user->id;
        $content[$section]['user_name'] = $user->name;

        $result->content = $content;
        $result->save();
    }

    public function submitReview(int $testId)
    {
        DB::transaction(function () use ($testId) {
            $test = Test::with('testRequest')->find($testId);
            if (! $test) {
                throw new ModelNotFoundException("Test {$testId} no encontrado.");
            }
            if (! $test->testRequest) {
                throw new ModelNotFoundException("TestRequest no encontrado para el Test {$testId}.");
            }
            $test->testRequest->status = 3; //PENDIENTE
            $test->testRequest->save();
        });
    }
}

