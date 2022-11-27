<?php
/**
 * @author JS Martinez
 */

namespace App\Http\Controllers;

use App\Service\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{

    private UserService $userService;

    public function __construct(UserService $userService) {
        $this->userService = $userService;
    }


    public function getAllUserByStudents() {
        return $this->userService->getAllUserByStudents();
    }

    public function getAllUserByTeachers() {
        return $this->userService->getAllUserByTeachers();
    }

    public function storeUser(Request $request) {
        $dataJson = $request->json()->all();
        return $this->userService->storeUser($dataJson);

    }

    public function getUserFilter(Request $request) {
        $filter = $request->get('filter');
        $users = $this->userService->getUsersFilter($filter);
        return $users;
    }

    public function deleteUser(Request $request) {
        $dataJson = $request->json()->all();
        return $this->userService->deleteUser($dataJson);
    }

    public function changePassword(Request $request) {
        $dataJson = $request->json()->all();
        return $this->userService->changePasswordService($dataJson);
    }

}
