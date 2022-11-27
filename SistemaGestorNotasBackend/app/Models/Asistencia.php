<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asistencia extends Model
{
    use HasFactory;
    
    public function alumno(){
        return $this->belongsTo(Alumno::class, 'id_alumno');
    }

    public function periodo(){
        return $this->belongsTo(Periodo::class, 'id_periodo');
    }

}
