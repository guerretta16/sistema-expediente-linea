<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CargaAcademica extends Model
{
    use HasFactory;

    public function alumno(){
        return $this->belongsTo(Alumno::class, 'id_alumno');
    }

    public function periodo(){
        return $this->belongsTo(Periodo::class, 'id_periodo');
    }

    public function cursoNivel(){
        return $this->belongsTo(CursoNivel::class, 'id_curso_nivel');
    }

    public function registroNotas(){
        return $this->hasMany(RegistroNota::class, 'id_carga_academica');
    }
}
