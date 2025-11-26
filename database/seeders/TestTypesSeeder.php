<?php

namespace Database\Seeders;
use App\Models\TestType;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            ['name_es' => 'INICIAL', 'name_en' => 'Initial', 'description' => 'Datos iniciales de acondicionamiento y lavado'],
            ['name_es' => 'APARIENCIA', 'name_en' => 'Appareance', 'description' => 'Evaluación de apariencia (antes/después de lavado, suavidad, pilling, etc.)'],
            ['name_es' => 'AATCC150', 'name_en' => 'AATCC150', 'description' => 'AATCC 150 - dimensional change'],
            ['name_es' => 'AATCC135', 'name_en' => 'AATCC135', 'description' => 'AATCC 135 - dimensional change (promedios y % )'],
            ['name_es' => 'TORSION', 'name_en' => 'AATCC179', 'description' => 'AATCC 179 - torsión'],
            ['name_es' => 'ASTM D3776', 'name_en' => 'ASTM D3776', 'description' => 'ASTM D3776 - masa por unidad de área'],
            ['name_es' => 'PILLING', 'name_en' => 'ASTM D3512', 'description' => 'ASTM D3512 - pilling'],
            ['name_es' => 'FROTE', 'name_en' => 'AATCC8', 'description' => 'AATCC 8 - absorción/pickup húmedo-seco'],
            ['name_es' => 'VALOR PH', 'name_en' => 'AATCC81', 'description' => 'AATCC 81 - ph y tolerancias'],
            ['name_es' => 'RASGADO', 'name_en' => 'ASTMD2261', 'description' => 'ASTM D2261 - resistencia lb/f (urdimbre/trama)'],
            ['name_es' => 'TRACCION', 'name_en' => 'ASTMD5034', 'description' => 'ASTM D5034 - resistencia y promedio urdimbre/trama'],
            ['name_es' => 'LAVADO', 'name_en' => 'AATCC61', 'description' => 'ASTM D5034 - resistencia y promedio urdimbre/trama'],
            ['name_es' => 'DENSIDAD', 'name_en' => 'Density', 'description' => 'Densidad de hilos/mallas'],
        ];
        

        foreach ($types as $t) {
            TestType::firstOrCreate(
                ['name_es' => $t['name_es']],
                [
                    'name_en' => $t['name_en'],
                    'description' => $t['description'],
                ]
            );
        }
    }
}
