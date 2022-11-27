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
        Schema::create('actividads', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_actividad', 50)->nullable(false);
            $table->string('codigo_actividad', 10)->nullable(false);
            $table->decimal('porcentaje_actividad', 9, 2)->nullable(true);
            $table->foreignId('id_curso_nivel')->references('id')->on('curso_nivels');
            $table->foreignId('id_periodo')->references('id')->on('periodos');
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
        Schema::dropIfExists('actividads');
    }
};
