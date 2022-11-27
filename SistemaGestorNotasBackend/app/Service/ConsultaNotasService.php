<?php

namespace App\Service;

use App\Models\CargaAcademica;
use App\Models\Curso;
use App\Models\CursoNivel;
use App\Models\CursoNivelMes;
use App\Models\Nivel;
use Exception;
use Illuminate\Support\Facades\DB;

class ConsultaNotasService {

    public function consultaRendimientoAcademicoService($periodo, $curso_nivel, $mes){
        
        $cursoInfo = Curso::where('id', $curso_nivel->id_curso)->select('nombre_curso')->first();
        $nivelInfo = Nivel::where('id', $curso_nivel->id_nivel)->select('codigo_nivel')->first();
        $InfoGeneral = ['Curso' => $cursoInfo, 'Nivel' => $nivelInfo, 'Periodo' => $periodo->codigo_periodo, "Mes" => $mes->nombre_mes];

        $promedioTotal = [];

        $cargasAcademicas = DB::table("carga_academicas")
        ->select("carga_academicas.id", "alumnos.codigo_alumno", "alumnos.nombre_alumno", "alumnos.apellido_alumno")
        ->join('alumnos', 'carga_academicas.id_alumno', '=', 'alumnos.id')
        ->where('id_periodo', $periodo->id)
        ->where('id_curso_nivel', $curso_nivel->id)
        ->get();

        foreach($cargasAcademicas as $cargaActual){
            
            $actividades = CursoNivel::find($curso_nivel->id)
            ->actividades()
            ->where('id_periodo', $periodo->id)
            ->select('id', 'codigo_actividad', 'porcentaje_actividad')
            ->get();

            $promedioActual = 0;

            foreach($actividades as $actividad){
                $lineasActividad = $actividad->lineaActividad()->select('id', 'nombre_linea_actividad')->get();
                $notaAcumulada = 0.00;
                foreach($lineasActividad as $linea){
                    $notaLinea = DB::table('registro_notas')
                    ->select('registro_notas.nota')
                    ->join('curso_nivel_mes', 'curso_nivel_mes.id', '=', 'registro_notas.id_curso_nivel_mes')
                    ->join('mes', 'mes.id', '=', 'curso_nivel_mes.id_mes')
                    ->where('registro_notas.id_linea_actividad', $linea->id)
                    ->where('registro_notas.id_carga_academica', $cargaActual->id)
                    ->where('mes.id', $mes->id)
                    ->first()->nota;
                    
                    $notaAcumulada += floatval($notaLinea);
                }
                $actividad->notaTotal = round(($notaAcumulada / count($lineasActividad)), 2);
                $promedioActual = $promedioActual + ($actividad->notaTotal * (floatval($actividad->porcentaje_actividad / 100)));

            }

            $cargaActual->actividades = $actividades;
            $cargaActual->promedioActual = round($promedioActual, 2);
        }

        $respuesta = null;
        $respuesta['cargasAcademicas'] = $cargasAcademicas;
        $respuesta['infoGeneral'] = $InfoGeneral;

        return $respuesta;
    }

