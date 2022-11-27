<?php

namespace App\Http\Controllers;

use App\Models\RegistroDocenteCurso;
use Illuminate\Http\Request;

class TestsController extends Controller
{

    public function deleteRegisterAssignTeacher(Request $request) {
        error_log($request->idNivelCurso);
        error_log($request->idPeriodo);

        RegistroDocenteCurso::where('id_nivel_curso', $request->idNivelCurso)
            ->where('id_periodo', $request->idPeriodo)
            ->delete();
            return "ok";
    }
}
