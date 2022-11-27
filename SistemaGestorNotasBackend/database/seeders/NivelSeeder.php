<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NivelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('nivels')->insert([
            'id' => 1,
            'codigo_nivel' => 'NI',
            'nombre_nivel' => 'NIVEL 1',
            'created_at' => Carbon::now()
        ]);
        DB::table('nivels')->insert([
            'id' => 2,
            'codigo_nivel' => 'NII',
            'nombre_nivel' => 'NIVEL 2',
            'created_at' => Carbon::now()
        ]);
        DB::table('nivels')->insert([
            'id' => 3,
            'codigo_nivel' => 'NIII',
            'nombre_nivel' => 'NIVEL 3',
            'created_at' => Carbon::now()
        ]);
        DB::table('nivels')->insert([
            'id' => 4,
            'codigo_nivel' => 'NIV',
            'nombre_nivel' => 'NIVEL 4',
            'created_at' => Carbon::now()
        ]);
        DB::table('nivels')->insert([
            'id' => 5,
            'codigo_nivel' => 'NV',
            'nombre_nivel' => 'NIVEL 5',
            'created_at' => Carbon::now()
        ]);
        DB::table('nivels')->insert([
            'id' => 6,
            'codigo_nivel' => 'NVI',
            'nombre_nivel' => 'NIVEL 6',
            'created_at' => Carbon::now()
        ]);
        DB::table('nivels')->insert([
            'id' => 7,
            'codigo_nivel' => 'NVII',
            'nombre_nivel' => 'NIVEL 7',
            'created_at' => Carbon::now()
        ]);
        DB::table('nivels')->insert([
            'id' => 8,
            'codigo_nivel' => 'NVIII',
            'nombre_nivel' => 'NIVEL 8',
            'created_at' => Carbon::now()
        ]);
        DB::table('nivels')->insert([
            'id' => 9,
            'codigo_nivel' => 'NIX',
            'nombre_nivel' => 'NIVEL 9',
            'created_at' => Carbon::now()
        ]);
        DB::table('nivels')->insert([
            'id' => 10,
            'codigo_nivel' => 'GRA',
            'nombre_nivel' => 'GRUPO OLIMPICO A',
            'created_at' => Carbon::now()
        ]);
        DB::table('nivels')->insert([
            'id' => 11,
            'codigo_nivel' => 'GRB',
            'nombre_nivel' => 'GRUPO OLIMPICO B',
            'created_at' => Carbon::now()
        ]);
        DB::table('nivels')->insert([
            'id' => 12,
            'codigo_nivel' => 'GRC',
            'nombre_nivel' => 'GRUPO OLIMPICO C',
            'created_at' => Carbon::now()
        ]);
    }
}
