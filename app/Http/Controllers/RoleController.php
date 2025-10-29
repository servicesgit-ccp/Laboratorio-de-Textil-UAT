<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\RoleService;
use Inertia\Inertia;

class RoleController extends Controller
{
    protected $sRole;

    public function __construct()
    {
        $this->sRole = new RoleService();
    }

    public function getRoles()
    {
        $roles = $this->sRole->getAll();
        return Inertia::render('admin/roles/index', [
            'roles' => $roles
        ]);
    }
}
