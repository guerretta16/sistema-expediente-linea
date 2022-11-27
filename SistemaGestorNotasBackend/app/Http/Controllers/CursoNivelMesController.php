<?php

namespace App\Http\Controllers;

use App\Models\CargaAcademica;
use App\Service\CursoNivelMesService;
use Illuminate\Http\Request;

class CursoNivelMesController extends Controller
{
    protected $cursoNivelMesService;

    public function __construct(CursoNivelMesService $cursoNivelMesService)
    {
        $this->cursoNivelMesService = $cursoNivelMesService;
    }

    public function indexMesesByCursoNivel(CargaAcademica $cargaAcademica){
        $response = $this->cursoNivelMesService->getMesesByCursoNivel($cargaAcademica);
        return $response;
    }
}
