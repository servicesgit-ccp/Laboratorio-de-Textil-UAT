<?php

namespace App\Http\Services;

use App\Models\TestRequest;
use Carbon\Carbon;

class SupervisionService
{

    protected $mTestRequest;

    public function __construct()
    {
        $this->mTestRequest = new TestRequest();
    }


    public function getAllTest(
        int $perPage = 10,
        ?string $search = null,
        $status = null,
        ?string $dateRange = null
    ) {
        $query = $this->mTestRequest
            ->with(['test', 'test.results', 'style', 'style.provider', 'style.department']);

        if ($search) {
            $query->where(function ($qq) use ($search) {
                $qq->where('number', 'like', "%{$search}%");
            });
        }

        if ($status !== null && $status !== '' && (int) $status !== 5) {
            $query->where('status', (int) $status);
        } else {
            $query->whereIn('status',
                [
                    $this->mTestRequest::STATUS['IN_PROGRESS'],
                    $this->mTestRequest::STATUS['PENDING_REVIEW'],
                    $this->mTestRequest::STATUS['APPROVED'],
                    $this->mTestRequest::STATUS['REJECTED'],
                ]
            );
        }

        if ($dateRange) {
            $parts = explode(' a ', $dateRange);

            if (count($parts) === 2) {
                [$fromStr, $toStr] = $parts;

                try {
                    $from = Carbon::createFromFormat('d/m/Y', trim($fromStr))->startOfDay();
                    $to   = Carbon::createFromFormat('d/m/Y', trim($toStr))->endOfDay();
                    $query->whereBetween('created_at', [$from, $to]);
                } catch (\Throwable $e) {
                    // \Log::warning('Rango de fechas inválido en getAllTestRequest', [
                    //     'dateRange' => $dateRange,
                    //     'error' => $e->getMessage(),
                    // ]);
                }
            }
        }

        return $query->orderByDesc('id')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function getStats()
    {
        $total = $this->mTestRequest->whereIn('status',
            [
            $this->mTestRequest::STATUS['IN_PROGRESS'],
            $this->mTestRequest::STATUS['PENDING_REVIEW'],
            $this->mTestRequest::STATUS['APPROVED'],
            $this->mTestRequest::STATUS['REJECTED'],
            ]
        )
            ->count();
        $inProgress = $this->mTestRequest->where('status', $this->mTestRequest::STATUS['IN_PROGRESS'])->count();
        $pendingReview = $this->mTestRequest->where('status', $this->mTestRequest::STATUS['PENDING_REVIEW'])->count();
        $approved = $this->mTestRequest->where('status', $this->mTestRequest::STATUS['APPROVED'])->count();
        $rejected = $this->mTestRequest->where('status', $this->mTestRequest::STATUS['REJECTED'])->count();

        return [
            'total' => $total,
            'in_progress' => $inProgress,
            'pending_review' => $pendingReview,
            'approved' => $approved,
            'rejected' => $rejected,
        ];
    }

    public function sendToCommittee()
    {

    }


}
