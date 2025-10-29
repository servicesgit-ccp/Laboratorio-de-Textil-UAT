<?php

namespace App\Http\Services;

use Illuminate\Support\Collection;
use Spatie\Permission\Models\Permission;

class PermissionService
{
    protected Permission $mPermission;

    public function __construct()
    {
        $this->mPermission = new Permission();
    }

    public function getAll(): Collection
    {
        return $this->mPermission->newQuery()
            ->orderBy('name')
            ->get();
    }

}
