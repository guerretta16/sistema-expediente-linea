<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alumno extends Model
{
    use HasFactory;

    /*protected $fillable = [
        'nie_alumno',
        'nombre_alumno',
        'apellido_alumno',
        'nombre_encargado_alumno',
        'fecha_nacimiento_alumno',
        'id_categoria-alumno',
        'codigo_alumno'
    ];*/

    protected $guarded = [];

    public function cargaAcademica (){
        return $this->hasMany(CargaAcademica::class, 'id_alumno');
    }

    public function user() {
        return $this->belongsTo(User::class, 'id_user');
    }
}
