<?php

namespace App\Http\Controllers;
/**
 * @author JS Martinez
 */

use App\Models\Periodo;
use App\Utils\MessageResponse;
use App\Service\PeriodoService; 
use Carbon\Carbon;
use Illuminate\Http\Request;

class PeriodoController extends Controller
{
    protected $periodoService;

    public function __construct(PeriodoService $periodoService) 
    {
        $this->periodoService = $periodoService;
    }

    public function indexPeriod() {
        return Periodo::all();
    }

    public function show() {

    }

    /**
     * Permite guardado de un periodo
     * @param \Illuminate\Http\Request $request
     * 
     * @return Array responseMessage;
     */
    public function storePeriod(Request $request) {
        $fechaInicio = $request->post('fechaInicio');
        $fechaFin = $request->post('fechaFin');
        $codigoPeriodo = "P" . "-" . Carbon::now()->format('Y');

        $periodo = new Periodo();
        $periodo->codigo_periodo = $codigoPeriodo;
        $periodo->fecha_inicio_periodo = $fechaInicio;
        $periodo->fecha_fin_periodo = $fechaFin;
        $periodo->activo_periodo = true;
        $responseBool = $periodo->save();
        return MessageResponse::returnResponse($responseBool);
    }


    /**
     * Permite actualizar la fecha de inicio y de fin del periodo
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Periodo $periodo
     * @return Array responseMessage;
     */
    public function updatePeriod(Request $request, Periodo $periodo) {
        $periodo->fecha_inicio_periodo = $request->post('fechaInicio');
        $periodo->fecha_fin_periodo = $request->post('fechaFin');
        $periodo->updated_at = Carbon::now();
        $responseBool = $periodo->update();
        return MessageResponse::returnResponse($responseBool);
    }

    /**
     * Permite actualizar cambiar el estado del periodo 
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Periodo $periodo
     * @return Array responseMessage;
     */
    public function changeStatePeriod(Request $request, Periodo $periodo) {
        $periodo->activo_periodo = $request->post('periodActive');

        $responseBool = $periodo->update();
        return MessageResponse::returnResponse($responseBool);
    }


    public function searchPeriodoActivo() {
        $periodo = Periodo::where('activo_periodo', '=', true)->first();
        if($periodo) {
            return $periodo;
        } else {
            return [
                "message" => "no"
            ];
        }
    }

    /**
     * @param \Illuminate\Http\Request
     * @return Array $registros
     */

    public function getAllPeriodosByUser(Request $request) {
        $registros = $this->periodoService->getPeriodosByUsers($request);
        return $registros;
    }



}

