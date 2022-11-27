<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    use HasFactory;


    public function cursoNivel() {
        return $this->hasMany(CursoNivel::class, 'id_curso');
    }
}
