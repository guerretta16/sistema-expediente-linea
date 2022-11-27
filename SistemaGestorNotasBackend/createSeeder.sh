#!/bin/sh

php artisan db:seed --class=CursoSeeder
php artisan db:seed --class=NivelSeeder
php artisan db:seed --class=MesSeeder
php artisan db:seed --class=CursoNivelSeeder
php artisan db:seed --class=CursoNivelMesSeeder
php artisan db:seed --class=RolSeeder
php artisan db:seed --class=CategoriaAlumnoSeeder
php artisan db:seed --class=UserSeeder
php artisan db:seed --class=AlumnoSeeder
php artisan db:seed --class=ProfesorSeeder
php artisan db:seed --class=PeriodoSeeder
php artisan db:seed --class=CargaAcademicaSeeder
