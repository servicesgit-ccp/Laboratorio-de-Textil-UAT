<?php

namespace App\Http\Services;

use Illuminate\Support\Collection;
use Spatie\Permission\Models\Role;

class RoleService
{
    protected $mRole;

    public function __construct()
    {
        $this->mRole = new Role();
    }

    public function getAll(): Collection
    {
        return $this->mRole->newQuery()
            ->orderBy('name')
            ->get();
    }


}
