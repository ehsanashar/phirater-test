import React from "react"
import { Navigate } from "react-router-dom"

const ProtectedRoutes = ({children}) => {
    const user = JSON.parse(localStorage.getItem('profile'))

    if(!user) {
        return <Navigate to='/auth' />
    }

    return children
}

export default ProtectedRoutes