    public function consultaNominaNotasService($periodo, $curso_nivel, $mes){
        
        $cursoInfo = Curso::where('id', $curso_nivel->id_curso)->select('nombre_curso')->first();
        $nivelInfo = Nivel::where('id', $curso_nivel->id_nivel)->select('codigo_nivel')->first();
        $InfoGeneral = ['Curso' => $cursoInfo, 'Nivel' => $nivelInfo, 'Periodo' => $periodo->codigo_periodo, "Mes" => $mes->nombre_mes];

        $promedioTotal = [];

        $cargasAcademicas = DB::table("carga_academicas")
        ->select("carga_academicas.id", "alumnos.codigo_alumno", "alumnos.nombre_alumno", "alumnos.apellido_alumno")
        ->join('alumnos', 'carga_academicas.id_alumno', '=', 'alumnos.id')
        ->where('id_periodo', $periodo->id)
        ->where('id_curso_nivel', $curso_nivel->id)
        ->get();

        foreach($cargasAcademicas as $cargaActual){
            
            $actividades = CursoNivel::find($curso_nivel->id)
            ->actividades()
            ->where('id_periodo', $periodo->id)
            ->select('id', 'codigo_actividad', 'porcentaje_actividad')
            ->get();

            $promedioActual = 0;

            foreach($actividades as $actividad){
                $lineasActividad = $actividad->lineaActividad()->select('id', 'codigo_linea_actividad')->get();
                $actividad['linea_actividad'] = $lineasActividad;
                $notaAcumulada = 0.00;
                foreach($lineasActividad as $linea){
                    $notaLinea = DB::table('registro_notas')
                    ->select('registro_notas.nota')
                    ->join('curso_nivel_mes', 'curso_nivel_mes.id', '=', 'registro_notas.id_curso_nivel_mes')
                    ->join('mes', 'mes.id', '=', 'curso_nivel_mes.id_mes')
                    ->where('registro_notas.id_linea_actividad', $linea->id)
                    ->where('registro_notas.id_carga_academica', $cargaActual->id)
                    ->where('mes.id', $mes->id)
                    ->first()->nota;
                    
                    $linea['nota'] = $notaLinea;

                    $notaAcumulada += floatval($notaLinea);
                }
                $actividad->notaTotal = round(($notaAcumulada / count($lineasActividad)), 2);
                $promedioActual = $promedioActual + ($actividad->notaTotal * (floatval($actividad->porcentaje_actividad / 100)));
            }

            $cargaActual->actividades = $actividades;
            $cargaActual->promedioActual = round($promedioActual, 2);
        }

        $respuesta = null;
        $respuesta['cargasAcademicas'] = $cargasAcademicas;
        $respuesta['infoGeneral'] = $InfoGeneral;

        return $respuesta;
    }

    public function consultaNotasAcumuladasService($periodo, $curso_nivel){
        
        $cursoInfo = Curso::where('id', $curso_nivel->id_curso)->select('nombre_curso')->first();
        $nivelInfo = Nivel::where('id', $curso_nivel->id_nivel)->select('codigo_nivel')->first();
        $InfoGeneral = ['Curso' => $cursoInfo, 'Nivel' => $nivelInfo, 'Periodo' => $periodo->codigo_periodo];

        $cargasAcademicas = DB::table("carga_academicas")
        ->select("carga_academicas.id", "alumnos.codigo_alumno", "alumnos.nombre_alumno", "alumnos.apellido_alumno")
        ->join('alumnos', 'carga_academicas.id_alumno', '=', 'alumnos.id')
        ->where('id_periodo', $periodo->id)
        ->where('id_curso_nivel', $curso_nivel->id)
        ->get();

        $meses = DB::table("curso_nivel_mes")
            ->select("mes.nombre_mes")
            ->join("mes", "mes.id", "=", "curso_nivel_mes.id_mes")
            ->where("curso_nivel_mes.id_curso_nivel", $curso_nivel->id)
            ->get();     

        foreach($cargasAcademicas as $cargaActual){
            
            $actividades = CursoNivel::find($curso_nivel->id)
            ->actividades()
            ->where('id_periodo', $periodo->id)
            ->select('id', 'codigo_actividad', 'porcentaje_actividad')
            ->get();

            $promedioMensualTotal = [];
            for($i=0; $i<count($meses); $i++){
                $promedioMensualTotal[$i] = 0;
            }   

            $promedioActual = 0.0;

            foreach($actividades as $actividad){

                $promedioMensualActividad = [];
                for($i=0; $i<count($meses); $i++){
                    $promedioMensualActividad[$i] = 0;
                }

                $lineasActividad = $actividad->lineaActividad()->select('id', 'codigo_linea_actividad')->get();

                foreach($lineasActividad as $linea){
                    $notaLinea = DB::table('registro_notas')
                    ->select('registro_notas.nota', 'mes.nombre_mes')
                    ->join('curso_nivel_mes', 'curso_nivel_mes.id', '=', 'registro_notas.id_curso_nivel_mes')
                    ->join('mes', 'mes.id', '=', 'curso_nivel_mes.id_mes')
                    ->where('registro_notas.id_linea_actividad', $linea->id)
                    ->where('registro_notas.id_carga_academica', $cargaActual->id)
                    ->get();

                    for($j=0; $j<count($meses); $j++){
                        $promedioMensualActividad[$j] += ($notaLinea[$j]->nota / count($lineasActividad));
                    }
                }

                for($j=0; $j<count($meses); $j++){
                    $promedioMensualActividad[$j] = number_format($promedioMensualActividad[$j], 2);
                    $promedioMensualTotal[$j] = number_format($promedioMensualTotal[$j] + ($promedioMensualActividad[$j] * ($actividad->porcentaje_actividad / 100)), 2); 
                }
            }

            for($j=0; $j<count($meses); $j++){
                $promedioActual += number_format($promedioMensualTotal[$j], 2);
            }

            $cargaActual->promedioMensual = $promedioMensualTotal;
            $cargaActual->promedioActual = number_format($promedioActual / count($meses), 2);
        }

        $respuesta = null;
        $respuesta['cargasAcademicas'] = $cargasAcademicas;
        $respuesta['infoGeneral'] = $InfoGeneral;
        $respuesta['meses'] = $meses;

        return $respuesta;
    }

