<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mes extends Model
{
    use HasFactory;

    public function cursoNivelMes(){
        return $this->hasMany(CursoNivelMes::class, 'id_mes');
    }
}
