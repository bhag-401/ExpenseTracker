import React from 'react'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './components/Signin'
import Profile from './Profile'
import MonthlyChart from './components/charts/MonthlyChart'
const App = () => {
  
  return (
    <div>
    
    <BrowserRouter>
    <Routes>
   
        <Route path="/" element={<Home/>}></Route>
        <Route path="Signin" element={<Signin/>}></Route>
        <Route path="profile" element={<Profile/>}></Route>
        <Route path="/monthly" element={<MonthlyChart/>} />
    </Routes>
    </BrowserRouter>
   
    </div>
  )
}

export default App
