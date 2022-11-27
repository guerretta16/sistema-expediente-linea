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
        Schema::create('registro_docente_cursos', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("rol", 15)->nullable($value = false);
            $table->foreignId('id_nivel_curso')->references('id')->on('curso_nivels');
            $table->foreignId('id_docente')->references('id')->on('profesors');
            $table->foreignId('id_periodo')->references('id')->on('periodos');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('registro_docente_cursos');
    }
};
