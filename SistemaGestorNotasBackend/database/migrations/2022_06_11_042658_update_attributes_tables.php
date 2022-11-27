<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('actividads', function(Blueprint $table){
            $table->string('nombre_actividad', 35)->change();
        });

        Schema::table('linea_actividads', function(Blueprint $table){
            $table->string('nombre_linea_actividad', 35)->change();
            $table->string('codigo_linea_actividad', 10)->change();
        });

        Schema::table('alumnos', function(Blueprint $table){
            $table->string('codigo_alumno', 7)->change();
        });

        Schema::table('categoria_alumnos', function(Blueprint $table){
            $table->string('nombre_categoria_alumno', 50)->change();
            $table->string('codigo_categoria_alumno', 10)->change();
        });

        Schema::table('rols', function(Blueprint $table){
            $table->string('codigo_rol', 15)->change();
            $table->string('nombre_rol', 50)->change();
        });

        Schema::table('users', function(Blueprint $table){
            $table->string('username', 75)->change();
            $table->string('password', 75)->change();
            $table->string('email', 100)->nullable(true)->unique();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
