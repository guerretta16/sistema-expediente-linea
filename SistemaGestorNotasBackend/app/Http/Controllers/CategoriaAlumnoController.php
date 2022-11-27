<?php
/**
 * @author JS Martinez
 */

namespace App\Http\Controllers;

use App\Models\CategoriaAlumno;
use App\Utils\MessageResponse;
use Illuminate\Http\Request;

class CategoriaAlumnoController extends Controller
{

    public function getAllCategoriasAlumnos() {
        return CategoriaAlumno::all();
    }

    public function storeCategoriaAlumno(Request $request) {
        $dataJson = $request->json()->all();

        $categoria = CategoriaAlumno::where('codigo_categoria_alumno', $dataJson['codigo_categoria_alumno'])->first();
        if($categoria) {
            return response(
                MessageResponse::messageDescriptionError("Error","La categoria del alumno ya existe")
                ,200
            );
        }

        $categoriaAlumno = new CategoriaAlumno();
        $categoriaAlumno->codigo_categoria_alumno = $dataJson['codigo_categoria_alumno'];
        $categoriaAlumno->nombre_categoria_alumno = $dataJson['nombre_categoria_alumno'];
        $responseSaved = $categoriaAlumno->save();
        if($responseSaved == false) {
            return response(
                MessageResponse::messageDescriptionError("Error","Error al guardar la categoria del alumno")
                ,200
            );
        }

        return MessageResponse::messageDescriptionError("Ok", "Categoria del alumno guardada correctamente");

    }

    public function updateCategoriaAlumno(Request $request) {
        
        $dataJson = $request->json()->all();
        $codigoUpdate = $dataJson['codigo_categoria_alumno'];
        $responseCountUpdate = 0;
        $categoria = CategoriaAlumno::find($dataJson['id']);

        if(!$categoria) {
            return response(
                MessageResponse::messageDescriptionError("Error","La categoria del alumno no existe")
                ,200
            );
        }
        error_log($codigoUpdate);
        error_log($categoria->codigo_categoria_alumno);

        if($categoria->codigo_categoria_alumno != $codigoUpdate) {
            $responseCountUpdate = CategoriaAlumno::where('codigo_categoria_alumno', $codigoUpdate)->count();
            if($responseCountUpdate > 0) {
                return response(
                    MessageResponse::messageDescriptionError("Error","El codigo no se puede repetir")
                    ,200
                );
            } else {
                $categoria->codigo_categoria_alumno = $codigoUpdate;
                $categoria->nombre_categoria_alumno = $dataJson['nombre_categoria_alumno'];
                $categoria->save();
            }
        }
        $categoria->nombre_categoria_alumno = $dataJson['nombre_categoria_alumno'];
        $categoria->save();
        return response(
            MessageResponse::messageDescriptionError("Ok","Categoria del alumno actualizada correctamente"),
            200
        );
    }

    public function deleteCategoriaAlumno($idCategoriaAlumno) {
        $categoriaAlumno = CategoriaAlumno::find($idCategoriaAlumno);
        if(!$categoriaAlumno) {
            return response(
                MessageResponse::messageDescriptionError("Error","La categoria del alumno no existe")
                ,200
            );
        }
        $categoriaAlumno->delete();
        return response(
            MessageResponse::messageDescriptionError("Ok","Categoria del alumno eliminada correctamente"),
            200
        );

    }
}
