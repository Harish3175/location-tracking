import React from 'react'
import { Navigate } from 'react-router-dom';
import AccessDenied from '../pages/AccessDenied';

const Role = ({children,allowedRoles}) => {

    const user= JSON.parse(localStorage.getItem("user"));

    if(!user) {
        return <Navigate to="/" replace/>
    }
    if(!allowedRoles.includes(user.role)){
      return<AccessDenied message="Contact your IT team."/>
    };

  return children
};

export default Role
