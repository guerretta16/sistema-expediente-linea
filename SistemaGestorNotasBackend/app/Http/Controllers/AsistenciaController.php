<?php

namespace App\Http\Controllers;

use App\Models\Asistencia;
use App\Models\CursoNivel;
use App\Models\Periodo;
use App\Service\Asis;
use App\Service\AsistenciaAlumnoService;
use App\Service\NominasNotasService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AsistenciaController extends Controller
{
    //

    protected $asistencia;

    public function __construct(AsistenciaAlumnoService $asistencia)
    {
        $this->asistencia = $asistencia;
    }

    public function asistenciaAlumno(Periodo $periodo, CursoNivel $curso_nivel)
    {
        return $this->asistencia->asistenciaAlumnoService($periodo, $curso_nivel);
    }

    public function storeAsistenciaAlumno(Request $request)
    {
        return $this->asistencia->storeAsistencias($request);
    }

    public function updateAsistenciaAlumno(Asistencia $asistencia)
    {
        return $this->asistencia->updateAsistencias($asistencia);
    }
}
?>
