import React, { useContext } from "react"
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";


const Authenticated = () => {

    const { authUser } = useContext(UserContext);
    console.log("🚀 ~ authUser:", authUser);

    return (

        <div>
            <div>
                <h1>{authUser.firstName} has successfully signed-in </h1>
                <p>Click below to access the course library</p>
                <Link to={'/'} >Course Detail</Link>
            </div>
        </div>

    )

}

export default Authenticated;
