/**
 * @author JS Martinez
 */
import { ENDPOINT } from 'Config/EndPoint';


function getAllPeriod({ jwt }) {
    return (
        fetch(`${ENDPOINT}/periodos/index`, {
            method: 'GET',
            headers: {
                'Authorization': jwt ? `Bearer ${jwt}` : ""
            }
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data;
        })
    );
}

const storeOnePeriod = ({ data , jwt}) => {
    return (
        fetch(`${ENDPOINT}/periodos/store`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(data)
        })
        .then(response => response)
    );

}

const updateOnePeriodo = ({ data, jwt }) => {
    return (
        fetch(`${ENDPOINT}/periodos/update/${data.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(data)
        })
        .then(response => response)
    )
}

const changeStatePeriod = ({ data, jwt }) => {
    return(
        fetch(`${ENDPOINT}/periodos/changeState/${data.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(data)
        })
        .then(response =>response)
    );

}

const searchPeriodoActivo = ({ jwt }) => {
    return (
        fetch(`${ENDPOINT}/periodo/searchPeriodoActivo`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        .then(response => response)
    );
}

const getPeriodoByUsers = ({ jwt }) => {
    return (
        fetch(`${ENDPOINT}/periodos/getPeriodosByUser`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        .then(response => response)
    )
}

export {
    getAllPeriod, 
    storeOnePeriod, 
    updateOnePeriodo, 
    changeStatePeriod, 
    searchPeriodoActivo ,
    getPeriodoByUsers
}; 
