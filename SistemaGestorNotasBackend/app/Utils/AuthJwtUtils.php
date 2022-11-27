<?php
namespace App\Utils;

/**
 * @author JS Martinez
 */

use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use DomainException;


class AuthJwtUtils {

    /**
     * @param string $headerAuthorization
     * @return string $tokenJwt
     */
    public static function getSubStringHeaderAuthorization($headerAuthorization) {
        return substr($headerAuthorization, 7);
    }


    /**
     * @param $jwt
     * @return \App\Models\User $user
     */
    public static function getUserForJWT($jwt) {
        $key = env("SECRET_KEY");
        try {
            $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
            $user = User::find($decoded->idUser);
            return $user;
        } catch(DomainException $domainExection) {
            return null;
        }

    }

    public static function generatePasswordRandow() {
        $lengthPassword = 16;
        $characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTVWXYZ";
        return substr(str_shuffle($characters), 0, $lengthPassword);
    }
}
