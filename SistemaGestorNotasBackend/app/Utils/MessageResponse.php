<?php

/**
 * @author JS Martinez
 */
namespace App\Utils;
use Carbon\Carbon;

define('SUCCESS', 0);
define('ERROR', 1);

class MessageResponse {

    /**
     * @param string typeMessage
     * @param string descripcionMessage
     * 
     * @return Array responseMessage
     */
    public static function messageDescriptionError($typeMessage, $descriptionMessage) {
        $codeError = SUCCESS;
        if($typeMessage == "Error") {
            $codeError = ERROR;
        }
        return  [
            "codeError" => $codeError,
            "message" => $typeMessage,
            "descripcionMessage" => $descriptionMessage,
            "dateMessage" => Carbon::now()
        ];
    }

    /**
     * @param bool $responseBool
     * @return Array $responseMessage
     */

    public static function returnResponse1($responseBool) {
        if($responseBool) {
            return MessageResponse::messageDescriptionError("Ok", "Registro borrado exitosamente");
        } else {
            return MessageResponse::messageDescriptionError("Error", "No se ha podido encontrar el registro");
        }
    }

    public static function returnResponse($responseBool) {
        if($responseBool) {
            return MessageResponse::messageDescriptionError("Ok", "Save Success");
        } else {
            return MessageResponse::messageDescriptionError("Error", "Save failed");
        }
    }
}



