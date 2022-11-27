<?php

namespace App\Mail;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ChangePasswordUser extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $password;
    public $dataShow;
    public function __construct(User $user, $namePerson, $password)
    {
        $this->dataShow = [
            "username" => $user->username,
            "password" => $password,
            "alumno" => $namePerson,
            "date" => Carbon::now()
        ];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.changePassword')->subject('Cambio de contraseña');
    }
}
