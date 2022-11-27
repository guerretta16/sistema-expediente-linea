<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Periodo extends Model
{
    use HasFactory;

    public function registroDocenteCurso() {
        return $this->hasMany(RegistroDocenteCurso::class, 'id_periodo');
    }

    public function cargaAcademica (){
        return $this->hasMany(CargaAcademica::class, 'id_periodo');
    }
}
