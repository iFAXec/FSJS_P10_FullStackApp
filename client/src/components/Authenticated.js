import React, { useContext } from "react"
import UserContext from "../context/UserContext";
import { NavLink } from "react-router-dom";


const Authenticated = () => {

    const { authUser } = useContext(UserContext);

    return (

        <div>
            <div>
                <h1>{authUser.firstName} has successfully signed-in </h1>
                <p>Click below to access the course library</p>
                <NavLink className="button button-secondary" to="/">Course Detail</NavLink>
            </div>
        </div>

    )

}

export default Authenticated;
