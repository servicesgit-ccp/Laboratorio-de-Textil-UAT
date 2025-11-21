<?php

namespace App\Http\Services;

use App\Models\Test;
use Illuminate\Support\Facades\Auth;

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

        $query = $this->mTest->with(['testRequest.user', 'results']);

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

    /**
     * Obtener el detalle de un test para analisis
     */
    public function getTestDetail($id)
    {
        return $this->mTest->with(['testRequest.user', 'results'])->findOrFail($id);
    }

    /**
     * Obtener todos los test para stats
     */
    public function getStats(): array
    {
        $userId = Auth::id();
        $tests = $this->mTest->with('results')->get();
        $inAnalysis = $tests->count();
        $pending = 0;
        $inProcess = 0;
        $completed = 0;

        foreach ($tests as $test) {
            foreach ($test->results as $result) {
                $content = $result->content ?? [];
                foreach ($content as $sectionKey => $section) {
                    if (!is_array($section)) {
                        continue;
                    }
                    if (!array_key_exists('status', $section)) {
                        continue;
                    }
                    $status = (int) $section['status'];
                    $sectionUserId = $section['user_id'] ?? null;
                    if ($status === 0) {
                        $pending++;
                    }
                    if ($sectionUserId && (int) $sectionUserId === $userId) {
                        if ($status === 1) {
                            $inProcess++;
                        } elseif ($status === 2) {
                            $completed++;
                        }
                    }
                }
            }
        }
        return [
            'inAnalysis' => $inAnalysis,
            'pending'    => $pending,
            'inProcess'  => $inProcess,
            'completed'  => $completed,
        ];
    }

    public function startInitialSection($testId)
    {
        $user = Auth::user();
        $test = $this->mTest
            ->with(['testRequest.user', 'results'])
            ->findOrFail($testId);
        $result = $test->results->first();

        if ($result) {
            $content = $result->content ?? [];
            if (isset($content['Inicial'])) {
                $content['Inicial']['status'] = 1;
                $content['Inicial']['user_id'] = $user->id;
                $content['Inicial']['user_name'] = $user->name;

                $result->content = $content;
                $result->save();
            }
        }
        return $test->fresh(['testRequest.user', 'results']);
    }

}
