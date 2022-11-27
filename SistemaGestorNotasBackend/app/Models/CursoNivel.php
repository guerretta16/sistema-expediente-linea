<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CursoNivel extends Model
{
    use HasFactory;


    public function curso() {
        return $this->belongsTo(Curso::class, 'id_curso');
    }

    public function nivel() {
        return $this->belongsTo(Nivel::class, 'id_nivel');
    }

    public function actividades(){
        return $this->hasMany(Actividad::class, 'id_curso_nivel');
    }

    public function registroDocenteCurso() {
        return $this->hasMany(RegistroDocenteCurso::class, 'id_nivel_curso');
    }

    public function cargaAcademica (){
        return $this->hasMany(CargaAcademica::class, 'id_curso_nivel');
    }
    
    public function cursoNivelMes (){
        return $this->hasMany(CursoNivelMes::class, 'id_curso_nivel');
    }
}
