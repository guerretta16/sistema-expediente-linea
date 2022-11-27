<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PeriodoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('periodos')->insert([
            'id' => 1,
            'codigo_periodo' => 'P2022',
            'fecha_inicio_periodo' => '2022-01-01',
            'fecha_fin_periodo' => '2022-05-07',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'activo_periodo' => true
        ]);
    }
}
