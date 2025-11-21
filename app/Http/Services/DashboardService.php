<?php

namespace App\Http\Services;

use App\Models\Provider;
use App\Models\TestRequest;
use App\Models\User;
use Carbon\Carbon;

class DashboardService
{
    protected $mTestRequest;
    protected $mProvider;
    protected $mStyle;
    protected $mUser;

    public function __construct()
    {
        $this->mTestRequest = new TestRequest();
        $this->mProvider = new Provider();
        $this->mStyle = new Provider();
        $this->mUser = new User();
    }

    public function getCardStats()
    {
        return [
            'total_tests' => $this->mTestRequest::count(),
            'total_providers' => $this->mProvider::count(),
            'total_styles' => $this->mStyle::count(),
            'total_users' => $this->mUser::count()
        ];
    }

    public function getBarChartData()
    {
        $months = collect(range(1, 12))->map(function($m) {
            return [
                'month' => Carbon::create()->month($m)->format('M'),
                'total' => $this->mTestRequest::whereMonth('created_at', $m)->count(),
                'pending' => $this->mTestRequest::whereMonth('created_at', $m)->where('status', 1)->count(),
                'completed' => $this->mTestRequest::whereMonth('created_at', $m)->where('status', 2)->count(),
                'cancelled' => $this->mTestRequest::whereMonth('created_at', $m)->where('status', 3)->count(),
            ];
        });

        return $months;
    }

    public function getProductivityTrend()
    {
        return collect(range(1, 12))->map(function ($m) {
            return [
                'month' => Carbon::create()->month($m)->format('M'),
                'productivity' => $this->mTestRequest::whereMonth('created_at', $m)->where('status', 2)->count(),
            ];
        });
    }

}
