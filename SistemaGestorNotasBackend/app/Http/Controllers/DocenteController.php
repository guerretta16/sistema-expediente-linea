<?php

namespace App\Http\Controllers;

use App\Models\Profesor;
use App\Service\DocenteService;
use Illuminate\Http\Request;

class DocenteController extends Controller
{

    protected $docenteService;

    public function __construct(DocenteService $docenteService)
    {
        $this->docenteService = $docenteService;
    }

    public function getAllDocentes() {
        return Profesor::all();
    }

    public function getDocenteById(Profesor $profesor) {
        return $profesor;
    }

    public function store(Request $request){
        return $this->docenteService->crearProfesor($request);
    }

    public function show(Profesor $profesor) {
        return $profesor;
    }

    public function update(Request $request, Profesor $profesor)
    {
        error_log($profesor);
        error_log($request['nombre_profesor']);
        return $this->docenteService->modificarProfesor($request, $profesor);
    }


    public function destroy(Profesor $profesor)
    {
        return $this->docenteService->eliminarProfesor($profesor);
    }
}
