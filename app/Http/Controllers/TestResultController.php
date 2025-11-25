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

    public function startSection($testId, $sectionKey)
    {
        $testResult = $this->sTestResult->startSection($testId, $sectionKey);

        $result = $testResult->results->first();
        $sectionData = $result?->content[$sectionKey] ?? [];

        return Inertia::render('test-results/section-form', [
            'test' => [
                'id'           => $testResult->id,
                'number'       => $testResult->testRequest->number,
                'item'         => $testResult->testRequest->item,
                'notes'        => $testResult->testRequest->notes,
                'requested_by' => $testResult->testRequest->user->name,
            ],
            'sectionKey'   => $sectionKey,      // "Inicial", "Apariencia", etc.
            'sectionData'  => $sectionData,     // contenido de esa sección
        ]);
    }

    public function updateSection(Request $request, $testId, $sectionKey)
    {
        $validated = $request->validate([
            'fields'   => ['required', 'array'],
            'fields.*' => ['nullable', 'string'],
        ]);

        $this->sTestResult->updateSection(
            (int) $testId,
            (string) $sectionKey,
            $validated['fields']
        );

        return redirect()
            ->route('test-results.detail', ['test' => $testId])
            ->with('success', 'Se guardaron los datos de la sección.');
    }

    public function finishInitial(Request $request, Test $test)
    {
        $this->sTestResult->finishInitialSection($test);

        return redirect()
            ->route('test-results.detail', ['test' => $test->id])
            ->with('success', 'Datos iniciales marcados como completados.');
    }

    public function finishSection(Request $request, int $test)
    {
        $section = $request->input('section');

        $this->sTestResult->finishSection($test, $section);

        return redirect()
            ->route('test-results.detail', ['test' => $test])
            ->with('success', "La sección {$section} se marcó como terminada.");
    }
}
