<?php

namespace App\Http\Services;

use App\Models\TestRequest;
use App\Models\TestResult;
use App\Models\TestType;
use App\Models\User;
use Carbon\Carbon;

class DashboardService
{
    protected $mTestRequest;
    protected $mUser;
    protected $mTestType;
    protected $mTestResult;
    protected $mCarbon;

    public function __construct()
    {
        $this->mTestRequest = new TestRequest();
        $this->mUser = new User();
        $this->mTestType = new TestType();
        $this->mTestResult = new TestResult();
        $this->mCarbon = new Carbon();
    }

    public function getCardStats()
    {
        $now = $this->mCarbon::now();

        return [
            'total_tests' => $this->mTestRequest::count(),
            'tests_this_week' => $this->mTestRequest::whereBetween(
                'created_at',
                [$now->copy()->startOfWeek(), $now->copy()->endOfWeek()]
            )->count(),
            'tests_this_month' => $this->mTestRequest::whereYear('created_at', $now->year)
                ->whereMonth('created_at', $now->month)
                ->count(),
            'total_users' => $this->mUser::count(),
        ];
    }

    public function getBarChartData()
    {
        $months = collect(range(1, 12))->map(function($m) {
            $monthName = ucfirst(strtolower(
                $this->mCarbon::create()->month($m)->locale('es')->translatedFormat('F')
            ));

            return [
                'month' => $monthName,
                'total' => $this->mTestRequest::whereMonth('created_at', $m)->count(),
                'pending' => $this->mTestRequest::whereMonth('created_at', $m)->where('status', 1)->count(),
                'completed' => $this->mTestRequest::whereMonth('created_at', $m)->where('status', 2)->count(),
                'cancelled' => $this->mTestRequest::whereMonth('created_at', $m)->where('status', 3)->count(),
            ];
        });

        return $months;
    }


    public function getMonthlyTestsSummary()
    {
        $testTypes = $this->mTestType::pluck('id', 'name_es')->toArray();

        $months = collect(range(1, 12))->map(function ($m) use ($testTypes) {

            $monthName = ucfirst(strtolower(
                $this->mCarbon::create(null, $m)->locale('es')->translatedFormat('F')
            ));

            return [
                'month' => $monthName,
                'tests' => collect($testTypes)->mapWithKeys(fn ($id, $name) => [$name => 0])->toArray()
            ];
        })->toArray();

        $results = $this->mTestResult::whereYear('created_at', now()->year)->get();

        foreach ($results as $result) {

            $content = $result->content;
            if (!is_array($content)) continue;

            $monthIndex = $this->mCarbon::parse($result->created_at)->month - 1;

            foreach ($content as $testTypeName => $items) {

                if (!isset($testTypes[$testTypeName])) continue;

                $months[$monthIndex]['tests'][$testTypeName] += 1;
            }
        }

        return $months;
    }


}
