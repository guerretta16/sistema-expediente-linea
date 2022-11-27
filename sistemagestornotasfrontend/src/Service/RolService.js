import { ENDPOINT } from "Config/EndPoint";

function getAllRol({ jwt }) {
    return (
        fetch(`${ENDPOINT}/getAllRoles`, {
            headers: {
                Authorization: jwt ? `Bearer ${jwt}` : "",
            }
        }).then (response => response)
    )

}
export { getAllRol };