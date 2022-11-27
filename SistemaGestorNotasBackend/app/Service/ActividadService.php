<?php

namespace App\Service; 

use App\Models\Actividad;
use App\Models\LineaActividad;
use App\Utils\ValidateJsonRequest;
use App\Utils\MessageResponse;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\DB;

class ActividadService {

    public function traerActividades ($id_periodo, $id_curso_nivel) {

        $cursoNivel = DB::table('curso_nivels')
            ->select('cursos.nombre_curso', 'nivels.nombre_nivel')
            ->join('cursos', 'curso_nivels.id_curso', '=', 'cursos.id')
            ->join('nivels', 'curso_nivels.id_nivel', '=', 'nivels.id')
            ->where('curso_nivels.id', $id_curso_nivel)
            ->first();

        $actividades = Actividad::where('id_periodo', $id_periodo)
            ->where('id_curso_nivel', $id_curso_nivel)->get();
        foreach($actividades as $actividad){
            $linea_actividad = $actividad->lineaActividad()->get()->count();
            $actividad['numero_actividades'] = $linea_actividad;
        }

        $allInfo = null;
        $allInfo['cursoInfo'] = $cursoNivel;
        $allInfo['actividades'] = $actividades;

        return $allInfo;
    }

    public function registrarActividad ($data){
        $responseValidate = ValidateJsonRequest::validateJasonRequestActividad($data);
        if(count($responseValidate) > 0){
            return $responseValidate;
        }

        $nombre_actividad = $data['nombre_actividad'];
        $codigo_actividad = $data['codigo_actividad'];
        $porcentaje_actividad = $data['porcentaje_actividad'];
        $id_curso_nivel = $data['id_curso_nivel'];
        $id_periodo = $data['id_periodo'];
        $numero_actividades = (int)$data['numero_actividades'];

        $responseValidateDuplicate = Actividad::where("codigo_actividad", $codigo_actividad)
            ->where("id_curso_nivel", $id_curso_nivel)
            ->where("id_periodo", $id_periodo)->get();
        if(count($responseValidateDuplicate) == 1){
            return MessageResponse::messageDescriptionError('Error', 'La actividad ya existe para la materia, nivel y periodo');
        }

        if($codigo_actividad === "CE"){
            if($numero_actividades > 1){
                return MessageResponse::messageDescriptionError('Error', 'No puede haber más de una actividad Examen');
            }
        }
        
        if($numero_actividades > 10){
            return MessageResponse::messageDescriptionError('Error', 'No puede ingresar más de 10 actividades');
        }

        $porcentajeList = Actividad::where('id_curso_nivel', $id_curso_nivel)
            ->where('id_periodo', $id_periodo)
            ->sum('porcentaje_actividad');
        $porcentaje_total = $porcentaje_actividad + $porcentajeList;
        if($porcentaje_total > 100){
            return MessageResponse::messageDescriptionError('Error', 'El porcentaje total no debe ser mayor a 100%');
        }

        $actividad = new Actividad;
        $actividad->nombre_actividad = $nombre_actividad;
        $actividad->codigo_actividad = $codigo_actividad;
        $actividad->porcentaje_actividad = $porcentaje_actividad;
        $actividad->id_curso_nivel = $id_curso_nivel;
        $actividad->id_periodo = $id_periodo;
        $actividad->created_at = Carbon::now();
        $responseBool = $actividad->save();
        $responseBoolCount = 0;
        for($i=1; $i<=$numero_actividades; $i++){
            $linea_actividad = new LineaActividad;
            $linea_actividad->codigo_linea_actividad = $codigo_actividad.(string)$i;
            $linea_actividad->nombre_linea_actividad = $nombre_actividad.(string)$i;
            $linea_actividad->id_actividad = $actividad->id;
            $responseBoolChild = $actividad->lineaActividad()->save($linea_actividad);
            if(!$responseBoolChild){
                $responseBoolCount++;
            }
        }

        if($responseBoolCount > 0){
            return MessageResponse::messageDescriptionError('Error', "Elimine la actividad ya que $responseBoolCount de $numero_actividades actividades se guardaron únicamente!");
        }

        return MessageResponse::returnResponse($responseBool);
    }

    public function actualizarActividad ($data, Actividad $actividad) {
        $responseValidate = ValidateJsonRequest::validateJasonRequestActividadUpdate($data);
        if(count($responseValidate) > 0){
            return $responseValidate;
        }

        $nombre_actividad = $data['nombre_actividad'];
        $codigo_actividad = $data['codigo_actividad'];
        $porcentaje_actividad = $data['porcentaje_actividad'];

        $responseBoolean = 0;
        $responseCodigo = Actividad::where("codigo_actividad", "!=", $actividad->codigo_actividad)
            ->where('id_curso_nivel', $actividad->id_curso_nivel)
            ->where('id_periodo', $actividad->id_periodo)->get();
        for($i=0; $i<count($responseCodigo); $i++){
            if($responseCodigo[$i]->codigo_actividad === $codigo_actividad){
                $responseBoolean++;
            }
        }
        
        if($responseBoolean > 0){
            return MessageResponse::messageDescriptionError('Error', 'La actividad ya existe, seleccione otra');
        }

        $porcentajeList = Actividad::where('id_curso_nivel', $actividad->id_curso_nivel)
            ->where('id_periodo', $actividad->id_periodo)
            ->where('codigo_actividad', '!=', $actividad->codigo_actividad)
            ->sum('porcentaje_actividad');
        $porcentaje_total = $porcentaje_actividad + $porcentajeList;
        if($porcentaje_total > 100){
            return MessageResponse::messageDescriptionError('Error', 'El porcentaje total no debe ser mayor a 100%');
        }

        $actividad->nombre_actividad = $nombre_actividad;
        $actividad->codigo_actividad = $codigo_actividad;
        $actividad->porcentaje_actividad = $porcentaje_actividad;
        $actividad->updated_at = Carbon::now();
        $responseBool = $actividad->update();

        return MessageResponse::returnResponse($responseBool);
    }

    public function borrarActividad (Actividad $actividad){
        $lineasActividad = $actividad->lineaActividad()->where('id_actividad', $actividad->id)->get();
        //hay que eliminar las notas
        foreach($lineasActividad as $linea){
            $linea->registroNota()->where('id_linea_actividad', $linea->id)->delete();
        }
        //eliminar hijos primero
        $actividad->lineaActividad()->where('id_actividad', $actividad->id)->delete();
        //ahora eliminar la actividad
        $responseBool = $actividad->where('id', $actividad->id)->delete();
        return MessageResponse::returnResponse($responseBool);
        return $lineasActividad;
    }

}