<?php

namespace App\Http\Controllers;

use App\Models\Alumno;
use App\Service\AlumnoService;
use App\Utils\MessageResponse;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\IOFactory;

class AlumnoController extends Controller
{

    protected $alumnoService;

    public function __construct(AlumnoService $alumnoService)
    {
        $this->alumnoService = $alumnoService;
    }

    public function index()
    {
        return $this->alumnoService->traerAlumnos();
    }

    public function store(Request $request)
    {
        $fileExcel = $request->file('prueba');
        $reader = IOFactory::createReader('Xlsx');
        $file = $reader->load($fileExcel->getPathname());
        $arrayFile = $file->getActiveSheet()->toArray();
        $arrayTemp = array();
        $arrayEnd = array();
        if(sizeof($arrayFile) > 0) {
            $nameColumns = $arrayFile[0];

            for($contador = 1; $contador <= sizeof($arrayFile) - 1; $contador++) {
                for($contadorName = 0; $contadorName < sizeof($nameColumns); $contadorName++) {
                    if($nameColumns[$contadorName] == "fecha_nacimiento_alumno") {

                        if(str_contains($arrayFile[$contador][$contadorName],"/")) {
                            $arrayDate = explode("/", $arrayFile[$contador][$contadorName]);
                            $date = Carbon::createFromDate(
                                $arrayDate[2], 
                                $arrayDate[1], 
                                $arrayDate[0],
                                'America/El_Salvador'
                            );
                        }
                        error_log($arrayFile[$contador][$contadorName]);
                        error_log(str_contains("-", $arrayFile[$contador][$contadorName]));
                        if(str_contains($arrayFile[$contador][$contadorName],"-")) {
                            error_log("Entra aqui");
                            $arrayDate = explode("-", $arrayFile[$contador][$contadorName]);
                            $date = Carbon::createFromDate(
                                $arrayDate[2],
                                $arrayDate[1],
                                $arrayDate[0],
                            'America/El_Salvador');
                        }
                    $arrayTemp[$nameColumns[$contadorName]] = $date;
                    } else {
                        $arrayTemp[$nameColumns[$contadorName]] = $arrayFile[$contador][$contadorName];
                    }
                }
            array_push($arrayEnd, $arrayTemp);
            }
            Alumno::upsert($arrayEnd, [], ['nie_alumno']);
            return MessageResponse::messageDescriptionError("Ok", "Success");

        }
    }

    
    public function show(Alumno $alumno)
    {
        return $alumno;
    }

    
    public function update(Request $request, Alumno $alumno)
    {
        error_log($alumno);
        error_log($request['nombre_alumno']);
        return $this->alumnoService->modificarAlumno($request, $alumno);
    }

    
    public function destroy(Alumno $alumno)
    {
        return $this->alumnoService->eliminarAlumno($alumno);
    }

    //public function boletaNotas(Periodo $periodo, CursoNivel $cursoNivel)

    //Función Get Alumno.
    public function getAlumnosCategoria(){
        $alumnoCategoria = DB::table('alumnos as al')
        ->select('al.id','al.nombre_alumno','al.apellido_alumno','ca.nombre_categoria_alumno')
        ->join('categoria_alumnos as ca','ca.id','=','al.id_categoria_alumno')->get();

        return $alumnoCategoria;
    }
}
