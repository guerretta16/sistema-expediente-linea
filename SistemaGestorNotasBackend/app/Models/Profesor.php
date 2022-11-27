<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profesor extends Model
{
    use HasFactory;

    public function registroDocenteCurso() {
        
        return $this->hasMany(RegistroDocenteCurso::class, 'id_docente');
    }

    public function user() {
        return $this->belongsTo(User::class, 'id_user');
    }

}
