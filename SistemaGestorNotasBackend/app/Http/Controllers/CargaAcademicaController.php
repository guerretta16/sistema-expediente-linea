<?php

namespace App\Http\Controllers;

use App\Models\CargaAcademica;
use App\Models\Mes;
use App\Models\Periodo;
use App\Service\CargaAcademicaService;
use Illuminate\Http\Request;

class CargaAcademicaController extends Controller
{
    protected $cargaAcademicaService;

    public function __construct(CargaAcademicaService $cargaAcademicaService)
    {
        $this->cargaAcademicaService = $cargaAcademicaService;
    }

    public function indexAlumnosByCarga($id_periodo, $id_curso_nivel){
        $response = $this->cargaAcademicaService->getAllAlumnosByCarga($id_periodo, $id_curso_nivel);
        return $response;
    }

    public function indexLineaActividadByCursoNivel(CargaAcademica $cargaAcademica){
        $response = $this->cargaAcademicaService->getAllLineaActividadByCursoNivel($cargaAcademica);
        return $response;
    }

    public function indexLineaActividadByCursoNivelMes(CargaAcademica $cargaAcademica, Mes $mes){
        $response = $this->cargaAcademicaService->getAllLineaActividadByCursoNivelMes($cargaAcademica, $mes);
        return $response;
    }

    public function indexGetAllAlumnosForBoleta(Periodo $periodo){
        return $this->cargaAcademicaService->getAllAlumnosForBoleta($periodo);
    }
}
