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
        Schema::create('registro_notas', function (Blueprint $table) {
            $table->id();
            $table->decimal('nota', 9, 2)->nullable(true);
            $table->foreignId('id_linea_actividad')->references('id')->on('linea_actividads');
            $table->foreignId('id_curso_nivel_mes')->references('id')->on('curso_nivel_mes');
            $table->foreignId('id_carga_academica')->references('id')->on('carga_academicas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('registro_notas');
    }
};
