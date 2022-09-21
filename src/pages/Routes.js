import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Frontend from "./Frontend"
import Authentication from "./Authentication/inder"
import Dashboard from "./Dashboard"
import { AuthContext } from 'context/AuthContext';
import PrivateRoute from 'components/PrivateRoute';
import { useEffect } from 'react';
// import Home from './Frontend/Home/index';

export default function Index() {
  const { isAuthenticated, user } = useContext(AuthContext)
  useEffect(() => {
    // console.log(isAuthenticated);
  }, [])
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/*" element={<Frontend />} />
        <Route path="dashboard/*" element={<PrivateRoute Component={Dashboard} />} />
        <Route path="authentication/*" element={!isAuthenticated ? <Authentication /> : <Navigate to="/dashboard" />} />
      </Routes>

    </BrowserRouter>
  )
}
