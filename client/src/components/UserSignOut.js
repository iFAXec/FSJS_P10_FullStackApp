import { useEffect, useContext, } from 'react'
import { useNavigate } from 'react-router-dom';

import UserContext from '../context/UserContext';




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