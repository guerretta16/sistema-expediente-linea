
/**
 * @author JS Martinez
 */
import {ENDPOINT} from "Config/EndPoint";


function getAllUsersByStudents({jwt, option}) {
    return (
        fetch(`${ENDPOINT}/getAllUsers/${option}`,{ 
            method: 'GET',
            headers : {
                'Authorization': jwt ? `Bearer ${jwt}`: '' 
            }
        }).then (response => {
            return response;
        })
    );
}


const getAgeByDateOfBirth = (age) => {
    let ageArray = age.split('-');
    let [year, month, day] = ageArray;
    let date = new Date();

    let ageSubtraction = date.getFullYear() - parseInt(year);

    if(date.getMonth() < month) {
        ageSubtraction = ageSubtraction -1;
    }
    if(date.getMonth() === parseInt(month)) {
        if(date.getDay() < parseInt(day)) {
            ageSubtraction = ageSubtraction - 1;
        }
    }
    return ageSubtraction;
}

const getUsersFilter = ({jwt, filter}) => {
    return (
        fetch(`${ENDPOINT}/getUsersByFilter?filter=${filter}`,{ 
            method: 'GET',
            headers : {
                'Authorization': jwt ? `Bearer ${jwt}`: '' 
            }
        }).then (response => {
            return response;
        })
    );
}

const storeUser = ({jwt, user}) => {
    return(
        fetch(`${ENDPOINT}/storeUser`, {
            method: 'POST',
            headers :{
                'Authorization': jwt ? `Bearer ${jwt}`: '' 
            },
            body: JSON.stringify(user)
        })
        .then(response => response));
}

const deleteUser = ({jwt, dataSend}) => {
    return(
        fetch(`${ENDPOINT}/deleteUser`, {
            method: 'POST',
            headers :{
                'Authorization': jwt ? `Bearer ${jwt}`: '' 
            },
            body: JSON.stringify(dataSend)
        })
        .then(response => response));
}

const changePasswordService = ({jwt, dataSend}) => {
    return(
        fetch(`${ENDPOINT}/changePasswordUser`, {
            method: 'POST',
            headers :{
                'Authorization': jwt ? `Bearer ${jwt}`: '' 
            },
            body: JSON.stringify(dataSend)
        })
        .then(response => response));
};


export { 
    getAllUsersByStudents, 
    getAgeByDateOfBirth, 
    getUsersFilter,
    storeUser,
    deleteUser,
    changePasswordService
};
