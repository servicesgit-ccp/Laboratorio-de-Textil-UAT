<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Services\TestResultService;

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
}
