import { createContext, useState } from "react";
import Cookies from 'js-cookie';
import { api } from "../utils/apiHelper";

const UserContext = createContext(null);

export const UserProvider = (props) => {

    const userCookie = Cookies.get('authenticatedUser')
    const credentialsCookie = Cookies.get('authenticatedCredentials')

    const [authUser, setAuthUser] = useState(userCookie ? JSON.parse(userCookie) : null);

    const credentialsCookieSet = credentialsCookie ? JSON.parse(credentialsCookie) : {
        emailAddress: '',
        password: ''
    }


    const [credentials, setCredentials] = useState({
        emailAddress: credentialsCookieSet.emailAddress,
        password: credentialsCookieSet.password,
    });

    const signIn = async (signInCredentials) => {

        const response = await api('/users', 'GET', null, signInCredentials);
        if (response.status === 200) {
            const user = await response.json();
            setAuthUser(user);
            setCredentials(signInCredentials);
            Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 })
            Cookies.set('authenticatedCredentials', JSON.stringify(signInCredentials), { expires: 1 })
            return user;
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }



    const signOut = () => {
        setAuthUser(null)
        setCredentials({ emailAddress: null, password: null })
        Cookies.remove('authenticatedUser');
        Cookies.remove('authenticatedCredentials');
    }

    return (
        < UserContext.Provider value={{
            authUser,
            credentials,
            actions: {
                signIn,
                signOut
            }
        }
        }>
            {props.children}
        </ UserContext.Provider>
    )

}

export default UserContext;





