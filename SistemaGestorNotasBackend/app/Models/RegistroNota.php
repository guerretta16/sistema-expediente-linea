<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistroNota extends Model
{
    use HasFactory;

    public function lineaActividad () {
        return $this->belongsTo(LineaActividad::class, 'id_linea_actividad');
    }

    public function cursoNivelMes () {
        return $this->belongsTo(CursoNivelMes::class, 'id_curso_nivel_mes');
    }

    public function cargaAcademica () {
        return $this->belongsTo(CargaAcademica::class, 'id_carga_academica');
    }
}
