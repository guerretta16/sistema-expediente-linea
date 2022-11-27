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
        Schema::create('curso_nivel_mes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_mes')->references('id')->on('mes');
            $table->foreignId('id_curso_nivel')->references('id')->on('curso_nivels');
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
        Schema::dropIfExists('curso_nivel_mes');
    }
};
