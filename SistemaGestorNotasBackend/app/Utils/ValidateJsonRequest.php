<?php
namespace App\Utils;

/**
 * @author JS Martinez
 */

use App\Utils\MessageResponse;


class ValidateJsonRequest {


    /**
     * @param Array $data
     * 
     * @return Array $responseMessage
     */
    public static function validateJsonRequestRegistroDocenteCurso($data) {

        if(!isset($data['idNivelCurso'])) {
            return MessageResponse::messageDescriptionError('Error',
            'El valor idNivelCurso es requerido');

        }
        if(!isset($data['idPeriodo'])) {
            return MessageResponse::messageDescriptionError('Error',
            'El valor idPeriodo es requerido');
        }
        if(!isset($data['idDocente'])) {
            return MessageResponse::messageDescriptionError('Error',
            'El valor idDocente es requerido');
        }
        return [];
    }

    /**
     * @param Array $data
     * 
     * @return Array $responseMessage
     */
    public static function validateJasonRequestActividad($data){
        if(!isset($data['nombre_actividad'])) {
            return MessageResponse::messageDescriptionError('Error',
            'El valor nombre_actividad es requerido');

        }
        if(!isset($data['codigo_actividad'])) {
            return MessageResponse::messageDescriptionError('Error',
            'El valor codigo_actividad es requerido');
        }
        if(!isset($data['id_curso_nivel'])) {
            return MessageResponse::messageDescriptionError('Error',
            'El valor id_curso_nivel es requerido');
        }
        if(!isset($data['id_periodo'])) {
            return MessageResponse::messageDescriptionError('Error',
            'El valor id_periodo es requerido');
        }
        if(!isset($data['numero_actividades'])) {
            return MessageResponse::messageDescriptionError('Error',
            'El valor numero_actividades es requerido');
        }
        if(!isset($data['porcentaje_actividad'])) {
            return MessageResponse::messageDescriptionError('Error',
            'El valor porcentaje_actividad es requerido');
        }

        return [];
    }

    /**
     * @param Array $data
     * 
     * @return Array $responseMessage
     */
    public static function validateJasonRequestActividadUpdate($data){
        if(!isset($data['nombre_actividad'])) {
            return MessageResponse::messageDescriptionError('Error',
            'El valor nombre_actividad es requerido');

        }
        if(!isset($data['codigo_actividad'])) {
            return MessageResponse::messageDescriptionError('Error',
            'El valor codigo_actividad es requerido');
        }
        if(!isset($data['porcentaje_actividad'])) {
            return MessageResponse::messageDescriptionError('Error',
            'El valor porcentaje_actividad es requerido');
        }

        return [];
    }

    public static function validateJasonRequestNota($data){
        if(!isset($data['id_curso_nivel_mes'])) {
            return MessageResponse::messageDescriptionError('Error',
            'Es necesario que elija un mes');
        }
        if(!isset($data['nota'])) {
            return MessageResponse::messageDescriptionError('Error',
            'El valor nota es requerido');
        }

        return [];
    }


    public static function validateJsonRequestStoreTeach($data) {
        if(!isset($data['id_person'])) {
            return MessageResponse::messageDescriptionError('Error', 
                'El valor id_person es requerido');
        }
        if(!isset($data['user_rol'])) {
            return MessageResponse::messageDescriptionError('Error',
                'El valor de user_rol es requerido');
        }

        if(!isset($data['user_type'])) {
            return MessageResponse::messageDescriptionError('Error',
                'El valor de user_type es requerido');
        }
        return [];
    }

    public static function validateJsonRequestDeleteUser($data) {
        if(!isset($data['id_user'])) {
            return MessageResponse::messageDescriptionError('Error',
                'El valor id_user es requerido');
        }
        if(!isset($data['type_user'])){
            return MessageResponse::messageDescriptionError('Error',
                'El valor type_user es requerido');
        }
        return [];
    }

    public static function validateJsonRequestAlumno($data) {
        if(!isset($data['nombre_alumno'])) {
            return MessageResponse::messageDescriptionError('Error', 
                'El nombre del alumno es requerido');
        }
        if(!isset($data['apellido_alumno'])) {
            return MessageResponse::messageDescriptionError('Error',
                'El apellido del alumno es requerido');
        }

        if(!isset($data['nombre_encargado_alumno'])) {
            return MessageResponse::messageDescriptionError('Error',
                'El nombre del responsable del alumno es requerido');
        }

        if(!isset($data['nie_alumno'])) {
            return MessageResponse::messageDescriptionError('Error',
                'El nie del alumno es requerido');
        }

        if(!isset($data['fecha_nacimiento_alumno'])) {
            return MessageResponse::messageDescriptionError('Error',
                'La fecha de nacimiento del alumno es requerida');
        }

        if(!isset($data['id_categoria_alumno'])) {
            return MessageResponse::messageDescriptionError('Error',
                'La categoría del alumno es requerido');
        }

        if(!isset($data['codigo_alumno'])) {
            return MessageResponse::messageDescriptionError('Error',
                'El código del alumno es requerido');
        }

        if(!isset($data['email_alumno'])) {
            return MessageResponse::messageDescriptionError('Error',
                'El email del alumno es requerido');
        }

        return [];
    }

    public static function validateJsonRequestDocenteNew($data) {
        if(!isset($data['nombre_profesor'])) {
            return MessageResponse::messageDescriptionError('Error', 
                'El nombre del profesor es requerido');
        }
        if(!isset($data['apellido_profesor'])) {
            return MessageResponse::messageDescriptionError('Error',
                'El apellido del profesor es requerido');
        }

        if(!isset($data['dui_profesor'])) {
            return MessageResponse::messageDescriptionError('Error',
                'El dui del profesor es requerido');
        }

        if(!isset($data['fecha_nacimiento_profesor'])) {
            return MessageResponse::messageDescriptionError('Error',
                'La fecha de nacimiento del profesor es requerida');
        }

        if(!isset($data['email_profesor'])) {
            return MessageResponse::messageDescriptionError('Error',
                'El email del profesor es requerido');
        }

        return [];
    }
    //Validadcion de incribir alumno a un curso
    public static function validateJsonRequestInscribirAlumnoCurso($data) {

        if(!isset($data['id_alumno'])) {
            return MessageResponse::messageDescriptionError('Error',
            'El valor id_alumno es requerido');

        }
        if(!isset($data['id_periodo'])) {
            return MessageResponse::messageDescriptionError('Error',
            'El valor id_periodo es requerido');
        }
        if(!isset($data['id_curso_nivel'])) {
            return MessageResponse::messageDescriptionError('Error',
            'El valor id_curso_nivel es requerido');
        }
        /* if(!isset($data['id_carga_academica'])) {
            return MessageResponse::messageDescriptionError('Error',
            'El valor id_carga_academica es requerido');
        } */
        return [];
    }

}