    public function consultaBoletaSabatinaService($periodo, $alumno){
        
        $info = null;

        $cargasAcademicas = CargaAcademica::select('id as id_carga_academica', 'id_curso_nivel')
        ->where('id_periodo', $periodo->id)
        ->where('id_alumno', $alumno->id)->get();

        //comenzar a agregar la infor de la materia
        foreach($cargasAcademicas as $carga){
            
            $curso_nivel = DB::table('curso_nivels')
            ->select('cursos.nombre_curso', 'nivels.codigo_nivel')
            ->join('cursos', 'cursos.id', '=', 'curso_nivels.id_curso')
            ->join('nivels', 'nivels.id', '=', 'curso_nivels.id_nivel')
            ->where('curso_nivels.id', $carga->id_curso_nivel)
            ->first();

            $carga['curso_nivel'] = $curso_nivel->nombre_curso . " " . $curso_nivel->codigo_nivel;

            $actividades = CursoNivel::find($carga->id_curso_nivel)
            ->actividades()
            ->where('id_periodo', $periodo->id)
            ->select('id', 'nombre_actividad', 'porcentaje_actividad')
            ->get();

            $meses_actividades = DB::table('curso_nivel_mes')
            ->select('curso_nivel_mes.id', 'mes.nombre_mes')
            ->join('curso_nivels', 'curso_nivels.id', '=', 'curso_nivel_mes.id_curso_nivel')
            ->join('mes', 'mes.id', '=', 'curso_nivel_mes.id_mes')
            ->where('curso_nivel_mes.id_curso_nivel', $carga->id_curso_nivel)
            ->get();
            
            $promedioActual = [];
            for($i=0; $i<count($meses_actividades); $i++){
                $promedioActual[$i] = 0;
            }

            foreach($actividades as $actividad){
                $lineasActividad = $actividad->lineaActividad()->select('id', 'nombre_linea_actividad')->get();
                $notaAcumulada = [];

                for($i=0; $i<count($meses_actividades); $i++){
                    $notaAcumulada[$i] = 0;
                }

                foreach($lineasActividad as $linea){
                    $notaLinea = DB::table('registro_notas')
                    ->select('registro_notas.nota', 'mes.codigo_mes')
                    ->join('curso_nivel_mes', 'curso_nivel_mes.id', '=', 'registro_notas.id_curso_nivel_mes')
                    ->join('mes', 'mes.id', '=', 'curso_nivel_mes.id_mes')
                    ->where('registro_notas.id_linea_actividad', $linea->id)
                    ->where('registro_notas.id_carga_academica', $carga->id_carga_academica)
                    ->get();
                    
                    for($i = 0; $i<count($notaLinea); $i++){
                        $notaAcumulada[$i] += $notaLinea[$i]->nota;
                    }
                    
                }
                
                for($i = 0; $i<count($notaAcumulada); $i++){
                    $notaAcumulada[$i] = floatval(number_format($notaAcumulada[$i]/count($lineasActividad), 2));
                }

                for($i=0; $i<count($promedioActual); $i++){
                    $promedioActual[$i] = $promedioActual[$i] + ($notaAcumulada[$i] * (floatval($actividad->porcentaje_actividad) / 100));

                    $promedioActual[$i] = floatval(number_format($promedioActual[$i], 2));
                }

                $actividad['nota_acumulada'] = $notaAcumulada;
            }
            
            $carga['actividades'] = $actividades;
            $carga['calificacion_final'] = $promedioActual;
            $carga['meses'] = $meses_actividades;
        }

        $info['info_carga_academica'] = $cargasAcademicas;
        $info['info_alumno'] = $alumno;
        $info['info_periodo'] = $periodo;

        return $info;
    }

}