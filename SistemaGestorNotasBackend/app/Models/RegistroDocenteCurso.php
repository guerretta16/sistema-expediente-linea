<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistroDocenteCurso extends Model
{
    use HasFactory;

    public function profesor() {
        return $this->belongsTo(Profesor::class, 'id_docente');
    }

    public function periodo() {
        return $this->belongsTo(Periodo::class, 'id_periodo');
    }

    public function nivelCurso() {
        return $this->belongsTo(CursoNivel::class, 'id_nivel_curso');
    }

}
