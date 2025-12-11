<?php

namespace App\Http\Services;

use App\Models\TestRequest;
use Illuminate\Support\Facades\DB;
use App\Models\Test;

class CommitteeService
{
    protected $mTestRequest;

    public function __construct()
    {
        $this->mTestRequest = new TestRequest();
    }

    public function getAllTestRequest(int $perPage = 10,? string $search = null) 
    {
        $query = $this->mTestRequest
            ->where('in_committee', 1)
            ->with(['test', 'test.results', 'style', 'style.provider', 'style.department']);

        if ($search) {
            $query->where(function ($qq) use ($search) {
                $qq->where('number', 'like', "%{$search}%");
                $qq->where('style.name', 'like', "%{$search}%");
            });
        }

        return $query->orderByDesc('id')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function getTestRequestStats()
    {
        // Conteo actual
        $total = $this->mTestRequest->where('in_committee', 1)->count();
        $totalPending = $this->mTestRequest->where('in_committee', 1)->where('status', TestRequest::STATUS['PENDING_REVIEW'])->count();
        $totalApproved = $this->mTestRequest->where('status', TestRequest::STATUS['APPROVED'])->count();
        $rejected = $this->mTestRequest->where('status', $this->mTestRequest::STATUS['REJECTED'])->count();
        
        return [
            'total' => $total,
            'pending_review' => $totalPending,
            'approved' => $totalApproved,
            'rejected' => $rejected,
        ];
    }
}
