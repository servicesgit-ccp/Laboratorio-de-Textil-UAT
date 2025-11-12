<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Role;
use App\Models\User;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Spatie cache (recomendado)
        app(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();

        Schema::disableForeignKeyConstraints();

        // Limpia pivotes primero para no violar FK
        if (Schema::hasTable('role_has_permissions')) {
            DB::table('role_has_permissions')->delete();
        }
        if (Schema::hasTable('model_has_roles')) {
            DB::table('model_has_roles')->delete();
        }

        // Luego las maestras
        if (Schema::hasTable('roles')) {
            DB::table('roles')->delete();
        }
        if (Schema::hasTable('permissions')) {
            DB::table('permissions')->delete();
        }

        Schema::enableForeignKeyConstraints();

        // Crea roles (guard_name por defecto 'web', ajusta si usas otro)
        $roles = ['superadmin', 'admin', 'lab_technician'];
        foreach ($roles as $role) {
            Role::create(['name' => $role]); // ['guard_name' => 'web'] si usas otro guard, cámbialo
        }

        // Asigna al user 1 si existe
        $user = User::find(1);
        if ($user) {
            $user->assignRole('superadmin');
            $this->command->info('Rol superadmin asignado al usuario #1.');
        } else {
            $this->command->warn('No se encontró un usuario con ID 1, no se asignó el rol.');
        }
    }
    
}
