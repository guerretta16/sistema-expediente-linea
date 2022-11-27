<?php

namespace App\Service;

use App\Models\CargaAcademica;
use App\Models\CursoNivelMes;

class CursoNivelMesService {

    public function getMesesByCursoNivel(CargaAcademica $cargaAcademica){
        $cursoNivels = CursoNivelMes::select('id', 'id_mes')
            ->where('id_curso_nivel', $cargaAcademica->id_curso_nivel)->get();
        foreach($cursoNivels as $cursos){
            $cursos['meses'] = $cursos->mes()->select('id', 'nombre_mes')->get();
        }
        return $cursoNivels;
    }
}