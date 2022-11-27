<?php

namespace App\Service;

use App\Models\Alumno;
use App\Utils\ValidateJsonRequest;
use App\Utils\MessageResponse;
use Carbon\Carbon;
use Exception;

class AlumnoService
{

    public function traerAlumnos()
    {
        return Alumno::all();
    }

    public function crearAlumno()
    {
    }

    public function modificarAlumno($requestInfo, $alumno)
    {
        $validateData = ValidateJsonRequest::validateJsonRequestAlumno($requestInfo);
        if (count($validateData) > 0) {
            return $validateData;
        }

        try {
            $alumno->nombre_alumno = $requestInfo["nombre_alumno"];
            $alumno->apellido_alumno = $requestInfo["apellido_alumno"];
            $alumno->nombre_encargado_alumno = $requestInfo["nombre_encargado_alumno"];
            $alumno->nie_alumno = $requestInfo["nie_alumno"];
            $alumno->fecha_nacimiento_alumno = $requestInfo["fecha_nacimiento_alumno"];
            $alumno->id_categoria_alumno = $requestInfo["id_categoria_alumno"];
            //$alumno->id_user_alumno = $requestInfo->post("nombre_alumno");
            $alumno->codigo_alumno = $requestInfo["codigo_alumno"];
            $alumno->email_alumno = $requestInfo["email_alumno"];
            $alumno->updated_at = Carbon::now();

            $responseBool = $alumno->save();
            return MessageResponse::returnResponse($responseBool);
        } catch (Exception $ex) {
            error_log($ex);
        }
    }

    public function eliminarAlumno($alumno){
        try{
            $responseBool = $alumno->delete();
            return MessageResponse::returnResponse($responseBool);
        }
        catch(Exception $ex){
            return MessageResponse::returnResponse(false);
        }
    }
}
