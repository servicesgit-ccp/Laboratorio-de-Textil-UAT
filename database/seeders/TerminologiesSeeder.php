<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\TestType;
use App\Models\Terminology;

class TerminologiesSeeder extends Seeder
{
    public function run(): void
    {
        $map = [
            // 🧵 INITIAL
            'Initial' => [
                ['es' => 'Tipo de lavado', 'en' => 'Wash type'],
                ['es' => 'Temperatura de lavado', 'en' => 'Washing temperature'],
                ['es' => 'Tipo de secado', 'en' => 'Drying type'],
                ['es' => 'Tipo de planchado', 'en' => 'Ironing type'],
                ['es' => 'Acondicionamiento Temperatura °C', 'en' => 'Conditioning Temperature °C'],
                ['es' => 'Acondicionamiento Humedad Relativa %', 'en' => 'Conditioning Relative Humidity %'],
            ],

            // 👕 APPEARANCE
            'Appareance' => [
                ['es' => 'Antes de lavar Cambio de color Tela Principal Grado', 'en' => 'Before washing Color change Main fabric Grade'],
                ['es' => 'Después de Lavar Cambio de color Tela Principal Grado', 'en' => 'After washing Color change Main fabric Grade'],
                ['es' => 'Antes de Lavar Cambio de color en Bies/Cardigan Grado', 'en' => 'Before washing Color change on Bias/Cardigan Grade'],
                ['es' => 'Después de Lavar Cambio de color en Bies/Cardigan Grado', 'en' => 'After washing Color change on Bias/Cardigan Grade'],
                ['es' => 'Manchas', 'en' => 'Stains'],
                ['es' => 'Cambio de color en Estampado', 'en' => 'Color change in Print'],
                ['es' => 'Cambios en estampado', 'en' => 'Changes in Print'],
                ['es' => 'Antes de Lavar Pilling', 'en' => 'Before washing Pilling'],
                ['es' => 'Después de lavar Pilling Grado', 'en' => 'After washing Pilling Grade'],
                ['es' => 'Suavidad', 'en' => 'Softness'],
                ['es' => 'Rompimiento de la costura', 'en' => 'Seam breakage'],
                ['es' => 'Daños y solturas de Componentes', 'en' => 'Component damage or looseness'],
                ['es' => 'Desprendimiento de Componentes', 'en' => 'Component detachment'],
                ['es' => 'Legibilidad de la etiqueta', 'en' => 'Label readability'],
                ['es' => 'Otros', 'en' => 'Others'],
                ['es' => 'Tolerancia Cambio de (Grados)', 'en' => 'Tolerance Color Change (Grades)'],
                ['es' => 'Tolerancia en Manchas', 'en' => 'Tolerance in Stains'],
                ['es' => 'Tolerancia en Cambios en el Estampado', 'en' => 'Tolerance in Print Changes'],
                ['es' => 'Tolerancia en Pilling (Grados)', 'en' => 'Tolerance in Pilling (Grades)'],
                ['es' => 'Tolerancia en Suavidad', 'en' => 'Tolerance in Softness'],
                ['es' => 'Tolerancia en Rompimiento de Costura', 'en' => 'Tolerance in Seam Breakage'],
                ['es' => 'Tolerancia Daños y Componentes', 'en' => 'Tolerance in Component Damage'],
                ['es' => 'Tolerancia Componentes y desprendimiento', 'en' => 'Tolerance in Component Detachment'],
                ['es' => 'Tolerancia en Etiqueta', 'en' => 'Tolerance in Label'],
                ['es' => 'Tolerancia Otros', 'en' => 'Tolerance Others'],
            ],

            // 🧪 AATCC150
            'AATCC150' => [
                ['es' => 'Resultado (A1) Largo', 'en' => 'Result (A1) Length'],
                ['es' => 'Resultado (A2) Largo', 'en' => 'Result (A2) Length'],
                ['es' => 'Resultado (A3) Largo', 'en' => 'Result (A3) Length'],
                ['es' => 'Resultado (B1) Ancho', 'en' => 'Result (B1) Width'],
                ['es' => 'Resultado (B2) Ancho', 'en' => 'Result (B2) Width'],
                ['es' => 'Resultado (B3) Ancho', 'en' => 'Result (B3) Width'],
                ['es' => 'Medida (A-1) Largo', 'en' => 'Measurement (A-1) Length'],
                ['es' => 'Medida (A-2) Largo', 'en' => 'Measurement (A-2) Length'],
                ['es' => 'Medida (A-3) Largo', 'en' => 'Measurement (A-3) Length'],
                ['es' => 'Medida (B-1)  Ancho', 'en' => 'Measurement (B-1) Width'],
                ['es' => 'Medida (B-2) Ancho', 'en' => 'Measurement (B-2) Width'],
                ['es' => 'Medida (B-3) Ancho', 'en' => 'Measurement (B-3) Width'],
                ['es' => 'Original Largo A-1 (mm)', 'en' => 'Original Length A-1 (mm)'],
                ['es' => 'Original Largo A-2 (mm)', 'en' => 'Original Length A-2 (mm)'],
                ['es' => 'Original Largo A-3 mm', 'en' => 'Original Length A-3 (mm)'],
                ['es' => 'Original Ancho B-1 (mm)', 'en' => 'Original Width B-1 (mm)'],
                ['es' => 'Original Ancho B-2 (mm)', 'en' => 'Original Width B-2 (mm)'],
                ['es' => 'Original Ancho B-3 (mm)', 'en' => 'Original Width B-3 (mm)'],
                ['es' => 'Condiciones de Temperatura', 'en' => 'Temperature Conditions'],
                ['es' => 'Condiciones de Humedad Relativa', 'en' => 'Relative Humidity Conditions'],
                ['es' => 'Después de Lavar Largo A-1 (mm)', 'en' => 'After Washing Length A-1 (mm)'],
                ['es' => 'Después de Lavar Largo A-2 (mm)', 'en' => 'After Washing Length A-2 (mm)'],
                ['es' => 'Después de Lavar Largo A-3 (mm)', 'en' => 'After Washing Length A-3 (mm)'],
                ['es' => 'Después de Lavar Ancho B-1 (mm)', 'en' => 'After Washing Width B-1 (mm)'],
                ['es' => 'Después de Lavar Ancho B-2 (mm)', 'en' => 'After Washing Width B-2 (mm)'],
                ['es' => 'Después de Lavar Ancho B-3 (mm)', 'en' => 'After Washing Width B-3 (mm)'],
            ],

            // 📏 AATCC135
            'AATCC135' => [
                ['es' => 'Resultado (Promedio) Largo %', 'en' => 'Result (Average) Length %'],
                ['es' => 'Resultado (Promedio) Ancho %', 'en' => 'Result (Average) Width %'],
                ['es' => 'Resultado Largo', 'en' => 'Result Length'],
                ['es' => 'Resultado Ancho', 'en' => 'Result Width'],
                ['es' => 'L 1 (Li)', 'en' => 'L 1 (Li)'],
                ['es' => 'L 2 (Li)', 'en' => 'L 2 (Li)'],
                ['es' => 'L3 (Li)', 'en' => 'L 3 (Li)'],
                ['es' => 'A 1 (Li)', 'en' => 'A 1 (Li)'],
                ['es' => 'A 2 (Li)', 'en' => 'A 2 (Li)'],
                ['es' => 'A3 (Li)', 'en' => 'A 3 (Li)'],
                ['es' => 'L 1 (Lf)', 'en' => 'L 1 (Lf)'],
                ['es' => 'L 2 (Lf)', 'en' => 'L 2 (Lf)'],
                ['es' => 'L 3 (Lf)', 'en' => 'L 3 (Lf)'],
                ['es' => 'A 1 (Lf)', 'en' => 'A 1 (Lf)'],
                ['es' => 'A 2 (Lf)', 'en' => 'A 2 (Lf)'],
                ['es' => 'A 3 (Lf)', 'en' => 'A 3 (Lf)'],
                ['es' => '% L1', 'en' => '% L1'],
                ['es' => '% L2', 'en' => '% L2'],
                ['es' => '% L3', 'en' => '% L3'],
                ['es' => '% A 1', 'en' => '% A 1'],
                ['es' => '% A 2', 'en' => '% A 2'],
                ['es' => '% A 3', 'en' => '% A 3'],
            ],

            // 🧵 AATCC179
            'AATCC179' => [
                ['es' => 'Torsión %', 'en' => 'Twist %'],
                ['es' => 'Valor AC (mm)', 'en' => 'Value AC (mm)'],
                ['es' => 'Valor BD (mm)', 'en' => 'Value BD (mm)'],
            ],

            // ⚖️ ASTM D3776
            'ASTM D3776' => [
                ['es' => 'Promedio g/m²', 'en' => 'Average g/m²'],
                ['es' => 'Peso por pieza g', 'en' => 'Weight per piece g'],
                ['es' => 'Espécimen 1 (g/m²)', 'en' => 'Specimen 1 (g/m²)'],
                ['es' => 'Espécimen 2 (g/m²)', 'en' => 'Specimen 2 (g/m²)'],
                ['es' => 'Espécimen 3 (g/m²)', 'en' => 'Specimen 3 (g/m²)'],
                ['es' => 'Espécimen 4 (g/m²)', 'en' => 'Specimen 4 (g/m²)'],
                ['es' => 'Espécimen 5 (g/m²)', 'en' => 'Specimen 5 (g/m²)'],
                ['es' => 'Promedio (g/m²)', 'en' => 'Average (g/m²)'],
            ],

            // 🧶 ASTM D3512
            'ASTM D3512' => [
                ['es' => 'Pilling inicial', 'en' => 'Initial Pilling'],
                ['es' => 'Pilling Promedio (Grado)', 'en' => 'Average Pilling (Grade)'],
                ['es' => 'Espécimen 1  (Grado)', 'en' => 'Specimen 1 (Grade)'],
                ['es' => 'Espécimen 2  (Grado)', 'en' => 'Specimen 2 (Grade)'],
                ['es' => 'Espécimen 3  (Grado)', 'en' => 'Specimen 3 (Grade)'],
            ],

            // 💧 AATCC8
            'AATCC8' => [
                ['es' => 'Seco (Grado) - 1', 'en' => 'Dry (Grade) - 1'],
                ['es' => 'Húmedo (Grado) - 1', 'en' => 'Wet (Grade) - 1'],
                ['es' => 'Seco (Grado) - 2', 'en' => 'Dry (Grade) - 2'],
                ['es' => 'Húmedo (Grado) - 2', 'en' => 'Wet (Grade) - 2'],
                ['es' => 'Pickup Tela principal', 'en' => 'Pickup Main fabric'],
                ['es' => 'Pickup de Estampado y/o Bordado', 'en' => 'Pickup of Print and/or Embroidery'],
            ],

            // ⚗️ AATCC81
            'AATCC81' => [
                ['es' => 'Valor pH', 'en' => 'pH Value'],
                ['es' => 'Tolerancia Mínimo', 'en' => 'Minimum Tolerance'],
                ['es' => 'Tolerancia Máxima', 'en' => 'Maximum Tolerance'],
            ],

            // 🪡 ASTM D2261
            'ASTMD2261' => [
                ['es' => 'Promedio lb/f (Urdimbre)', 'en' => 'Average lb/f (Warp)'],
                ['es' => 'Promedio lb/f (Trama)', 'en' => 'Average lb/f (Weft)'],
                ['es' => 'Tolerancia Urdimbre (lb/f)', 'en' => 'Warp Tolerance (lb/f)'],
                ['es' => 'Tolerancia Trama (lb/f)', 'en' => 'Weft Tolerance (lb/f)'],
                ['es' => 'Espécimen 1 Urdimbre (lb/f)', 'en' => 'Specimen 1 Warp (lb/f)'],
                ['es' => 'Espécimen 2 Urdimbre (lb/f)', 'en' => 'Specimen 2 Warp (lb/f)'],
                ['es' => 'Espécimen 3 Urdimbre (lb/f)', 'en' => 'Specimen 3 Warp (lb/f)'],
                ['es' => 'Espécimen 4 Urdimbre (lb/f)', 'en' => 'Specimen 4 Warp (lb/f)'],
                ['es' => 'Espécimen 5 Urdimbre (lb/f)', 'en' => 'Specimen 5 Warp (lb/f)'],
                ['es' => 'Espécimen 1 Trama (lb/f)', 'en' => 'Specimen 1 Weft (lb/f)'],
                ['es' => 'Espécimen 2 Trama (lb/f)', 'en' => 'Specimen 2 Weft (lb/f)'],
                ['es' => 'Espécimen 3 Trama (lb/f)', 'en' => 'Specimen 3 Weft (lb/f)'],
                ['es' => 'Espécimen 4 Trama (lb/f)', 'en' => 'Specimen 4 Weft (lb/f)'],
                ['es' => 'Espécimen 5 Trama (lb/f)', 'en' => 'Specimen 5 Weft (lb/f)'],
            ],

            // 🧰 ASTM D5034
            'ASTMD5034' => [
                ['es' => 'Tolerancia Urdimbre (lb/f)', 'en' => 'Warp Tolerance (lb/f)'],
                ['es' => 'Tolerancia Trama (lb/f)', 'en' => 'Weft Tolerance (lb/f)'],
                ['es' => 'Acondicionamiento en Temperatura °C', 'en' => 'Conditioning Temperature °C'],
                ['es' => 'Acondicionamiento en Humedad relativa %', 'en' => 'Conditioning Relative Humidity %'],
                ['es' => 'Evaluación', 'en' => 'Evaluation'],
                ['es' => 'Espécimen 1 Urdimbre (lb/f)', 'en' => 'Specimen 1 Warp (lb/f)'],
                ['es' => 'Espécimen 2 Urdimbre (lb/f)', 'en' => 'Specimen 2 Warp (lb/f)'],
                ['es' => 'Espécimen 3 Urdimbre (lb/f)', 'en' => 'Specimen 3 Warp (lb/f)'],
                ['es' => 'Espécimen 4 Urdimbre (lb/f)', 'en' => 'Specimen 4 Warp (lb/f)'],
                ['es' => 'Espécimen 5 Urdimbre (lb/f)', 'en' => 'Specimen 5 Warp (lb/f)'],
                ['es' => 'Espécimen 1 Trama (lb/f)', 'en' => 'Specimen 1 Weft (lb/f)'],
                ['es' => 'Espécimen 2 Trama (lb/f)', 'en' => 'Specimen 2 Weft (lb/f)'],
                ['es' => 'Espécimen 3 Trama (lb/f)', 'en' => 'Specimen 3 Weft (lb/f)'],
                ['es' => 'Espécimen 4 Trama (lb/f)', 'en' => 'Specimen 4 Weft (lb/f)'],
                ['es' => 'Espécimen 5 Trama (lb/f)', 'en' => 'Specimen 5 Weft (lb/f)'],
                ['es' => 'Promedio Urdimbre', 'en' => 'Average Warp'],
                ['es' => 'Promedio Trama', 'en' => 'Average Weft'],
            ],

            // ⚙️ DENSIDAD
            'Density' => [
                ['es' => 'Dif. Hilos urd/columnas (en 1in)', 'en' => 'Diff. Warp threads/columns (in 1in)'],
                ['es' => 'Dif. Hilos trama/mallas (en 1in)', 'en' => 'Diff. Weft threads/meshes (in 1in)'],
                ['es' => 'No. Hilos urd/columnas (en 1in)', 'en' => 'No. Warp threads/columns (in 1in)'],
                ['es' => 'No. Hilos trama/mallas (en 1in)', 'en' => 'No. Weft threads/meshes (in 1in)'],
            ],
        ];

        foreach ($map as $testName => $fields) {
            $testType = TestType::where('name_es', $testName)
                ->orWhere('name_en', $testName)
                ->first();

            if (!$testType) {
                $this->command->warn("⚠️ TestType '{$testName}' no encontrado, se omite.");
                continue;
            }

            foreach ($fields as $field) {
                $slug = Str::slug($field['es'], '_');

                Terminology::updateOrCreate(
                    [
                        'name' => $slug,
                        'test_type_id' => $testType->id,
                    ],
                    [
                        'display_name_es' => $field['es'],
                        'display_name_en' => $field['en'],
                    ]
                );
            }
        }

        $this->command->info('✅ Terminologies seeded successfully!');
    }
}
