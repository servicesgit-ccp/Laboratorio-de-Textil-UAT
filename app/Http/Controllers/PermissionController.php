<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\PermissionService;
use Inertia\Inertia;

class PermissionController extends Controller
{
    protected $sPermission;

    public function __construct()
    {
        $this->sPermission = new PermissionService();
    }

    public function getPermissions()
    {
        $permissions = $this->sPermission->getAll();
        return Inertia::render('admin/permissions/index', [
            'permissions' => $permissions
        ]);
    }
}
