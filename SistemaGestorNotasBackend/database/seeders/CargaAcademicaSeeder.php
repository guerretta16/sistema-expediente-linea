<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CargaAcademicaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('carga_academicas')->insert([
            'id_alumno' => 1,
            'id_periodo' => 1,
            'id_curso_nivel' => 1,
            'fecha_inscripcion_carga' => Carbon::now(),
            'created_at' => Carbon::now()
        ]);

        DB::table('carga_academicas')->insert([
            'id_alumno' => 1,
            'id_periodo' => 1,
            'id_curso_nivel' => 2,
            'fecha_inscripcion_carga' => Carbon::now(),
            'created_at' => Carbon::now()
        ]);

        DB::table('carga_academicas')->insert([
            'id_alumno' => 1,
            'id_periodo' => 1,
            'id_curso_nivel' => 3,
            'fecha_inscripcion_carga' => Carbon::now(),
            'created_at' => Carbon::now()
        ]);
    }
}
