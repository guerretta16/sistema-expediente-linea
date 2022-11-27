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
        Schema::create('alumnos', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("nombre_alumno", 50)->nullable($value = false);
            $table->string("apellido_alumno", 50)->nullable($value = false);
            $table->string("nombre_encargado_alumno", 100)->nullable($value = false);
            $table->string("nie_alumno", 12)->nullable($value = false);
            $table->date("fecha_nacimiento_alumno")->nullable($value = false);
            $table->foreignId("id_categoria_alumno")->references("id")->on("categoria_alumnos");
            $table->foreignId("id_user")->unique()->references("id")->on("users");
            $table->string('photo_alumno',200)->nullable(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('alumnos');
    }
};
