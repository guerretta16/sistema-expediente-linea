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
        Schema::create('profesors', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("nombre_profesor", 100)->nullable(false);
            $table->string("apellido_profesor", 100)->nullable(false);
            $table->date("fecha_nacimiento_profesor")->nullable(false);
            $table->string("dui_profesor", 10)->nullable(false);
            $table->foreignId('id_user')->nullable()->references('id')->on('users');
            $table->string("codigo_profesor",10)->nullable(false)->unique();
            $table->string("email_profesor")->unique()->nullable(false);
            $table->string('photo_profesor',200)->nullable(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profesors');
    }
};
