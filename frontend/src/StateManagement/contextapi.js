import React, { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
// import { Redirect } from "react-router-dom";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user,setUser]=useState({name:"",email:"",picture:""})

  // const navigate = useNavigate();
  

  useEffect(() => {

    const get_details=Cookies.get('food4bengal')
    

    
    if(get_details!==undefined){
      const TOKEN = JSON.parse(get_details?.substring(2, ))
      setUser({name:TOKEN.name, email:TOKEN.email, picture:TOKEN.profilePic})
    };

  }, []);
   console.log(user)


  return (
    <AuthContext.Provider value={{user,setUser}}>
        {children}
    </AuthContext.Provider>
  )

  
}
export const AuthState = () => {
    return useContext(AuthContext);
  };
  
  export default AuthProvider;
