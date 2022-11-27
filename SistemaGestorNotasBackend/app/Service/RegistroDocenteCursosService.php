<?php
/**
 * @author JS Martinez
 */

namespace App\Service;

use App\Models\Periodo;
use App\Models\RegistroDocenteCurso;
use Carbon\Carbon;
use App\Utils\ValidateJsonRequest;
use App\Utils\MessageResponse;
use Exception;
use Illuminate\Support\Facades\DB;
class RegistroDocenteCursosService {


    /**
     * @param Aray $data
     * @return Array $responseMessage
     */
    public function registroDocente($data) {

        $responseValidate = ValidateJsonRequest::validateJsonRequestRegistroDocenteCurso($data);
        if(count($responseValidate) > 0) {
            return $responseValidate;
        }

        $idPeriodo = $data['idPeriodo'];
        $rol = $data['rol'];
        $idDocente = $data['idDocente'];
        $idNivelCurso = $data['idNivelCurso'];


        $responseValidateLogicRegister = $this->validateLogicRegisterDocentes($idPeriodo, $idNivelCurso,
            $idDocente, $rol, 1, 1);

        if(count($responseValidateLogicRegister) > 0) {
            return $responseValidateLogicRegister;
        }

        $periodoActivoBool = Periodo::find($idPeriodo);
        if(!$periodoActivoBool->activo_periodo) {
            return MessageResponse::messageDescriptionError("Error", "Error el periodo no esta activo");

        }
        
        $registroDocenteCurso = new RegistroDocenteCurso;
        $registroDocenteCurso->id_docente = $idDocente;
        $registroDocenteCurso->id_nivel_curso = $idNivelCurso;
        $registroDocenteCurso->id_periodo = $idPeriodo;
        $registroDocenteCurso->rol = $rol;
        $registroDocenteCurso->created_at = Carbon::now();
        $responseBolean = $registroDocenteCurso->save();

        return MessageResponse::returnResponse($responseBolean);

    }


    /**
     * @param Array $jsonRequest
     * @param \App\Models\RegistroDocenteCurso $registroDocenteCurso
     * @return Array $responseMessage
     */
    public function updateRegisterDocenteCurso($jsonRequest, $registroDocenteCurso) {
        $responseValidate = ValidateJsonRequest::validateJsonRequestRegistroDocenteCurso($jsonRequest);
        if(count($responseValidate) > 0) {
            return $responseValidate;
        }

        $countUpdateDocente = 1;
        $countUpdateRol = 1;
        if($registroDocenteCurso->id_docente == $jsonRequest['idDocente']) {
            $countUpdateDocente = 2;
        }
        if($jsonRequest['rol'] == "mentor") {
            if($jsonRequest['rol'] == $registroDocenteCurso->rol) {
                $countUpdateRol = 2;
            }
        }

        $responseValidateLogic = $this->validateLogicRegisterDocentes(
            $jsonRequest['idPeriodo'],
            $registroDocenteCurso->id_nivel_curso,
            $jsonRequest['idDocente'],
            $jsonRequest['rol'],
            $countUpdateDocente,
            $countUpdateRol
        );
        
        if(count($responseValidateLogic) > 0) {
            return $responseValidateLogic;
        }

        $registroDocenteCurso->id_docente = $jsonRequest['idDocente'];
        $registroDocenteCurso->rol = $jsonRequest['rol'];
        $registroDocenteCurso->updated_at = Carbon::now();
        $responseBool = $registroDocenteCurso->update();
        return MessageResponse::returnResponse($responseBool);
    }


    public function updateDocentesAsignadosCurso($jsonRequest, $registroDocenteCurso) {
        $responseValidate = ValidateJsonRequest::validateJsonRequestRegistroDocenteCurso($jsonRequest);
        if(count($responseValidate) > 0) {
            return $responseValidate;
        }

        $countUpdateDocente = 1;
        $countUpdateRol = 1;
        if($registroDocenteCurso->id_docente == $jsonRequest['idDocente']) {
            $countUpdateDocente = 2;
        }
        if($jsonRequest['rol'] == "mentor") {
            if($jsonRequest['rol'] == $registroDocenteCurso->rol) {
                $countUpdateRol = 2;
            }
        }

        $responseValidateLogic = $this->validateLogicRegisterDocentes(
            $jsonRequest['idPeriodo'],
            $registroDocenteCurso->id_nivel_curso,
            $jsonRequest['idDocente'],
            $jsonRequest['rol'],
            $countUpdateDocente,
            $countUpdateRol
        );
        
        if(count($responseValidateLogic) > 0) {
            return $responseValidateLogic;
        }

        $registroDocenteCurso->id_docente = $jsonRequest['idDocente'];
        $registroDocenteCurso->rol = $jsonRequest['rol'];
        $registroDocenteCurso->updated_at = Carbon::now();
        $responseBool = $registroDocenteCurso->update();
        return MessageResponse::returnResponse($responseBool);
    }

