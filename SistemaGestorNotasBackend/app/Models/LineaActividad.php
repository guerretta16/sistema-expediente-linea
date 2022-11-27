<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LineaActividad extends Model
{
    use HasFactory;

    public function actividad()
    {
        return $this->belongsTo(Actividad::class, 'id_actividad');
    }

    public function registroNota(){
        return $this->hasOne(RegistroNota::class, 'id_linea_actividad');
    }
}
