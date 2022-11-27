<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Curso;
use App\Utils\MessageResponse;

class CursoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        return Curso::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $json = $request->json()->all();
        //Guardar cursos.
        $codigoCurso = $json['codigo_curso'];
        $nombreCurso = $json['nombre_curso'];
        

        $curso = new Curso();
        $curso->codigo_curso = $codigoCurso;
        $curso->nombre_curso = $nombreCurso;

        $responseBool = $curso->save();
        return $this->returnResponse($responseBool);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param \App\Model\Curso  $curso
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Curso $curso)
    {
        //Actualizar.
        $json = $request->json()->all();
        $curso->codigo_curso = $json['codigo_curso'];
        $curso->nombre_curso = $json['nombre_curso'];
        $responseBool = $curso->update();
        return $this->returnResponse($responseBool);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //Eliminar.
        $curso = Curso::destroy($id);
        return $curso;
    }

    private function returnResponse($responseBool) {
        if($responseBool) {
            return MessageResponse::messageDescriptionError("Ok", "Save Success");
        } else {
            return MessageResponse::messageDescriptionError("Error", "Save failed");
        }

    }
}
