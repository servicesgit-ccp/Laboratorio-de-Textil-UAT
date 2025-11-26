<?php

namespace Database\Seeders;

use App\Models\TestType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sequenceName = 'TEST_TYPES_ID_SEQ';

        // 1. Vaciar tabla
        DB::statement('DELETE FROM test_types');

        // 2. Borrar la secuencia si existe
        try {
            DB::statement("DROP SEQUENCE {$sequenceName}");
        } catch (\Exception $e) {
            // La secuencia no existe, continuar
        }

        // 3. Crear secuencia desde 1
        DB::statement("
            CREATE SEQUENCE {$sequenceName}
            START WITH 1
            INCREMENT BY 1
            NOMAXVALUE
        ");

        // 4. Registros a insertar
        $types = [
            ['name_es' => 'INICIAL', 'name_en' => 'INITIAL', 'description' => 'Datos iniciales de acondicionamiento y lavado'],
            ['name_es' => 'APARIENCIA', 'name_en' => 'ISO-15487', 'description' => 'Evaluación de apariencia (antes/después de lavado, suavidad, pilling, etc.)'],
            ['name_es' => 'ESTABILIDAD EN PRENDA', 'name_en' => 'AATCC150', 'description' => 'AATCC 150 - dimensional change'],
            ['name_es' => 'ESTABILIDAD EN TELA', 'name_en' => 'AATCC135', 'description' => 'AATCC 135 - dimensional change (promedios y % )'],
            ['name_es' => 'TORSION', 'name_en' => 'AATCC179', 'description' => 'AATCC 179 - torsión'],
            ['name_es' => 'PESO', 'name_en' => 'ASTM D3776', 'description' => 'ASTM D3776 - masa por unidad de área'],
            ['name_es' => 'PILLING', 'name_en' => 'ASTM D3512', 'description' => 'ASTM D3512 - pilling'],
            ['name_es' => 'FROTE', 'name_en' => 'AATCC8', 'description' => 'AATCC 8 - absorción/pickup húmedo-seco'],
            ['name_es' => 'VALOR PH', 'name_en' => 'AATCC81', 'description' => 'AATCC 81 - ph y tolerancias'],
            ['name_es' => 'RASGADO', 'name_en' => 'ASTMD2261', 'description' => 'ASTM D2261 - resistencia lb/f (urdimbre/trama)'],
            ['name_es' => 'TRACCION', 'name_en' => 'ASTMD5034', 'description' => 'ASTM D5034 - resistencia y promedio urdimbre/trama'],
            ['name_es' => 'LAVADO', 'name_en' => 'AATCC61', 'description' => 'AATCC 61 - solidez al lavado'],
            ['name_es' => 'DENSIDAD', 'name_en' => 'ASTMD3774', 'description' => 'Densidad de hilos/mallas'],
        ];

        // 5. Insertar datos
        foreach ($types as $t) {
            TestType::create([
                'name_es' => $t['name_es'],
                'name_en' => $t['name_en'],
                'description' => $t['description'],
            ]);
        }
    }
}
