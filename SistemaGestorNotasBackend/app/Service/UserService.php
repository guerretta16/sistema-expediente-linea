<?php
/**
 * @author JS Martinez
 * */
namespace App\Service;

use App\Mail\ChangePasswordUser;
use App\Mail\UserCreated;
use App\Models\Alumno;
use App\Models\Profesor;
use App\Models\Rol;
use App\Models\User;
use App\Utils\AuthJwtUtils;
use App\Utils\MessageResponse;
use App\Utils\ValidateJsonRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

class UserService {

    private const STUDENT = "1";
    private const TEACHER = "2";


    public function storeUser($data) {
        $responseValidate = ValidateJsonRequest::validateJsonRequestStoreTeach($data);
        if(count($responseValidate) > 0) {
            return $responseValidate;
        }

        $rol = Rol::find($data['user_rol']);

        if(!$rol) {
            return response(
                MessageResponse::messageDescriptionError("Error",
                "No se ha encontrado el rol"),
                404
            );
        }
        $passwordGenerated = AuthJwtUtils::generatePasswordRandow();

        if($data['user_type'] == self::STUDENT) {

            $student = Alumno::where('codigo_alumno', '=', $data['id_person'])->first();
            if(!$student) {
                return response(
                MessageResponse::messageDescriptionError("Error",
                    "Not Found"), 404);
            }
            if($student->id_user != null) {
                return response(
                    MessageResponse::messageDescriptionError("Error",
                    "Error ya existe un usuario para esta persona"),
                    200
                );
            }

            $user = new User();
            $user->username = $student->codigo_alumno;
            $user->password = Hash::make($passwordGenerated);
            $user->id_role = $rol->id;
            $responseSaveSuccessUser = $user->saveOrFail();
            if(!$responseSaveSuccessUser) {
                return response(
                    MessageResponse::messageDescriptionError("Error",
                    "Ha ocurrido un error"),
                    200
                );
            }
            $student->id_user = $user->id;
            $responseSaveSuccessStudent = $student->save();
            if(!$responseSaveSuccessStudent) {
                $user->delete();
                return response(
                    MessageResponse::messageDescriptionError("Error",
                    "Ha ocurrido un error"),
                    200
                );
            }

            Mail::to($student->email_alumno)
                ->send(new UserCreated($user, $student->nombre_alumno, $passwordGenerated));

            return response(
                MessageResponse::messageDescriptionError("Ok", "Se guardo con exito"),
                200
            );
        }
        if($data['user_type'] == self::TEACHER) {
            $teacher = Profesor::where('codigo_profesor', '=', $data['id_person'])->first();
            if(!$teacher) {
                return response(
                MessageResponse::messageDescriptionError("Error",
                    "No se ha encontrado el registro"), 404);
            }

            if($teacher->id_user != null) {
                return response(
                    MessageResponse::messageDescriptionError("Error",
                    "Error ya existe un usuario para esta persona"),
                    200
                );
            }
            $user = new User();
            $user->username = $teacher->codigo_profesor;
            $user->password = Hash::make($passwordGenerated);
            $user->id_role = $rol->id;
            $responseSaveSuccessUser = $user->saveOrFail();

            if(!$responseSaveSuccessUser) {
                return response(
                    MessageResponse::messageDescriptionError("Error",
                    "Ha ocurrido un error"),
                    200
                );
            }
            $teacher->id_user = $user->id;
            $responseSaveSuccessStudent = $teacher->save();
            if(!$responseSaveSuccessStudent) {
                $user->delete();
                return response(
                    MessageResponse::messageDescriptionError("Error",
                    "Ha ocurrido un error"),
                    200
                );
            }
            Mail::to($teacher->email_profesor)
                ->send(new UserCreated($user, $teacher->nombre_profesor, $passwordGenerated));

            return response(
                MessageResponse::messageDescriptionError("Ok", "Se guardo con exito"),
                200
            );

        }

    }

    public function getAllUserByStudents() {
        $alumnos = DB::table('alumnos')
            ->select(
                'alumnos.nombre_alumno as nombre',
                'alumnos.apellido_alumno as apellido',
                'alumnos.fecha_nacimiento_alumno as fecha_nacimiento',
                'alumnos.photo_alumno as avatar',
                'users.username',
                'rols.nombre_rol as rol',
                'alumnos.id as id',
                DB::raw('CONCAT("S") as tipo')
            )->join('users', 'users.id', '=', 'alumnos.id_user')
             ->join('rols', 'rols.id', '=', 'users.id_role')
            ->where('alumnos.id_user', '!=', null)->get();
        return $alumnos;
    }


    public function getAllUserByTeachers() {
        $teachers = DB::table('profesors')
        -> select(
            'profesors.nombre_profesor as nombre',
            'profesors.apellido_profesor as apellido',
            'profesors.fecha_nacimiento_profesor as fecha_nacimiento',
            'profesors.photo_profesor as avatar',
            'profesors.id as id',
            'rols.nombre_rol as rol',
            DB::raw('CONCAT("T") as tipo')
        )
        ->join('users', 'users.id', '=', 'profesors.id_user')
        ->join('rols', 'rols.id', '=', 'users.id_role')
        ->where('profesors.id_user', '!=', null)->get();
        return $teachers;
    }

