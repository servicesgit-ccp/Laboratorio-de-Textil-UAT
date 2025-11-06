<?php

namespace App\Http\Services;

use App\Models\TestRequest;

class TestRequestService
{

    protected $mTestRequest;

    public function __construct()
    {
        $this->mTestRequest = new TestRequest();
    }

    public function getAllTestRequest(int $perPage = 10, ?string $search = null, $status = null)
    {
        $query = $this->mTestRequest
            ->with(['test', 'test.results']);

        if ($search) {
            $query->where(function ($qq) use ($search) {
                $qq->where('number', 'like', "%{$search}%");
            });
        }

        if (!empty($search)) {
            $query->where(function ($qq) use ($search) {
                $qq->where('number', 'like', "%{$search}%");
            });
        }

        if ($status !== null && $status !== '' && $status != 4) {
            $query->where('status', (int) $status);
        }

        return $query->orderByDesc('id')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function showTestRequest($id)
    {
        return $this->mTestRequest::with(['test', 'test.results'])->findOrFail($id);
    }

}
