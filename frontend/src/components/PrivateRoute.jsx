import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const token = localStorage.getItem('token')
    console.log("Token retreived from localstorage In PrivateRoute:", token);
   return token ? children : <Navigate to="/login" />
   
}

export default PrivateRoute