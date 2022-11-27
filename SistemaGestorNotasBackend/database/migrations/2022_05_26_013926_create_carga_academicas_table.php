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
        Schema::create('carga_academicas', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->dateTime("fecha_inscripcion_carga")->nullable($value = false);
            $table->foreignId("id_alumno")->references("id")->on("alumnos");
            $table->foreignId("id_periodo")->references("id")->on("periodos");
            $table->foreignId("id_curso_nivel")->references("id")->on("curso_nivels");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('carga_academicas');
    }
};
