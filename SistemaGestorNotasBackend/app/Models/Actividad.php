<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actividad extends Model
{
    use HasFactory;

    public function lineaActividad (){
        return $this->hasMany(LineaActividad::class, "id_actividad");
    }

    public function cursoNivel (){
        return $this->belongsTo(CursoNivel::class, 'id_curso_nivel');
    }
}
