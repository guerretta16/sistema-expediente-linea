<?php

namespace App\Http\Controllers;
use App\Models\Periodo;
use App\Models\CargaAcademica;
use App\Models\Alumno;
use App\Service\CargaAcademicaService;
use Illuminate\Http\Request;
use App\Utils\MessageResponse;
use App\Utils\AuthJwtUtils;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Carbon\Carbon;

class IncribirAlumnoCursoController extends Controller
{
    protected $registroCargaAcademicaService;

    public function __construct(CargaAcademicaService $registroCargaAcademicaService) {
        $this->registroCargaAcademicaService = $registroCargaAcademicaService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeInscribirAlumno(Request $request)
    {
        //Código Anterior.
        // $responseJson = $this->registroCargaAcademicaService->inscribirAlumno($request->json()->all());
        // return $responseJson;

        //Código Excel.
        $fileExcel = $request->file('prueba');
        $reader = IOFactory::createReader('Xlsx');
        $file = $reader->load($fileExcel->getPathname());
        $arrayFile = $file->getActiveSheet()->toArray();
        $arrayTemp = array();
        $arrayEnd = array();
        if(sizeof($arrayFile) > 0) {
            $nameColumns = $arrayFile[0];
            for($contador = 1; $contador <= sizeof($arrayFile) - 1; $contador++) {
                //for($contadorName = 0; $contadorName < sizeof($nameColumns); $contadorName++) {
                    $alumnoTemp = Alumno::where('nie_alumno','=', $arrayFile[$contador][0])->first();
                    if($alumnoTemp){
                        $arrayTemp['id_alumno'] = $alumnoTemp->id;
                        $arrayTemp['id_periodo'] = $request->id_periodo;
                        $arrayTemp['id_curso_nivel'] = $request->id_curso_nivel;
                        $arrayTemp['fecha_inscripcion_carga'] = Carbon::now();                    }
                    //$arrayTemp[$nameColumns[$contadorName]] = $arrayFile[$contador][0];
                    
                //}
            array_push($arrayEnd, $arrayTemp);
            }
            CargaAcademica::upsert($arrayEnd, [], ['id_alumno']);
            return MessageResponse::messageDescriptionError("Ok", "Success");

        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function getRegisterByIdPeriodAndByIdNivelCurso(Request $request) {
        $idNivelCurso = $request->get('id_curso_nivel');
        $idPeriodo = $request->get('id_periodo');

        $periodo = Periodo::find($idPeriodo);
        $periodoActivo = $periodo->activo_periodo;

        $registers = CargaAcademica::where('id_curso_nivel', $idNivelCurso)
            ->where('id_periodo', $idPeriodo)->with('alumno')->get();

        foreach($registers as $register) {
            $register['activo'] = $periodoActivo;
        }
        return $registers;
    }


    public function deleteRegisterAlumnoCurso(CargaAcademica $registroAlumnoCurso) {
        $boolResponse = $registroAlumnoCurso->delete();

        return MessageResponse::returnResponse($boolResponse);

    }

    public function updateRegisterDocenteCurso(
        CargaAcademica $registroAlumnoCurso,
        Request $request
    ) {
        
        $jsonRequest = $request->json()->all();
        return $this->registroCargaAcademicaService
                             ->updateRegisterAlumnoCurso($jsonRequest, $registroAlumnoCurso);
    }

    public function getAllRegisterByAlumnoPeriodoCursoNivel(Request $request, $idPeriodo,$idCurso) {
        error_log($idPeriodo."Controlador");
        error_log($idCurso."Controlador");
        $jwt = AuthJwtUtils::getSubStringHeaderAuthorization($request->header('Authorization'));
        $user = AuthJwtUtils::getUserForJWT($jwt);
        $alumno = $user->alumno;
        //$idPeriodo = $request->get('id_periodo');

        $responseNivels = $this->registroCargaAcademicaService
            ->getAllCursoByAlumno($idCurso,$idPeriodo);

        return $responseNivels;
    }

    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
