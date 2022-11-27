<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CursoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('cursos')->insert([
            'id' => 1,
            'codigo_curso' => 'MAT',
            'nombre_curso' => 'MATEMATICA',
            'created_at' => Carbon::now()
        ]);
        DB::table('cursos')->insert([
            'id' => 2,
            'codigo_curso' => 'FIS',
            'nombre_curso' => 'FISICA',
            'created_at' => Carbon::now()
        ]);
        DB::table('cursos')->insert([
            'id' => 3,
            'codigo_curso' => 'QUI',
            'nombre_curso' => 'QUIMICA',
            'created_at' => Carbon::now()
        ]);
        DB::table('cursos')->insert([
            'id' => 4,
            'codigo_curso' => 'BIO',
            'nombre_curso' => 'BIOLOGIA',
            'created_at' => Carbon::now()
        ]);
        DB::table('cursos')->insert([
            'id' => 5,
            'codigo_curso' => 'ASTRO',
            'nombre_curso' => 'ASTRONOMIA',
            'created_at' => Carbon::now()
        ]);
        DB::table('cursos')->insert([
            'id' => 6,
            'codigo_curso' => 'INFO',
            'nombre_curso' => 'INFORMATICA',
            'created_at' => Carbon::now()
        ]);
    }
}
