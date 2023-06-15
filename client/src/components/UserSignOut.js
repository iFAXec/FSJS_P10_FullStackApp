import { useEffect, useContext, } from 'react'
import { useNavigate } from 'react-router-dom';

import UserContext from '../context/UserContext';


/**
 * The UserSignOut function imports the signout actions from UserContext component
 * Performs the signout operation and navigate the users to the signout confirmation page
 * @returns - displays a signout confirmation message
 */

const UserSignOut = () => {
    const { actions } = useContext(UserContext);
    const navigate = useNavigate()

    useEffect(() => {
        actions.signOut();
        navigate('/signoutconfirmation')
    }, [actions, navigate]
    )

    return (
        null
    );
}

export default UserSignOut;