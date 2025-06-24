import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
         const {user,loading}=UseAuth()

         if(loading){
            <span className="loading loading-bars loading-xl"></span>
         }
         if(!user){
            return <Navigate to={'/login'}></Navigate>
         }
         else 
    return children
};

export default PrivateRoute;