    //Este servicio se encarga de la eliminacion de Docentes de un curso, seleecionando su periodo, el nivel del curso y el Docente
    //que se eliminar

    public function eliminarDocenteCursosAsignado($v1, $v2, $v3){

        try{
            // Se realiza el delete
            if(!isset($v1)){
                return MessageResponse::messageDescriptionError("Error"," ");
           }else{
            $deleted = DB::table('registro_docente_cursos')
            ->where('id_nivel_curso', '=', $v1)
            ->where('id_docente', '=', $v2)
            ->where('id_periodo','=',$v3)->delete();
            // $responseBool = DB::delete('delete registro_docente_cursos where id_nivel_curso = ? and id_periodo = ? and id_docente = ? and rol != "mentor', [$registroDocenteCurso['idNivelCurso']], [$registroDocenteCurso['idPeriodo']], [$registroDocenteCurso['idDocente']]);
            return response(MessageResponse::returnResponse1($deleted) , 200 );
           }
           

        }
        catch(Exception $ex){
            error_log($ex);
        }


    }


    /**
     * @param int $idDocente
     * @param int $idPeriodo
     * 
     * @return Array $arrayPadre
     */
    public function getAllRegisterByDocente($idDocente, $idPeriodo) {
        $arrayPadre = [];
        $arrayHijo = [];

        $nivelsForDocentes = DB::table('registro_docente_cursos')
            ->select('nivels.nombre_nivel', 'nivels.id')
            ->join('curso_nivels', 'curso_nivels.id', '=', 'registro_docente_cursos.id_nivel_curso')
            ->join('nivels', 'nivels.id', '=', 'curso_nivels.id_nivel')
            ->where('registro_docente_cursos.id_docente', '=', $idDocente)
            ->where('registro_docente_cursos.id_periodo', '=', $idPeriodo)
            ->groupBy('nivels.id')
            ->get();

        foreach($nivelsForDocentes as $nivels) {
            $arrayHijo["nombre"] = $nivels->nombre_nivel;
            $a = DB::table('registro_docente_cursos')
            ->select('nivels.nombre_nivel', 
                'registro_docente_cursos.id as idRegistroCurso',
                'nivels.id as idNivel', 
                'curso_nivels.id as idCursoNivel', 
                'cursos.id as idCurso',
                'cursos.nombre_curso',
                'nivels.nombre_nivel'
            )
            ->join('curso_nivels', 'registro_docente_cursos.id_nivel_curso', '=', 'curso_nivels.id')
            ->join('cursos', 'curso_nivels.id_curso', '=', 'cursos.id')
            ->join('nivels', 'curso_nivels.id_nivel', '=', 'nivels.id')
            ->where('registro_docente_cursos.id_docente', '=', $idDocente)
            ->where('registro_docente_cursos.id_periodo', '=', $idPeriodo)
            ->where('nivels.id', '=', $nivels->id)
            ->get();
            $arrayHijo['values'] = $a;
            array_push($arrayPadre, $arrayHijo);
        }
        return $arrayPadre;

    }


    /**
     * @param int $idPeriodo
     * @param int $idNivelCurso
     * @param int $idDocente
     * @param string $rol
     * @param String $countUpdateDocente
     * @param String $countUpdateRol
     * @return Array responseMessage
     */
    private function validateLogicRegisterDocentes(
        $idPeriodo, 
        $idNivelCurso, 
        $idDocente, 
        $rol, 
        $countUpdateDocente,
        $countUpdateRol
    ) {
        
        $searchRegistroDocenteCurso = RegistroDocenteCurso::where('id_nivel_curso', $idNivelCurso)
            ->where('id_periodo', $idPeriodo)->get();
        if(count($searchRegistroDocenteCurso) > 3 ) {
            return MessageResponse::messageDescriptionError("Error", "No puede registrar mas de 3 docentes");
        }

        if($rol == "mentor") {
            $searchRegistroDocenteCursoMentor = RegistroDocenteCurso::where('id_nivel_curso', $idNivelCurso)
                ->where('id_periodo', $idPeriodo)->where('rol', 'mentor')->get();

            if(count($searchRegistroDocenteCursoMentor) >= $countUpdateRol ) {
                return MessageResponse::messageDescriptionError("Error", "No puede registrar mas de 1 mentor");
            }
        }

        $searchDocente = RegistroDocenteCurso::where('id_docente', $idDocente)
            ->where('id_nivel_curso', $idNivelCurso)->where('id_periodo', $idPeriodo)->get();
        if(count($searchDocente) >= $countUpdateDocente) {
            return MessageResponse::messageDescriptionError("Error", "No se puede dos veces el mismo maestro");
        }
        return [];

    }


}

