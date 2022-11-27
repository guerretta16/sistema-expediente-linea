<?php

namespace App\Service;

use App\Models\Asistencia;
use App\Models\CargaAcademica;
use App\Models\Curso;
use App\Models\Nivel;
use App\Models\Periodo;
use App\Models\Profesor;
use App\Utils\ValidateJsonRequest;
use App\Utils\MessageResponse;
use Carbon\Carbon;
use DateTime;
use Exception;
use Illuminate\Support\Facades\DB;

class AsistenciaAlumnoService
{

    public function storeAsistencias($request)
    {
        $periodo = $request['id_periodo'];
        $curso_nivel = $request['id_curso_nivel'];

        $cargasAcademicas = CargaAcademica::select('id as id_carga')
            ->where('id_periodo', $periodo)
            ->where('id_curso_nivel', $curso_nivel)
            ->get();

        $periodoActual = Periodo::select('fecha_inicio_periodo', 'fecha_fin_periodo')
            ->where('id', $periodo)
            ->first();

        $fechas = [];
        $fecha1 = strtotime($periodoActual->fecha_inicio_periodo);
        $fecha2 = strtotime($periodoActual->fecha_fin_periodo);
        if ($fecha1 <= $fecha2) {
            $count = 0;
            for ($fecha1; $fecha1 <= $fecha2; $fecha1 = strtotime('+1 day ' . date('Y-m-d', $fecha1))) {
                if (strcmp(date('D', $fecha1), 'Sat') == 0) {
                    $fechas[$count] = date('Y-m-d', $fecha1);
                    $count++;
                }
            }

            $countBool = 0;

            try {
                for ($i = 0; $i < count($cargasAcademicas); $i++) {

                    $asitenciasExistentes = Asistencia::select('id')
                        ->where('id_carga_academica', $cargasAcademicas[$i]->id_carga)
                        ->get();

                    if (count($asitenciasExistentes) == 0) {
                        for ($j = 0; $j < count($fechas); $j++) {
                            $asistencias = new Asistencia();
                            $asistencias->asistencia = 0;
                            $asistencias->fechaAsistencias = $fechas[$j];
                            $asistencias->id_carga_academica = $cargasAcademicas[$i]->id_carga;
                            $asistencias->created_at = Carbon::now();

                            $responseBool = $asistencias->save();
                            if ($responseBool) {
                                $countBool++;
                            }
                        }
                    }
                }
                if ($countBool > 0) {
                    return MessageResponse::returnResponse(true);
                } else {
                    return ["Message" => "Asistencias existentes"];
                }
            } catch (Exception $ex) {
                error_log($ex->getMessage());
            }
        }
    }

    public function updateAsistencias($asistencia){
        try{
            if($asistencia->asistencia == 0){
                $asistencia->asistencia = 1;
            }
            else{
                $asistencia->asistencia = 0;
            }
            $responseBool = $asistencia->save();

            return MessageResponse::returnResponse($responseBool);
        }
        catch(Exception $ex){
            error_log($ex->getMessage());
        }
    }

    public function asistenciaAlumnoService($periodo, $curso_nivel)
    {
        $info = null;
        $cargasAcademicas = CargaAcademica::select('id as id_carga_academica')
        ->where('id_periodo', $periodo->id)
        ->where('id_curso_nivel', $curso_nivel->id)
        ->get();

        $curso = Curso::select('nombre_curso')
        ->where('id', $curso_nivel->id_curso)
        ->first()->nombre_curso;

        $nivel = Nivel::select('codigo_nivel')
        ->where('id', $curso_nivel->id_nivel)
        ->first()->codigo_nivel;

        foreach($cargasAcademicas as $carga){

            $alumno = DB::table('carga_academicas')
            ->select('alumnos.codigo_alumno', 'alumnos.nombre_alumno', 'alumnos.apellido_alumno')
            ->join('alumnos', 'alumnos.id', '=', 'carga_academicas.id_alumno')
            ->where('carga_academicas.id', $carga->id_carga_academica)
            ->first();

            $asistencias = Asistencia::select('id as id_asistencia', 'fechaAsistencias as fecha_asistencia', 'asistencia')
            ->where('id_carga_academica', $carga->id_carga_academica)
            ->get();

            $count = 0;
            for($i=0; $i<count($asistencias); $i++){
                if($asistencias[$i]->asistencia == 1){
                    $count++;
                }
            }

            $carga['alumno'] = $alumno;
            $carga['asistencias'] = $asistencias;
            $carga['total'] = $count;
        }

        $info['info_periodo'] = $periodo;
        $info['info_curso_nivel'] = $curso." ".$nivel;
        $info['info_asistencia'] = $cargasAcademicas;
   
        return $info; 
    }
}