    public function getUsersFilter($filter) {

        $teachers = DB::table('profesors')
        ->select(
            'profesors.id as id',
            'profesors.nombre_profesor as nombre',
            'profesors.apellido_profesor as apellido',
            'profesors.codigo_profesor as codigo',
            'profesors.id_user as id_user',
            DB::raw('CONCAT("T") as tipo')
        )
        ->where('profesors.id_user', '=', null)
        ->where( function($query) use($filter) {
            $query->whereRaw('nombre_profesor LIKE ?', ["%$filter%"])
            ->orWhereRaw('apellido_profesor LIKE ?', ["%$filter%"])
            ->orWhereRaw('codigo_profesor LIKE ?', ["%$filter%"]);
        })
        ->get();

        $students = DB::table('alumnos')
        ->select(
            'alumnos.id as id',
            'alumnos.nombre_alumno as nombre',
            'alumnos.apellido_alumno as apellido',
            'alumnos.codigo_alumno as codigo',
            'alumnos.id_user as id_user',
            DB::raw('CONCAT("S") as tipo')
        )
        ->where('alumnos.id_user', '=', null)
        ->where( function($query) use($filter) {
            $query->whereRaw('nombre_alumno LIKE ?', ["%$filter%"])
            ->orWhereRaw('apellido_alumno LIKE ?', ["%$filter%"])
            ->orWhereRaw('codigo_alumno LIKE ?', ["%$filter%"]);
        })
        ->get();

        $unionArrays = array_merge($teachers->toArray(), $students->toArray());

        return $unionArrays;

    }


    public function deleteUser($dataJson) {
        $responseValidate = ValidateJsonRequest::validateJsonRequestDeleteUser($dataJson);
        if(count($responseValidate) > 0) {
            return $responseValidate;
        }

        if($dataJson['type_user'] == self::STUDENT) {
            $student = Alumno::find($dataJson['id_user']);
            if(!$student) {
                return response(
                    MessageResponse::messageDescriptionError("Error",
                    "No se ha encontrado el registro"), 404);
            }
            if($student->id_user == null) {
                return response(
                    MessageResponse::messageDescriptionError("Error",
                    "Error no existe un usuario para esta persona"),
                    200
                );
            }
            $user = $student->user;
            $student->id_user = null;
            $student->save();
            $user->delete();

            return response(
                MessageResponse::messageDescriptionError("Ok", "Se elimino con exito"),
                200
            );
        }

        if($dataJson['type_user'] == self::TEACHER) {
            $teacher = Profesor::find($dataJson['id_user']);
            if(!$teacher) {
                return response(
                    MessageResponse::messageDescriptionError("Error",
                    "No se ha encontrado el registro"), 404);
            }
            if($teacher->id_user == null) {
                return response(
                    MessageResponse::messageDescriptionError("Error",
                    "Error no existe un usuario para esta persona"),
                    200
                );
            }
            $user = $teacher->user;
            $teacher->id_user = null;
            $teacher->save();
            $user->delete();

            return response(
                MessageResponse::messageDescriptionError("Ok", "Se elimino con exito"),
                200
            );
        }

    }

    public function changePasswordService($dataJson) {
        $passwordGenerated = AuthJwtUtils::generatePasswordRandow();
        $responseValidate = ValidateJsonRequest::validateJsonRequestDeleteUser($dataJson);
        if(count($responseValidate) > 0) {
            return $responseValidate;
        }

        if($dataJson['type_user'] == self::STUDENT) {
            $student = Alumno::find($dataJson['id_user']);
            if(!$student) {
                return response(
                    MessageResponse::messageDescriptionError("Error",
                    "No se ha encontrado el registro"), 404);
            }
            if($student->id_user == null) {
                return response(
                    MessageResponse::messageDescriptionError("Error",
                    "Error no existe un usuario para esta persona"),
                    200
                );
            }
            $user = $student->user;
            $user->password = Hash::make($passwordGenerated);
            $user->save();
            Mail::to($student->email_alumno)
                ->send(new ChangePasswordUser($user, $student->nombre_alumno, $passwordGenerated));

            return response(
                MessageResponse::messageDescriptionError("Ok", "Se ha cambiado el password"),
                200
            );
        }

        if($dataJson['type_user'] == self::TEACHER) {
            $teacher = Profesor::find($dataJson['id_user']);
            if(!$teacher) {
                return response(
                    MessageResponse::messageDescriptionError("Error",
                    "No se ha encontrado el registro"), 404);
            }
            if($teacher->id_user == null) {
                return response(
                    MessageResponse::messageDescriptionError("Error",
                    "Error no existe un usuario para esta persona"),
                    200
                );
            }
            $user = $teacher->user;
            $user->password = Hash::make($passwordGenerated);
            $user->save();

            Mail::to($teacher->email_profesor)
                ->send(new ChangePasswordUser($user, $teacher->nombre_profesor, $passwordGenerated));

            return response(
                MessageResponse::messageDescriptionError("Ok", "Se ha cambiado el password"),
                200
            );
        }
    }

}

?>
