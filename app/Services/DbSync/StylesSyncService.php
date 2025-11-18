<?php

namespace App\Services\DbSync;

use Illuminate\Support\Facades\DB;

class StylesSyncService extends BaseMysqlToOracleSync
{
    protected string $targetTable = 'STYLES';

    protected function sourceQuery()
    {
        return $this->sourceDb()->table('styles');
    }

    protected function transformRow($row): array
    {
        return [
            'ID'           => (int)$row->id,
            'NUMBER'  => (string)$row->style,
            'DESCRIPTION' => (string)$row->description,
            'PROVIDER_ID' => (int)$row->provider_id,
            'DEPARTMENT_ID'   => $row->department_id,
            'DIVISION_ID'   => $row->division_id,
            'CREATED_AT'   => $row->created_at,
            'UPDATED_AT'   => $row->updated_at,
        ];
    }

    protected function upsertBatch(array $rows): void
    {
        $this->targetDb()->table($this->targetTable)->insert($rows);
    }
}
