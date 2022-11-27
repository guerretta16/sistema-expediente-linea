<html>
    <head>
        <link rel="stylesheet" href="{{ asset('/css/userCreated.css') }}"/>

        <style>
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }

            .main {
                width: 500px;
                height: 100vh;
            }

            .main__head {
                width: 100%;
                height: 200px;
                background-color: #000;
                position: relative;
            }

            .main__logo {
                position: absolute;
                left: 0;
                bottom: 0;
                top: 0;
                right: 0;
                display: block;
                width: 50%;
                height: 200px;
                margin: auto;
            }


            .main__date {
                position: absolute;
                color: #FFF;
                bottom: 5px;
                right: 5px;
            }

            .main__body {
                margin-top:10px;
            }
            .main__subtitle {
                text-align: center;
                margin-bottom: 10px;
            }
            .main__label {
                margin-left: 20px;
                margin-bottom: 15px;
            }
            .main__label--bold {
                font-weight: 700;
            }

            .main__footer {
                text-align: center;
                font-size: 12px;
                color: #444444;
            }
        </style>
    </head>
    <body>
        <main class = "main">
            <div class = "main__head">
                <img 
                    class = "main__logo"
                    alt = "logo" 
                    src = "{{ $message->embed(public_path().'/images/logo.png') }}"
                />
                <p class = "main__date">Enviado el {{$dataShow['date']}} a las 14:24</p>
            </div>
            <div class = "main__body">
                <h3 class = "main__subtitle">Cambio de contraseña</h3>
                
                <p class = "main__label">
                    Username: <span class = "main__label--bold">{{ $dataShow['username'] }}</span>
                </p>
                <p class = "main__label">
                    Password: <span class = "main__label--bold">{{$dataShow['password']}}</span>
                </p>
            </div>
            <div class = "main__footer">
                <p>
                    Por favor, no responda a este correo debido a que ha sido generado automáticamente.
                </p>
                <p>
                    © 2022 Universidad de El Salvador
                </p>
            </div>
        </main>

    </body>
</html>
