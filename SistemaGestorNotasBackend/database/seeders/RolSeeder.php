<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('rols')->insert([
            'codigo_rol' => '1',
            'nombre_rol' => 'Administrador',
            'created_at' => Carbon::now()
        ]);
        DB::table('rols')->insert([
            'codigo_rol' => '2',
            'nombre_rol' => 'Docente',
            'created_at' => Carbon::now()
        ]);
        DB::table('rols')->insert([
            'codigo_rol' => '3',
            'nombre_rol' => 'Alumno',
            'created_at' => Carbon::now()
        ]);
        DB::table('rols')->insert([
            'codigo_rol' => '4',
            'nombre_rol' => 'Coordinador',
            'created_at' => Carbon::now()
        ]);
    }
}
