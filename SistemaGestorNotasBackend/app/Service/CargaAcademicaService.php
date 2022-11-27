<?php

namespace App\Service;

use App\Models\CargaAcademica;
use App\Models\CursoNivel;
use App\Models\RegistroNota;
use App\Models\Periodo;
use App\Utils\ValidateJsonRequest;
use App\Utils\MessageResponse;
use Carbon\Carbon;
use Error;

use Exception;
use Illuminate\Support\Facades\DB;

class CargaAcademicaService
{

    public function getAllAlumnosByCarga($id_periodo, $id_curso_nivel)
    {
        $cargaAcademica = CargaAcademica::select('id', 'id_alumno')
            ->where('id_periodo', $id_periodo)
            ->where('id_curso_nivel', $id_curso_nivel)->get();
        foreach ($cargaAcademica as $carga) {
            $carga['alumno'] = $carga->alumno()->select('codigo_alumno', 'nombre_alumno', 'apellido_alumno')->get();
        }
        return $cargaAcademica;
    }

    public function getAllAlumnosForBoleta($periodo){
        
        return DB::table('carga_academicas')
        ->select('alumnos.id', 'alumnos.codigo_alumno', 'alumnos.nombre_alumno', 'alumnos.apellido_alumno')
        ->distinct()
        ->join('alumnos', 'alumnos.id', '=', 'carga_academicas.id_alumno')
        ->where('carga_academicas.id_periodo', $periodo->id)
        ->get();
    }

    public function getAllLineaActividadByCursoNivel(CargaAcademica $cargaAcademica)
    {
        $infoGeneral = DB::table('carga_academicas')
            ->select('alumnos.codigo_alumno', 'alumnos.nombre_alumno', 'alumnos.apellido_alumno', 'periodos.codigo_periodo', 'cursos.nombre_curso', 'nivels.nombre_nivel')
            ->join('alumnos', 'carga_academicas.id_alumno', '=', 'alumnos.id')
            ->join('periodos', 'carga_academicas.id_periodo', '=', 'periodos.id')
            ->join('curso_nivels', 'carga_academicas.id_curso_nivel', '=', 'curso_nivels.id')
            ->join('cursos', 'curso_nivels.id_curso', '=', 'cursos.id')
            ->join('nivels', 'curso_nivels.id_nivel', '=', 'nivels.id')
            ->where('carga_academicas.id', $cargaAcademica->id )
            ->first();

        $actividades = CursoNivel::find($cargaAcademica->id_curso_nivel)
            ->actividades()
            ->where('id_periodo', $cargaAcademica->id_periodo)
            ->select('id', 'nombre_actividad', 'porcentaje_actividad')
            ->get();

        $pruebaUnion = null;

        $meses = DB::table('curso_nivel_mes')
            ->select('curso_nivel_mes.id_mes', 'mes.codigo_mes', 'curso_nivel_mes.id')
            ->join('mes', 'curso_nivel_mes.id_mes', '=', 'mes.id')
            ->where('id_curso_nivel', $cargaAcademica->id_curso_nivel)
            ->get();

        foreach ($actividades as $actividad) {
            $lineas = $actividad->lineaActividad()->select('id', 'nombre_linea_actividad')->get();
            foreach ($lineas as $linea) {

                $validarNota = DB::table('registro_notas')
                    ->select("registro_notas.nota")
                    ->where('registro_notas.id_linea_actividad', $linea->id)
                    ->where('registro_notas.id_carga_academica', $cargaAcademica->id)
                    ->get();

                if (count($validarNota) <= 0) {
                    for ($j = 0; $j < count($meses); $j++) {
                        $nota = new RegistroNota;
                        $nota->nota = 0.0;
                        $nota->id_linea_actividad = $linea->id;
                        $nota->id_curso_nivel_mes = $meses[$j]->id;
                        $nota->id_carga_academica = $cargaAcademica->id;
                        try {
                            $nota->save();
                        } catch (Exception $ex) {
                            error_log($ex->getMessage());
                        }
                    }
                }

                $linea['registro_notas'] = DB::table('registro_notas')
                    ->select('registro_notas.id', 'registro_notas.nota', 'curso_nivel_mes.id_mes', 'mes.codigo_mes')
                    ->join('linea_actividads', 'registro_notas.id_linea_actividad', '=', 'linea_actividads.id')
                    ->join('curso_nivel_mes', 'registro_notas.id_curso_nivel_mes', '=', 'curso_nivel_mes.id')
                    ->join('mes', 'curso_nivel_mes.id_mes', '=', 'mes.id')
                    ->where('id_linea_actividad', $linea->id)
                    ->where('id_carga_academica', $cargaAcademica->id)
                    ->get();
            }

            /* $suma_actividad = DB::table('registro_notas')
            ->selectRaw(count(''))*/

            $actividad['lineaActividad'] = $lineas;
        }

        $pruebaUnion["actividades"] = $actividades;
        $pruebaUnion["meses"] = $meses;
        $pruebaUnion["infoGeneral"] = $infoGeneral;

        return $pruebaUnion;
    }


    public function getAllLineaActividadByCursoNivelMes($cargaAcademica, $mes)
    {
    }

