<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Alumno;
use App\Models\CargaAcademica;
use App\Models\CursoNivel;
use App\Models\Periodo;
use Illuminate\Support\Str;
use App\Models\RegistroNota;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class RecordNotasController extends Controller
{
    public function recordGlobal(Alumno $student)
    {
        $student_id = $student->id;

        /*$courses = CursoNivel::whereHas('cargaAcademica', function($load_query) use ($student_id) {
            $load_query->where('id_alumno', $student_id);
        })->get();*/

        $courses = Curso::whereHas('cursoNivel', function($nivel_builder) use ($student_id) {
            $nivel_builder->whereHas('cargaAcademica', function($load_query) use ($student_id) {
                $load_query->where('id_alumno', $student_id);
            });
        })->get();

        $res = $courses->reduce(function($a, Curso $c) use ($student_id) {
            $course_id = $c->id;

            $grades = RegistroNota::whereHas('cargaAcademica', function($load_query) use ($course_id, $student_id) {
                $load_query->whereHas('cursoNivel', function($course_query) use ($course_id) {
                    $course_query->where('id_curso', $course_id);
                })->where('id_alumno', $student_id);
            })->get();

            $activityRes = $grades->reduce(function($sum, RegistroNota $g) {
                $calc = $g->nota * $g->lineaActividad()->first()->actividad()->first()->porcentaje_actividad;
                return $sum + $calc;
            }, 0);

            return array_merge($a, [$c->nombre_curso => $activityRes]);
        }, []);

        return response()->json($res);
    }

    public function consultarRecordNotas (Periodo $periodo, User $usuario){
        $info = null;

        $alumno = DB::table('alumnos')
        ->select("alumnos.id", 'alumnos.nombre_alumno', 'alumnos.apellido_alumno', 'alumnos.codigo_alumno')
        ->where('alumnos.id_user', $usuario->id)
        ->first();

        $cargasAcademicas = CargaAcademica::select('id as id_carga_academica', 'id_curso_nivel')
        ->where('id_periodo', $periodo->id)
        ->where('id_alumno', $alumno->id)->get();

        //comenzar a agregar la infor de la materia
        foreach($cargasAcademicas as $carga){
            
            $curso_nivel = DB::table('curso_nivels')
            ->select('cursos.nombre_curso', 'nivels.codigo_nivel', 'cursos.codigo_curso')
            ->join('cursos', 'cursos.id', '=', 'curso_nivels.id_curso')
            ->join('nivels', 'nivels.id', '=', 'curso_nivels.id_nivel')
            ->where('curso_nivels.id', $carga->id_curso_nivel)
            ->first();

            $carga['nombre_curso'] = $curso_nivel->nombre_curso;
            $carga['codigo_curso'] = $curso_nivel->codigo_curso;
            $carga['nivel_curso'] = $curso_nivel->codigo_nivel;

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
            $notaFinal = 0;
            for($i=0; $i<count($promedioActual); $i++){
                $notaFinal = ($notaFinal + $promedioActual[$i]);
            }
            $carga['calificacion_final'] = number_format($notaFinal / count($promedioActual), 2);
        }

        $info['info_carga_academica'] = $cargasAcademicas;
        $info['info_alumno'] = $alumno;
        $info['info_periodo'] = $periodo;

        return $info;
    }

    public function consultarNotasActividades (Periodo $periodo, User $usuario){

        $alumno = DB::table('alumnos')
        ->select("alumnos.id", 'alumnos.nombre_alumno', 'alumnos.apellido_alumno', 'alumnos.codigo_alumno')
        ->where('alumnos.id_user', $usuario->id)
        ->first();

        $cargasAcademicas = CargaAcademica::select('id as id_carga_academica', 'id_curso_nivel')
        ->where('id_periodo', $periodo->id)
        ->where('id_alumno', $alumno->id)->get();    

        foreach($cargasAcademicas as $cargaActual){

            $curso_nivel = DB::table('curso_nivels')
            ->select('cursos.nombre_curso', 'nivels.codigo_nivel', 'cursos.codigo_curso')
            ->join('cursos', 'cursos.id', '=', 'curso_nivels.id_curso')
            ->join('nivels', 'nivels.id', '=', 'curso_nivels.id_nivel')
            ->where('curso_nivels.id', $cargaActual->id_curso_nivel)
            ->first();

            $cargaActual['nombre_curso'] = $curso_nivel->nombre_curso;
            $cargaActual['codigo_curso'] = $curso_nivel->codigo_curso;
            $cargaActual['nivel_curso'] = $curso_nivel->codigo_nivel;
            
            $actividades = CursoNivel::find($cargaActual->id_curso_nivel)
            ->actividades()
            ->where('id_periodo', $periodo->id)
            ->select('id', 'codigo_actividad', 'porcentaje_actividad')
            ->get();

            $meses = DB::table('curso_nivel_mes')
            ->select('curso_nivel_mes.id', 'mes.nombre_mes')
            ->join('curso_nivels', 'curso_nivels.id', '=', 'curso_nivel_mes.id_curso_nivel')
            ->join('mes', 'mes.id', '=', 'curso_nivel_mes.id_mes')
            ->where('curso_nivel_mes.id_curso_nivel', $cargaActual->id_curso_nivel)
            ->get();

            $cargaActual['meses'] = $meses;

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
                    ->where('registro_notas.id_carga_academica', $cargaActual->id_carga_academica)
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

            $cargaActual['promedio_mensual'] = $promedioMensualTotal;
            $cargaActual['promedio_actual'] = number_format($promedioActual / count($meses), 2);
        }

        $respuesta = null;
        $respuesta['cargas_academicas'] = $cargasAcademicas;
        $respuesta['info_periodo'] = $periodo;
        $respuesta['info_alumno'] = $alumno;

        return $respuesta;
    }
}
