/**
 * @author JS Martinez
 */
import { getAgeByDateOfBirth } from 'Service/UserService';
import avatarDefault from 'assets/image/avatar.png';

function CardUser({name, avatar, age, rol, idPerson, typeUser, handleClickDelete, handleClickChangePassword}) {

    const STUDENT = "1";
    const TEACHER = "2";


    const deleteUserHandle = () => {
        const dataSend = {
            "id_user": idPerson,
            "type_user": typeUser === "T" ? TEACHER : STUDENT
        }
        handleClickDelete({dataSend});
    };

    const changePasswordHandle = () => {
        const dataSend = {
            "id_user": idPerson,
            "type_user": typeUser === "T" ? TEACHER : STUDENT
        }
        handleClickChangePassword({dataSend});
    };


    return (
        <article className = "article">
            <header>
                <img className = "article__img" src = {avatar === "" ? avatarDefault : avatar } alt = "Avatar" />
                <h4 className = "article__title">{name}</h4>
            </header>
            <main className = "article__main">
                <p className = "article__text">Edad: {getAgeByDateOfBirth(age)}</p>
                <p className = "article__text">Rol: {rol}</p>
            </main>
            <footer className="article__fotter">
                <button 
                    className="formCustom__button article__button"
                    onClick={changePasswordHandle}
                    >
                    Cambiar Password
                </button>
                <button 
                    onClick={deleteUserHandle}
                    className="formCustom__button formCustom__button--red article__button"
                >Eliminar</button>
            </footer>
        </article>
    );

}

export { CardUser }
