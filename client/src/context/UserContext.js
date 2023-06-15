import { createContext, useState } from "react";
import Cookies from 'js-cookie';
import { api } from "../utils/apiHelper";

const UserContext = createContext(null);

/**
 * The UserProvider function act as a provider which provides signin and signout function to the consumers * 
 * @param {props} props - takes props as a parameter
 * @returns  - auth User, credential and action to provide to the consumers
 */

export const UserProvider = (props) => {


    /**
     * Cookies are obtained so that it can be retained upon page loading
     */
    const userCookie = Cookies.get('authenticatedUser')
    const credentialsCookie = Cookies.get('authenticatedCredentials')

    const [authUser, setAuthUser] = useState(userCookie ? JSON.parse(userCookie) : null);

    const credentialsCookieSet = credentialsCookie ? JSON.parse(credentialsCookie) : {
        emailAddress: '',
        password: ''
    }

    /**
     * If cookies are present then it is retained in the credentials
     */
    const [credentials, setCredentials] = useState({
        emailAddress: credentialsCookieSet.emailAddress,
        password: credentialsCookieSet.password,
    });

    /**
     * The signin function performs signin checks before granting access to the user
     * @param {signInCredentials} signInCredentials  - authenticate the user with a GET request
     * if status is ok, then authUser variable is updated 
     * @returns - user details are returned
     */

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


    /**
     * The user is successfully signed-out
     * All the cookies are also removed
     */
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





