<?php

namespace App\Http\Controllers;

/**
 * @author JS Martinez
 */
use App\Models\Periodo;
use App\Models\RegistroDocenteCurso;
use App\Utils\MessageResponse;
use App\Service\RegistroDocenteCursosService;
use Illuminate\Http\Request;

use App\Utils\AuthJwtUtils;

class RegistroDocenteCursoController extends Controller
{

    protected $registroDocenteCursosService;

    public function __construct(RegistroDocenteCursosService $registroDocenteCursosService) {
        $this->registroDocenteCursosService = $registroDocenteCursosService;
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return Array $responseJson;
     */
    public function storeRegisterProfessor(Request $request) {
        $responseJson = $this->registroDocenteCursosService->registroDocente($request->json()->all());
        return $responseJson;
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return Array $register;
     */
    public function getRegisterByIdPeriodAndByIdNivelCurso(Request $request) {
        $idNivelCurso = $request->get('idNivelCurso');
        $idPeriodo = $request->get('idPeriodo');

        $periodo = Periodo::find($idPeriodo);
        $periodoActivo = $periodo->activo_periodo;

        $registers = RegistroDocenteCurso::where('id_nivel_curso', $idNivelCurso)
            ->where('id_periodo', $idPeriodo)->with('profesor')->get();

        foreach($registers as $register) {
            $register['activo'] = $periodoActivo;
        }
        return $registers;
    }


    /**
     * @param \App\Models\RegistroDocenteCurso $registroDocenteCurso
     * @return Array $responseMessage;
     */
    public function deleteRegisterDocenteCurso(RegistroDocenteCurso $registroDocenteCurso) {
        $boolResponse = $registroDocenteCurso->delete();
        
        return MessageResponse::returnResponse($boolResponse);

    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\RegistroDocenteCurso $registroDocenteCurso
     * @return Array $responseMessage;
     */
    public function updateRegisterDocenteCurso(
        RegistroDocenteCurso $registroDocenteCurso,
        Request $request
    ) {
        $jsonRequest = $request->json()->all();
        return $this->registroDocenteCursosService
                             ->updateRegisterDocenteCurso($jsonRequest, $registroDocenteCurso);
    }


    public function updateDocenteCurso(RegistroDocenteCurso $registroDocenteCurso,Request $request) 
    {
        $jsonRequest = $request->json()->all();
       
        return $this->registroDocenteCursosService->updateDocentesAsignadosCurso($jsonRequest, $registroDocenteCurso);
    }


    //---------------------------Elimnar docente de un curso, este no debe poseer un rol del tipo mentor-------------


    public function deleteDocenteCurso( $v1, $v2, $v3) 
    {
            return $this->registroDocenteCursosService->eliminarDocenteCursosAsignado($v1 , $v2 , $v3);
    }

    
    //------------------------------------------------------------------------------------------------

    /**
     * @param \Illuminate\Http\Request $request
     * @return Array $responseMessage;
     */
    public function getAllRegisterByDocentePeriodoCursoNivel(Request $request) {

        $jwt = AuthJwtUtils::getSubStringHeaderAuthorization($request->header('Authorization'));
        $user = AuthJwtUtils::getUserForJWT($jwt);
        $docente = $user->professor;
        $idPeriodo = $request->get('idPeriodo');

        $responseNivels = $this->registroDocenteCursosService
            ->getAllRegisterByDocente($docente->id, $idPeriodo);

        return $responseNivels;
    }

}
