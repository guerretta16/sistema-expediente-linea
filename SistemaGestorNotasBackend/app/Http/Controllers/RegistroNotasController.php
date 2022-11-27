<?php

namespace App\Http\Controllers;

use App\Models\RegistroNota;
use App\Service\RegistroNotasService;
use Illuminate\Http\Request;

class RegistroNotasController extends Controller
{
    protected $registroNotasService;

    public function __construct(RegistroNotasService $registroNotasService)
    {
        $this->registroNotasService = $registroNotasService;
    }

    public function storeNota(Request $request, RegistroNota $nota)
    {
        $response = $this->registroNotasService->registrarNota($request->json()->all(), $nota);
        return $response;
    }
}
