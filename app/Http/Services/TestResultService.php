<?php

namespace App\Http\Services;

use App\Models\Test;

class TestResultService
{
    protected $mTest;

    public function __construct()
    {
        $this->mTest = new Test();
    }

    /**
     * Obtener todos los test para analisis
     */
    public function getAllTest($request)
    {
        $perPage = $request->input('per_page', 10);

        $query = $this->mTest->with(['testRequest', 'results']);

        if ($request->filled('q')) {
            $q = $request->input('q');

            $query->whereHas('testRequest', function ($sub) use ($q) {
                $sub->where('number', 'like', "%{$q}%");
            });
        }

        return $query->orderByDesc('created_at')
                    ->paginate($perPage)
                    ->withQueryString();
    }

    public function getTestDetail($id)
    {
        return $this->mTest->with(['testRequest', 'results'])->findOrFail($id);
    }

}
