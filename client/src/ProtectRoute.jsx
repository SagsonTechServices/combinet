import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function ProtectRoute({children}){
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const token = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        async function authenticate(){
            if(!token){
                setIsAuthenticated(false);
                console.log('navigating to login page');
                // navigate 
                navigate('/login')
                return;
            }
            try{
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/authenticate-token`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                if(response.status === 200){
                    setIsAuthenticated(true);
                    console.log('Authenticated');
                }else{
                    setIsAuthenticated(false);
                    console.log('navigating to login page');
                    // navigate
                    navigate('/login')
                } 

            }catch(error){
                setIsAuthenticated(false);
                console.log('navigating to login page');
                // navigate
                navigate('/login')
            }
            finally{
                setIsLoading(false);
            }
        }

        authenticate();
    }, [token, navigate])

    if(isAuthenticated){
        return(
            children
        )
    }

    return null;
}

export default ProtectRoute;