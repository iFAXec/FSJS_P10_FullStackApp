
import { useContext } from "react"
import UserContext from "../context/UserContext"

import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * The private Route function is accessible to authorised  users
 * Check if the user is authorised
 * Displays the Update and create course button
 * else navigate to signin route for user to log in
 */


const PrivateRoute = () => {
    const { authUser } = useContext(UserContext);
    console.log("🚀 ~ authUser:", authUser);
    const location = useLocation();
    // console.log("🚀 ~ location:", location);

    if (authUser) {
        return <Outlet />
    } else {
        return <Navigate to='signin' state={{ from: location.pathname }} />
    }
}

export default PrivateRoute;
