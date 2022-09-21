import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './Home'
import Todos from '../Frontend/Todos/index'
export default function index() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/frontend/todos' element={<Todos />} />
      </Routes>
    </>
  )
}
