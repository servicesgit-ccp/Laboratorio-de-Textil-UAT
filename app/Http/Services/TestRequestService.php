<?php

namespace App\Http\Services;

use App\Models\Terminology;
use App\Models\Test;
use App\Models\TestRequest;
use App\Models\TestResult;
use App\Models\TestType;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class TestRequestService
{

    protected $mTestRequest;
    protected $mTest;
    protected $mTestResult;
    protected $mTestType;
    protected $mTerminology;

    public function __construct()
    {
        $this->mTestRequest = new TestRequest();
        $this->mTest = new Test();
        $this->mTestResult = new TestResult();
        $this->mTestType = new TestType();
        $this->mTerminology = new Terminology();

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

    public function storeTest(array $data)
    {
        DB::beginTransaction();

        try {
            // 1️⃣ Crear Test Request
            $testRequest = $this->mTestRequest->create([
                'user_id' => 1,
                'style_id' => 1,
                'status' => 0,
                'number' => $this->generateTestNumber(),
            ]);


            // 2️⃣ Crear Test asociado
            $test = $this->mTest->create([
                'test_request_id' => $testRequest->id,
            ]);

            // 3️⃣ Construir estructura de contenido
            $content = [];

            foreach ($data['test_type_ids'] as $testTypeId) {
                $testType = $this->mTestType::find($testTypeId);
                if (!$testType) continue;

                $terminologies = $this->mTerminology::where('test_type_id', $testTypeId)->get();

                // Usa consistentemente el nombre en español
                $groupKey = $testType->name_es ?? $testType->name;
                $content[$groupKey] = [];

                foreach ($terminologies as $term) {
                    $content[$groupKey][$term->id] = [
                        'label' => $term->name,
                        'display_name' => $term->display_name_es,
                        'value' => null,
                    ];
                }

                // Inicializar arreglo de imágenes
                $content[$groupKey]['img'] = [];
            }

            // 4️⃣ Crear TestResult
            $this->mTestResult->create([
                'test_id' => $test->id,
                'content' => $content,
            ]);

            DB::commit();

            return $testRequest;
        } catch (\Throwable $e) {
            DB::rollBack();
            throw ValidationException::withMessages([
                'error' => 'Error al crear la solicitud: ' . $e->getMessage(),
            ]);
        }
    }

    public function generateTestNumber()
    {
        $max = $this->mTestRequest
            ->selectRaw('COUNT(*) as count')
            ->whereRaw('EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM SYSDATE)')
            ->first();
        return 'CCP0' . date('Y') . '' . date('m') . '' . ($max->count + 1);
    }

}
