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
        Schema::create('periodos', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("codigo_periodo", 10)->nullable($value = false)->unique();
            $table->date("fecha_inicio_periodo")->nullable($value = false);
            $table->date("fecha_fin_periodo")->nullable($value = false);
            $table->boolean("activo_periodo")->nullable($value = false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('periodos');
    }
};
