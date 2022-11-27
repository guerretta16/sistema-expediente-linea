/**
 * @author JS Martinez
 */
import '../Login/index.css';
function ParraphopError({ message }) {
    return (
        <div className="form__container--error">
            <p className='form__error'>{message}</p>

        </div>
    );
}

export {ParraphopError};