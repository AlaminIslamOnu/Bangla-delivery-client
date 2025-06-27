import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
         const {user,loading}=UseAuth()
         const location= useLocation()
         console.log(location);

    if(loading){
      return <span className="loading loading-bars loading-xl"></span>
         }
         if(!user){
    return <Navigate to={'/login'} state={{ from: location.pathname }}></Navigate>
         }
         else 
    return children
};

export default PrivateRoute;