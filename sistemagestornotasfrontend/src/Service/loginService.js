import { ENDPOINT } from "Config/EndPoint";
function loginService({ username, password}) {

    return(
        fetch(`${ENDPOINT}/login`, {
            method: "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({username: username, password: password})
        })
        .then(response => response.json())
        .then(data => {
            return data;
        })
    );

}

export {loginService}