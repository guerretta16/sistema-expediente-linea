<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LineaActividad;
use App\Utils\MessageResponse;
use Carbon\Carbon;

class LineaActividadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return LineaActividad::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $linea_actividad = new LineaActividad;
        $linea_actividad->codigo_linea_actividad = $request->post("codigo_linea_actividad");
        $linea_actividad->nombre_linea_actividad = $request->post("nombre_linea_actividad");
        $linea_actividad->id_actividad = $request->post("id_actividad");

        $requestBoolean = $linea_actividad->save();
        return $this->returnResponse($requestBoolean);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return LineaActividad::find($id)->get();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param \App\Models\LineaActividad $linea_actividad
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, LineaActividad $linea_actividad)
    {
        $linea_actividad->nombre_linea_actividad = $request->post("codigo_linea_actividad");
        $linea_actividad->nombre_linea_actividad = $request->post("nombre_linea_actividad");
        $linea_actividad->id_actividad = $request->post("id_actividad");
        $linea_actividad->updated_at = Carbon::now();

        $requestBoolean = $linea_actividad->save();
        return $this->returnResponse($requestBoolean);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $linea_actividad = LineaActividad::find($id);
        $responseBool = $linea_actividad->delete();
        return $this->returnResponse($responseBool);
    }

    private function returnResponse($responseBool) {
        if($responseBool) {
            return MessageResponse::messageDescriptionError("Ok", "Save Success");
        } else {
            return MessageResponse::messageDescriptionError("Error", "Save failed");
        }

    }
}
