<?php

namespace App\Http\Controllers;

use App\Http\Services\TestRequestService;
use App\Http\Services\TestTypeService;
use App\Models\TestRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestRequestController extends Controller
{
    protected $sTestRequest;
    protected $sTestTypes;

    public function __construct()
    {
        $this->sTestRequest = new TestRequestService();
        $this->sTestTypes = new TestTypeService();
    }

    public function getTestRequest(Request $request)
    {
        $perPage = (int) $request->input('per_page', 10);
        $status = $request->input('status', null);
        $search  = $request->input('q');
        $testRequest = $this->sTestRequest->getAllTestRequest($perPage, $search, $status);
        return Inertia::render('test/index', [
            'test_requests' => $testRequest,
            'filters' => [
                'q' => $search,
                'per_page' => $perPage,
                'status' => $status
            ]
        ]);
    }

    public function createTestRequest()
    {
        $testTypes = $this->sTestTypes->getTestTypes();
        return Inertia::render('test/create', [
            'test_types' => $testTypes
        ]);
    }

    public function showTestRequest($id)
    {
        $test = $this->sTestRequest->showTestRequest($id);
        return Inertia::render('test/show', [
            'testRequest' => $test,
        ]);
    }

}
