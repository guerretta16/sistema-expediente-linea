<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('mes')->insert([
            'id' => 1,
            'codigo_mes' => 'M1',
            'nombre_mes' => 'MES1'
        ]);
        DB::table('mes')->insert([
            'id' => 2,
            'codigo_mes' => 'M2',
            'nombre_mes' => 'MES2'
        ]);
        DB::table('mes')->insert([
            'id' => 3,
            'codigo_mes' => 'M3',
            'nombre_mes' => 'MES3'
        ]);
        DB::table('mes')->insert([
            'id' => 4,
            'codigo_mes' => 'M4',
            'nombre_mes' => 'MES4'
        ]);
        DB::table('mes')->insert([
            'id' => 5,
            'codigo_mes' => 'M5',
            'nombre_mes' => 'MES5'
        ]);
        DB::table('mes')->insert([
            'id' => 6,
            'codigo_mes' => 'M6',
            'nombre_mes' => 'MES6'
        ]);
    }
}
