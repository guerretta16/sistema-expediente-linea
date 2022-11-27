<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProfesorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('profesors')->insert([
            'nombre_profesor' => 'Juan Antonio',
            'apellido_profesor' => 'Rivera',
            'fecha_nacimiento_profesor' => '1970-05-27',
            'dui_profesor' => '12345678-1',
            'id_user' => 3,
            'codigo_profesor' => 'jr1234',
            'email_profesor' => 'juan@gmail.com'
        ]);
        DB::table('profesors')->insert([
            'nombre_profesor' => 'Carlos Eduardo',
            'apellido_profesor' => 'Gonzales',
            'fecha_nacimiento_profesor' => '1960-05-27',
            'dui_profesor' => '12345679-1',
            'id_user' => 2,
            'codigo_profesor'=> 'cg5678',
            'email_profesor' => 'carlos@gmail.com'
        ]);
        DB::table('profesors')->insert([
            'nombre_profesor' => 'Veronica Raquel',
            'apellido_profesor' => 'Guerra',
            'fecha_nacimiento_profesor' => '1980-05-27',
            'dui_profesor' => '12345678-9',
            'codigo_profesor' => "vg1010",
            'email_profesor' => 'veronica@gmail.com'
        ]);

        DB::table('profesors')->insert([
            'nombre_profesor' => 'Jose Andres',
            'apellido_profesor' => 'Gonzales',
            'fecha_nacimiento_profesor' => '1980-05-27',
            'dui_profesor' => '12345688-9',
            'codigo_profesor' => 'jg1111',
            'email_profesor' => 'jose@gmail.com'
        ]);
    }
}
