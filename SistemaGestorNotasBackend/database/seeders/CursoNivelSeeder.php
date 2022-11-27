<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CursoNivelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Nivel 1
        DB::table('curso_nivels')->insert([
            'id' => 1,
            'id_curso' => 1,
            'id_nivel' => 1,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 2,
            'id_curso' => 2,
            'id_nivel' => 1,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 3,
            'id_curso' => 3,
            'id_nivel' => 1,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 4,
            'id_curso' => 4,
            'id_nivel' => 1,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 5,
            'id_curso' => 5,
            'id_nivel' => 1,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 6,
            'id_curso' => 6,
            'id_nivel' => 1,
            'created_at' => Carbon::now()
        ]);

        //Nivel2
        DB::table('curso_nivels')->insert([
            'id' => 7,
            'id_curso' => 1,
            'id_nivel' => 2,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 8,
            'id_curso' => 2,
            'id_nivel' => 2,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 9,
            'id_curso' => 3,
            'id_nivel' => 2,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 10,
            'id_curso' => 4,
            'id_nivel' => 2,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 11,
            'id_curso' => 5,
            'id_nivel' => 2,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 12,
            'id_curso' => 6,
            'id_nivel' => 2,
            'created_at' => Carbon::now()
        ]);

        //Nivel3
        DB::table('curso_nivels')->insert([
            'id' => 13,
            'id_curso' => 1,
            'id_nivel' => 3,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 14,
            'id_curso' => 2,
            'id_nivel' => 3,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 15,
            'id_curso' => 3,
            'id_nivel' => 3,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 16,
            'id_curso' => 4,
            'id_nivel' => 3,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 17,
            'id_curso' => 5,
            'id_nivel' => 3,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 18,
            'id_curso' => 6,
            'id_nivel' => 3,
            'created_at' => Carbon::now()
        ]);

        //Nivel4
        DB::table('curso_nivels')->insert([
            'id' => 19,
            'id_curso' => 1,
            'id_nivel' => 4,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 20,
            'id_curso' => 2,
            'id_nivel' => 4,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 21,
            'id_curso' => 3,
            'id_nivel' => 4,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 22,
            'id_curso' => 4,
            'id_nivel' => 4,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 23,
            'id_curso' => 5,
            'id_nivel' => 4,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 24,
            'id_curso' => 6,
            'id_nivel' => 4,
            'created_at' => Carbon::now()
        ]);

        //Nivel5
        DB::table('curso_nivels')->insert([
            'id' => 25,
            'id_curso' => 1,
            'id_nivel' => 5,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 26,
            'id_curso' => 2,
            'id_nivel' => 5,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 27,
            'id_curso' => 3,
            'id_nivel' => 5,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 28,
            'id_curso' => 4,
            'id_nivel' => 5,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 29,
            'id_curso' => 5,
            'id_nivel' => 5,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 30,
            'id_curso' => 6,
            'id_nivel' => 5,
            'created_at' => Carbon::now()
        ]);

        //Nivel6
        DB::table('curso_nivels')->insert([
            'id' => 31,
            'id_curso' => 1,
            'id_nivel' => 6,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 32,
            'id_curso' => 2,
            'id_nivel' => 6,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 33,
            'id_curso' => 3,
            'id_nivel' => 6,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 34,
            'id_curso' => 4,
            'id_nivel' => 6,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 35,
            'id_curso' => 5,
            'id_nivel' => 6,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 36,
            'id_curso' => 6,
            'id_nivel' => 6,
            'created_at' => Carbon::now()
        ]);

        //Nivel7
        DB::table('curso_nivels')->insert([
            'id' => 37,
            'id_curso' => 1,
            'id_nivel' => 7,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 38,
            'id_curso' => 2,
            'id_nivel' => 7,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 39,
            'id_curso' => 3,
            'id_nivel' => 7,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 40,
            'id_curso' => 4,
            'id_nivel' => 7,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 41,
            'id_curso' => 5,
            'id_nivel' => 7,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 42,
            'id_curso' => 6,
            'id_nivel' => 7,
            'created_at' => Carbon::now()
        ]);

        //Nivel8
        DB::table('curso_nivels')->insert([
            'id' => 43,
            'id_curso' => 1,
            'id_nivel' => 8,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 44,
            'id_curso' => 2,
            'id_nivel' => 8,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 45,
            'id_curso' => 3,
            'id_nivel' => 8,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 46,
            'id_curso' => 4,
            'id_nivel' => 8,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 47,
            'id_curso' => 5,
            'id_nivel' => 8,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 48,
            'id_curso' => 6,
            'id_nivel' => 8,
            'created_at' => Carbon::now()
        ]);
        
        //Nivel 9
        /* DB::table('curso_nivels')->insert([
            'id' => 49,
            'id_curso' => 1,
            'id_nivel' => 9,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 50,
            'id_curso' => 2,
            'id_nivel' => 9,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 51,
            'id_curso' => 3,
            'id_nivel' => 9,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 52,
            'id_curso' => 4,
            'id_nivel' => 9,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 53,
            'id_curso' => 5,
            'id_nivel' => 9,
            'created_at' => Carbon::now()
        ]);
        DB::table('curso_nivels')->insert([
            'id' => 54,
            'id_curso' => 6,
            'id_nivel' => 9,
            'created_at' => Carbon::now()
        ]); */
    }
}
