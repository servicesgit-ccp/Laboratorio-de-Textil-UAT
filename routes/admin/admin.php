<?php
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;

/******************** Users ********************/
Route::get('/admin/users', [UserController::class, 'getUsers'])->name('admin.users');
Route::post('/admin/users', [UserController::class, 'store'])->name('admin.users.store');
Route::put('/admin/users/{user}', [UserController::class, 'update'])->name('admin.users.update');
Route::delete('/admin/users/{user}', [UserController::class, 'destroy'])->name('admin.users.destroy');
Route::post('/admin/users/{user}/password-reset', [UserController::class, 'resetPassword'])->name('admin.users.password.reset');
/******************** Roles ********************/
Route::get('/admin/roles', [RoleController::class, 'getRoles'])->name('admin.roles');
/******************** Permissions ********************/
Route::get('/admin/permissions', [PermissionController::class, 'getPermissions'])->name('admin.permissions');
