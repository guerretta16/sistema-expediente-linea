<?php

namespace App\Service;

use App\Models\CargaAcademica;
use App\Models\RegistroNota;
use App\Utils\ValidateJsonRequest;
use App\Utils\MessageResponse;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;


class RegistroNotasService {

    public function registrarNota($data, $nota){

        $responseValidate = ValidateJsonRequest::validateJasonRequestNota($data);
        if(count($responseValidate) > 0){
            return $responseValidate;
        }

        $notaValue = $data['nota'];

        if((float)$notaValue > 10.00 || (float)$notaValue < 0.00){
            return MessageResponse::messageDescriptionError('Error', 'La nota debe ser menor o igual a 10, o mayor o igual a 0');
        }

        try{
            $registroNota = RegistroNota::find($nota->id);
            $registroNota->nota = (float)$notaValue;
            $registroNota->updated_at = Carbon::now();
            $responseBool = $registroNota->save();
        }
        catch(Exception $ex){
            error_log($ex->getMessage());
        }

        return MessageResponse::returnResponse($responseBool);
    }

    public function editarNota(Request $request, $data){
        
    }
}