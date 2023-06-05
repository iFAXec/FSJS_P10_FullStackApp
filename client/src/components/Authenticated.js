import React, { useContext } from "react"
import UserContext from "../context/UserContext";


const Authenticated = () => {

    const { authUser } = useContext(UserContext);


    return (

        <div>
            <div>
                <h1>{authUser.firstName} is Authenticated</h1>
                <p>You can sign in using your email: {authUser.emailAddress} and access the course library</p>
            </div>
        </div>

    )

}

export default Authenticated;
