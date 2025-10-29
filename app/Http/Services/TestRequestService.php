<?php

namespace App\Http\Services;

use App\Models\TestRequest;

class TestRequestService
{

    protected $model;

    public function __construct()
    {
        $this->model = new TestRequest();
    }

    public function getAllTestRequest($request)
    {
        $query = $this->model
            // ->with(['test', 'test.testResults'])
            ->withTrashed();

        switch ($request->status) {
            case 0:
                $query->where('status', 0);
                break;
            case 1:
                $query->where('status', 1);
                break;
            case 2:
                $query->where('status', 2);
                break;
            case 3:
                $query->where('status', 3);
                break;
            case 4: // all status
            default:
                // No filtramos, trae todos
                break;
        }

        return $query->get();
    }


}
