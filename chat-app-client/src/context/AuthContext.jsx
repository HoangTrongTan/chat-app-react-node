import { createContext, useCallback, useEffect, useState } from 'react';
import { baseURL, postRequest } from '../utils/service';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState();
    const [registerError, setRegistorError] = useState();
    const [isRegisterLoading,setIsRegisterLoading] = useState(false);
    
    const [register,setRegister] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [logininfo,setLogginInfo] = useState({
        email: "",
        password: ""
    });

    useEffect( () => {
        const user = localStorage.getItem('User');
        console.log("vào vào localstorage");
        setUser(JSON.parse(user));
    } , [] );

    const updateRegisterInfo = useCallback( (info) => { 
        setRegister(info);
    } ,[] );

    const updateLoginInfo = useCallback( (info) => { 
        setLogginInfo(info);
    } ,[] );



    const registerUser = useCallback( async (e) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegistorError(null);
        const response = await postRequest(`${baseURL}/user/sign-up` ,JSON.stringify(register) );
        if(response.error){
            return setRegistorError(response);
        }
        setIsRegisterLoading(false);
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
    } , [register]);


    const logoutUser = useCallback( () => {
        localStorage.removeItem('User');
        setUser(null);
    } , [] );


    const loginUser = useCallback( async (e) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegistorError(null);
        const response = await postRequest(`${baseURL}/user/sign-in` ,JSON.stringify(logininfo) );
        if(response.error){
            return setRegistorError(response);
        }
        setIsRegisterLoading(false);
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
    } , [logininfo] );
    return (
        <AuthContext.Provider 
            value={{
                user,
                register,
                updateRegisterInfo,
                registerUser,
                registerError,
                isRegisterLoading,
                logoutUser,
                loginUser,
                updateLoginInfo,
                logininfo
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}