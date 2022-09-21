import React, { useContext } from 'react'
import { AuthContext } from 'context/AuthContext'
import Login from 'pages/Authentication/Login'
import Dashboard from "../pages/Dashboard/Home"

export default function PrivateRoute(props) {

    const { isAuthenticated } = useContext(AuthContext)
    console.log(isAuthenticated)

    const { Component } = props;

    if (!isAuthenticated)
        return <Login />

    return (
        <Component />
    )
}
