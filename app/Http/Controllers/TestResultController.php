<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Services\TestResultService;
use App\Models\Test;
use App\Http\Requests\InitialSectionRequest;


class TestResultController extends Controller
{
    protected $sTestResult;

    public function __construct()
    {
        $this->sTestResult = new TestResultService();
    }
    /**
     * Obtener todos los test para analisis
     */
    public function getTest(Request $request)
    {
        $testResults = $this->sTestResult->getAllTest($request);
        $stats       = $this->sTestResult->getStats();

        return Inertia::render('test-results/index', [
            'testResults' => $testResults,
            'stats'       => $stats,
            'filters'     => $request->only('q', 'per_page'),
        ]);
    }

    /**
     * Obtener detalle de un test para analisis
     */
    public function getTestDetail($test)
    {
        $testResult = $this->sTestResult->getTestDetail($test);

        return Inertia::render('test-results/detail', [
            'testResult' => $testResult
        ]);
    }

    public function startInitial($testId)
    {
        $testResult = $this->sTestResult->startInitialSection($testId);
        $result = $testResult->results->first();
        $initialSection = $result?->content['Inicial'] ?? [];
        return Inertia::render('test-results/initial', [
            'test' => [
                'id'        => $testResult->id,
                'number'    => $testResult->testRequest->number,
                'item'      => $testResult->testRequest->item,
                'notes'     => $testResult->testRequest->notes,
                'requested_by' => $testResult->testRequest->user->name,
            ],
            'initialSection' => $initialSection,
        ]);
    }

    public function updateInitial(InitialSectionRequest $request, Test $test)
    {
        $this->sTestResult->updateInitialSection($test, $request->validated()['fields']);

        return redirect()
            ->route('test-results.detail', ['test' => $test->id])
            ->with('success', 'Datos iniciales guardados correctamente.');
    }
}
