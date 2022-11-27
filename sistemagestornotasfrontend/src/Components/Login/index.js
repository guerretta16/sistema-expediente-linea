import "./index.css";
import usernameSvg from "assets/icon/username.svg";
import passwordSvg from "assets/icon/password.svg";
import { ParraphopError } from "Components/ParraphopError";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "Hooks/useUser";
import { Loader } from 'Components/Loader';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorInput, setErrorInput] = useState(false);
  const { login, isLogged, isLoginLoading, isLoginError, messageError } =
    useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged]);

  if(isLoginLoading) {
    return <Loader />
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      setErrorInput(false);
      login({ username, password });
    } else {
      setErrorInput(true);
    }
  };

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login-container">
      <form className="form">
        <h1 className="form__title">INICIAR SESION</h1>
        <div className="form__info">
          <div className="form__container">
            <label className="form__label" htmlFor="username">
              <img src={usernameSvg} alt="icon" className="form__icon" />
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="form__input"
              placeholder="Username"
              onChange={changeUsername}
            />
          </div>
          <div className="form__container">
            <label className="form__label" htmlFor="password">
              <img src={passwordSvg} alt="icon" className="form__icon" />
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form__input"
              placeholder="Password"
              onChange={changePassword}
            />
          </div>
        </div>
        {isLoginError && <ParraphopError message={messageError} />}
        {errorInput && <ParraphopError message="Error hay campos vacios" />}
        <div className="form__container_btn">
          <button
            className="form__button"
            id="loginButton"
            onClick={handleClick}
          >
            INGRESAR
          </button>
        </div>
      </form>
    </div>
  );
}

export { Login };