    public function inscribirAlumno($data) {

        $responseValidate = ValidateJsonRequest::validateJsonRequestInscribirAlumnoCurso($data);
        if(count($responseValidate) > 0) {
            return $responseValidate;
        }

        $idPeriodo = $data['id_periodo'];
        //$rol = $data['rol'];
        $idAlumno = $data['id_alumno'];
        $idNivelCurso = $data['id_curso_nivel'];
        

        $responseValidateLogicRegister = $this->validateLogicRegisterAlumnoCurso($idPeriodo, $idNivelCurso,
            $idAlumno,1);

        if(count($responseValidateLogicRegister) > 0) {
            return $responseValidateLogicRegister;
        }

        $periodoActivoBool = Periodo::find($idPeriodo);
        if(!$periodoActivoBool->activo_periodo) {
            return MessageResponse::messageDescriptionError("Error", "Error el periodo no esta activo");

        }
        
        $registroAlumnoCurso = new CargaAcademica;
        $registroAlumnoCurso->id_alumno = $idAlumno;
        $registroAlumnoCurso->id_curso_nivel = $idNivelCurso;
        $registroAlumnoCurso->id_periodo = $idPeriodo;
        //$registroAlumnoCurso->rol = $rol;
        $registroAlumnoCurso->created_at = Carbon::now();
        $registroAlumnoCurso->fecha_inscripcion_carga = Carbon::now();
        $responseBolean = $registroAlumnoCurso->save();

        return MessageResponse::returnResponse($responseBolean);

    }

    private function validateLogicRegisterAlumnoCurso(
        $idPeriodo, 
        $idNivelCurso, 
        $idAlumno,  
        $countUpdateAlumno
    ) {
        
        $searchRegistroAlumnoCurso = CargaAcademica::where('id_curso_nivel', $idNivelCurso)
            ->where('id_periodo', $idPeriodo)->get();
        /* if(count($searchRegistroAlumnoCurso) > 3 ) {
            return MessageResponse::messageDescriptionError("Error", "No puede registrar mas de 3 docentes");
        } */

        /* if($rol == "mentor") {
            $searchRegistroDocenteCursoMentor = RegistroDocenteCurso::where('id_nivel_curso', $idNivelCurso)
                ->where('id_periodo', $idPeriodo)->where('rol', 'mentor')->get();

            if(count($searchRegistroDocenteCursoMentor) >= $countUpdateRol ) {
                return MessageResponse::messageDescriptionError("Error", "No puede registrar mas de 1 mentor");
            }
        } */

        $searchAlumno = CargaAcademica::where('id_alumno', $idAlumno)
            ->where('id_curso_nivel', $idNivelCurso)->where('id_periodo', $idPeriodo)->get();

        if(count($searchAlumno) >= $countUpdateAlumno) {
            return MessageResponse::messageDescriptionError("Error", "No se puede dos veces el mismo Alumno");
        }

        if(count($searchAlumno)>0){
            return MessageResponse::messageDescriptionError("Error", "No puede registrar el mismo alumno a un mismo curso");
        }
        return [];
        
    }
    //Función actualizar
    public function updateRegisterAlumnoCurso($jsonRequest, $registroAlumnoCurso) {
        $responseValidate = ValidateJsonRequest::validateJsonRequestInscribirAlumnoCurso($jsonRequest);
        if(count($responseValidate) > 0) {
            return $responseValidate;
        }

        $countUpdateAlumno = 1;
        $countUpdateRol = 1;
        if($registroAlumnoCurso->id_alumno == $jsonRequest['id_alumno']) {
            $countUpdateDocente = 2;
        }
        /* if($jsonRequest['rol'] == "mentor") {
            if($jsonRequest['rol'] == $registroDocenteCurso->rol) {
                $countUpdateRol = 2;Preguntar
            }
        } */

        $responseValidateLogic = $this->validateLogicRegisterAlumnoCurso(
            $jsonRequest['id_periodo'],
            $registroAlumnoCurso->id_nivel_curso,
            $jsonRequest['id_alumno'],
            //$jsonRequest['rol'],
            $countUpdateAlumno,
            $countUpdateRol
        );
        
        if(count($responseValidateLogic) > 0) {
            return $responseValidateLogic;
        }

        $registroAlumnoCurso->id_alumno = $jsonRequest['id_alumno'];
        $registroAlumnoCurso->id_curso_nivel = $jsonRequest['id_curso_nivel'];
        //$registroAlumnoCurso->rol = $jsonRequest['rol'];
        $registroAlumnoCurso->updated_at = Carbon::now();
        $responseBool = $registroAlumnoCurso->update();
        return MessageResponse::returnResponse($responseBool);
    }
    //Función obtener alumnos
    public function getAllCursoByAlumno($idCurso, $idPeriodo) {
        error_log($idCurso);
        error_log($idPeriodo);
        // $cursoAlumno = CargaAcademica::where('id_curso_nivel', '=', $idCurso)
        // ->where('id_periodo','=',$idPeriodo)
        // ->with('alumno','periodo','cursoNivel','curso')
        // ->get();
        // error_log(print_r($cursoAlumno,true));
        
        $cursoAlumno = DB::table('carga_academicas as ca')->select('ca.id','al.nombre_alumno','cu.nombre_curso')->join('curso_nivels as cn', 'cn.id', '=','ca.id_curso_nivel')
        ->join('cursos as cu','cu.id','=','cn.id_curso')->join('alumnos as al','al.id','=','ca.id_alumno')->where('ca.id_curso_nivel', '=', $idCurso)->where('ca.id_periodo','=',$idPeriodo)->get();
        return $cursoAlumno;
    }

}
