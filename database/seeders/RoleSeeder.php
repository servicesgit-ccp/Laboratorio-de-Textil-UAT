<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use App\Models\User;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        DB::table('model_has_roles')->truncate();
        DB::table('roles')->truncate();

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $roles = [
            'superadmin',
            'admin',
            'lab_technician'
        ];

        foreach ($roles as $role) {
            Role::create(['name' => $role]);
        }

        $user = User::find(1);
        if ($user) {
            $user->assignRole('superadmin');
        } else {
            $this->command->warn('No se encontró un usuario con ID 1, no se asignó el rol.');
        }

        $this->command->info('Roles creados y asignados correctamente.');
    }
}
