import './index.css';
function AlertMessage({ title, descripction, onClose, onEvent, dataUpdate, loading }) {

    const handleDelete = () =>{
        onEvent({ data: dataUpdate, onClose });
    }
    if(onEvent){
        console.log("no hay evento");
    }

    return (
        <div className='Alert-message-container'>
            <h2 className = "Alert-message-title">{ title }</h2>
            <p className = "Alert-message-description">{ descripction }</p>
            
            <div className = "Alert-message-btns">
                <button 
                    onClick = { handleDelete }
                    className = "Alert-message-btn"
                >{loading?'Eliminando...':'Aceptar'}</button>
                <button 
                    className = "Alert-message-btn Alert-message-btn-red"
                    onClick = { onClose }
                >
                    Cancelar
                </button>
            </div>

        </div>
    )
}

export {AlertMessage};
