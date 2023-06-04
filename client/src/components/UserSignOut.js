import React, { useEffect, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom';

import UserContext from '../context/UserContext';


const UserSignOut = () => {
    const { actions } = useContext(UserContext);

    useEffect(() => actions.signOut());


    return (
        <Navigate to='/' replace />
    )
}

export default UserSignOut;