/**
 * @author JS Martinez
 */
import  ReactDOM  from "react-dom";
import './index.css';

function Modal({ children, heightC, widthC}) {
    const heightCustom = {
        height: heightC,
        width: widthC
    }

    return (
        <div className="modal">
            <div className="modal-content" style = {heightCustom}>
                {children}
            </div>
        </div>
    );
}
export default function ModalPortal({ children, onClose, heightC, widthC}) {
    return ReactDOM.createPortal(
        <Modal 
            onClose={ onClose } 
            heightC = { heightC } 
            widthC = { widthC }
        >
            {children}
        </Modal>,
        document.getElementById('modal-root')
    );
}
