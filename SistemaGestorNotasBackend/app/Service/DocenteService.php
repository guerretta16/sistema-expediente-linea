<?php

namespace App\Service;

use App\Models\Profesor;
use App\Utils\ValidateJsonRequest;
use App\Utils\MessageResponse;
use Carbon\Carbon;
use Exception;

class DocenteService{

    public function crearProfesor($requestInfo){
        $profesor = new Profesor;
        $validateInfo = ValidateJsonRequest::validateJsonRequestDocenteNew($requestInfo);
        if(count($validateInfo) > 0){
            return $validateInfo;
        }

        $profesor->nombre_profesor = $requestInfo["nombre_profesor"];
        $profesor->apellido_profesor = $requestInfo["apellido_profesor"];
        $profesor->fecha_nacimiento_profesor = $requestInfo["fecha_nacimiento_profesor"];
        $profesor->dui_profesor = $requestInfo["dui_profesor"];
        $profesor->email_profesor = $requestInfo["email_profesor"];
        $profesor->created_at = Carbon::now();

        $apel_str = explode(" ", $profesor->apellido_profesor);
        $anio_nacimiento = substr($profesor->fecha_nacimiento_profesor, 0, 4);

        try{
           $codigo = "";
           foreach($apel_str as $val){
            $codigo = $codigo . $val[0];
           }
           $codigo = $codigo . substr($anio_nacimiento, 2, 4) . rand(100, 999);
           $cant = Profesor::where('codigo_profesor', $codigo)->get();

           if(count($cant) > 0){
            do{
                $codigo = substr($codigo, 0, 4) . rand(100, 999);
                $i = Profesor::where('codigo_profesor', $codigo)->get();
            }
            while(count($i) > 0);
           }
           $profesor->codigo_profesor = $codigo;
           $responseBool = $profesor->save();
           return MessageResponse::returnResponse($responseBool);
        }
        catch(Exception $ex){
            error_log($ex->getMessage());
        }
    }

    public function modificarProfesor($requestInfo, $profesor){
        $validateInfo = ValidateJsonRequest::validateJsonRequestDocenteNew($requestInfo);
        if(count($validateInfo) > 0){
            return $validateInfo;
        }

        $profesor->nombre_profesor = $requestInfo["nombre_profesor"];
        $profesor->apellido_profesor = $requestInfo["apellido_profesor"];
        $profesor->fecha_nacimiento_profesor = $requestInfo["fecha_nacimiento_profesor"];
        $profesor->dui_profesor = $requestInfo["dui_profesor"];
        $profesor->email_profesor = $requestInfo["email_profesor"];
        $profesor->updated_at = Carbon::now();

        $apel_str = explode(" ", $profesor->apellido_profesor);
        $anio_nacimiento = substr($profesor->fecha_nacimiento_profesor, 0, 4);

        try{
           $codigo = "";
           foreach($apel_str as $val){
            $codigo = $codigo . $val[0];
           }
           $codigo = $codigo . substr($anio_nacimiento, 2, 4) . rand(100, 999);
           $cant = Profesor::where('codigo_profesor', $codigo)->get();

           if(count($cant) > 0){
            do{
                $codigo = substr($codigo, 0, 4) . rand(100, 999);
                $i = Profesor::where('codigo_profesor', $codigo)->get();
            }
            while(count($i) > 0);
           }
           $profesor->codigo_profesor = $codigo;
           $responseBool = $profesor->save();
           return MessageResponse::returnResponse($responseBool);
        }
        catch(Exception $ex){
            error_log($ex->getMessage());
        }

    }

    public function eliminarProfesor($profesor){
        try{
            $responseBool = $profesor->delete();
            return MessageResponse::returnResponse($responseBool);
        }
        catch(Exception $ex){
            error_log($ex);
        }
    }
}
