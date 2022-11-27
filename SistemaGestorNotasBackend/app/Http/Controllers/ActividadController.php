<?php

namespace App\Http\Controllers;

use App\Models\Actividad;
use App\Service\ActividadService;
use Illuminate\Http\Request;

class ActividadController extends Controller
{

    protected $actividadService;

    public function __construct(ActividadService $actividadService)
    {
        $this->actividadService = $actividadService;
    }


    public function indexActividad($id_periodo, $id_curso_nivel)
    {
       return $this->actividadService->traerActividades($id_periodo, $id_curso_nivel);
    }

   
    public function storeActividad(Request $request)
    {
        $response = $this->actividadService->registrarActividad($request->json()->all());
        return $response;
    }

    
    public function showActividad($id)
    {
        return Actividad::where("id", $id)->get();
    }

    
    public function updateActividad(Request $request, Actividad $actividad)
    {
        
        $response = $this->actividadService->actualizarActividad($request->json()->all(), $actividad);
        return $response;
    }


    public function destroyActividad(Actividad $actividad)
    {
        $response = $this->actividadService->borrarActividad($actividad);
        return $response;
    }


 
}
