<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CursoNivelMes extends Model
{
    use HasFactory;

    public function registroNotas(){
        return $this->hasMany(RegistroNota::class, 'id_curso_nivel_mes');
    }

    public function cursoNivel(){
        return $this->belongsTo(CursoNivel::class, 'id_curso_nivel');
    }

    public function mes(){
        return $this->belongsTo(Mes::class, 'id_mes');
    }
}
