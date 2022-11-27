<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'id' => 1,
            'username' => 'admin',
            'password' => Hash::make('password'),
            'email' => 'ma17092@ues.edu.sv',
            'id_role' => 1,
            'created_at' => Carbon::now()
        ]);

        //User para Juan
        DB::table('users')->insert([
            'id' => 3,
            'username' => 'jr1234',
            'password' => Hash::make('password'),
            'email' => 'og17006@ues.edu.sv',
            'id_role' => 2,
            'created_at' => Carbon::now()
        ]);

        //User para Alumon
        DB::table('users')->insert([
            'id' => 4,
            'username' => 'alumno',
            'password' => Hash::make('password'),
            'email' => 'ro17002@ues.edu.sv',
            'id_role' => 3,
            'created_at' => Carbon::now()
        ]);

        //
        DB::table('users')->insert([
            'id' => 5,
            'username' => 'coordinador',
            'password' => Hash::make('password'),
            'email' => 'eo111111@ues.edu.sv',
            'id_role' => 4,
            'created_at' => Carbon::now()
        ]);

        DB::table('users')->insert([
            'id' => 2,
            'username' => 'cg5678',
            'password' => Hash::make('password'),
            'email' => 'cg1809@ues.edu.sv',
            'id_role' => 2,
            'created_at' => Carbon::now()
        ]);

    }
}
