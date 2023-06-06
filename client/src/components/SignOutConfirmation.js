import React from "react"
import { NavLink } from "react-router-dom";


const SignOutConfirmation = () => {

    return (
        <div>
            <div>
                <h3>You have successfully Signed-Out</h3>
                <NavLink className="button button-secondary" to="/">Return to List</NavLink>
            </div>
        </div>
    )
}

export default SignOutConfirmation;
