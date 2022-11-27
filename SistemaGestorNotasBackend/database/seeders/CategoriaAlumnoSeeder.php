<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class CategoriaAlumnoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categoria_alumnos')->insert([
            'codigo_categoria_alumno' => 'ORD',
            'nombre_categoria_alumno' => 'Ordinario',
            'created_at' => Carbon::now()
        ]);

        DB::table('categoria_alumnos')->insert([
            'codigo_categoria_alumno' => 'OLP',
            'nombre_categoria_alumno' => 'Olimpico',
            'created_at' => Carbon::now()
        ]);
    }
}
