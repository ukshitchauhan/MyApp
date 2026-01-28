import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import EditPost from './pages/EditPost'
import ProtectedRoute from './pages/ProtectedRoute'

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route 
        path='/dashboard' 
        element=
        {
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
        }/>
    </Routes>
   </BrowserRouter>
  )
}

export default App
