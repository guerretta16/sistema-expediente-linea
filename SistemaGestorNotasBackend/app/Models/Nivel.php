<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nivel extends Model
{
    use HasFactory;

    public function cursoNivel() {
        return $this->hasMany(Nivel::class, 'id_nivel');
    }
}
