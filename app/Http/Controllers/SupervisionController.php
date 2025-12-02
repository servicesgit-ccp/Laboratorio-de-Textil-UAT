<?php

namespace App\Http\Controllers;

use App\Http\Services\SupervisionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupervisionController
{
    protected $sSupervision;

    public function __construct()
    {
        $this->sSupervision = new SupervisionService();
    }

    public function index(Request $request)
    {
        $perPage = (int) $request->input('per_page', 10);
        $status = $request->input('status', null);
        $search  = $request->input('q');
        $dateRange = $request->input('date_range');
        $stats = $this->sSupervision->getStats();
        $testRequests = $this->sSupervision->getAllTest(
            $perPage,
            $search,
            $status,
            $dateRange,
        );
        return Inertia::render('supervision/index', [
            'tests' => $testRequests,
            'stats'         => $stats,
            'filters'       => [
                'q'          => $search,
                'status'     => $status,
                'per_page'   => $perPage,
                'date_range' => $dateRange,
            ],
        ]);
    }
}
