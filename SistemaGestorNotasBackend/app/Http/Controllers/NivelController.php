<?php

namespace App\Http\Controllers;

use App\Models\Nivel;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Utils\MessageResponse;


class NivelController extends Controller
{
    //Mostrar Niveles.
    public function index() {
        return Nivel::all();
    }

    public function store(Request $request)
    {
        $json = $request->json()->all();
        //Guardar Niveles.
        $codigoNivel = $json['codigo_nivel'];
        $nombreNivel = $json['nombre_nivel'];
        

        $nivel = new Nivel();
        $nivel->codigo_nivel = $codigoNivel;
        $nivel->nombre_nivel = $nombreNivel;

        $responseBool = $nivel->save();
        return MessageResponse::returnResponse($responseBool);
    }

    //Mostrar un nivel especifico.
    public function show($codigoNivel) {
        $nivel = Nivel::where('codigo_nivel', '=', $codigoNivel)->get();
        return $nivel;
    }

    public function update(Request $request, Nivel $nivel)
    {
        //Actualizar Nivel.
        $json = $request->json()->all();
        $nivel->codigo_nivel = $json['codigo_nivel'];
        $nivel->nombre_nivel = $json['nombre_nivel'];
        $responseBool = $nivel->update();
        return MessageResponse::returnResponse($responseBool);
    }

    public function destroy($id)
    {
        //Eliminar Nivel.
        $nivel = Nivel::destroy($id);
        if($nivel == 1)
        {
            return $this->returnResponse(true);
        }else{
            return MessageResponse::returnResponse(false);
        }
        
    }

}
