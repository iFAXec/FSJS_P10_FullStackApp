import { createContext, useState } from "react";
import Cookies from 'js-cookie'

const UserContext = createContext(null);

export const UserProvider = (props) => {

    const cookie = Cookies.get('authenticatedUser')

    const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);
    const [credentials, setCredentials] = useState({
        emailAddress: '',
        password: ''
    });

    const signIn = async (credentials) => {

        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

        const fetchOptions = {
            method: 'GET',
            headers: {
                Authorization: `Basic ${encodedCredentials}`
            }
        }

        const response = await fetch('http://localhost:5000/api/users', fetchOptions);
        if (response.status === 200) {
            const user = await response.json();
            setAuthUser(user);
            setCredentials(credentials);
            Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 })
            return user;
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }



    const signOut = () => {
        setAuthUser(null)
        Cookies.remove('authenticatedUser');
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





