import Context from 'Context/UserContext';
import { useContext, useState, useEffect } from 'react';
import { getAllUsersByStudents } from 'Service/UserService';

function useManagmentUser({option} = {option: 'students'}) {

    const { jwt } = useContext(Context);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        getAllUsersByStudents({jwt, option})
        .then(response => response.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
    }, [option, jwt]);

    return {
        users,
        loading
    }

}

export { useManagmentUser }
