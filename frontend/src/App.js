import React from "react";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import LoginReg from "./pages/auth/LoginReg";
import SendPasswordResetEmail from './pages/auth/SendPasswordResetEmail'
import ResetPassword from './pages/auth/ResetPassword.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { useSelector} from 'react-redux'

function App() {
  const {accessToken} = useSelector((state) => state.auth)
  return <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>} />
      <Route path='contact' element={<Contact/>} />
      <Route path='login' element={!accessToken?<LoginReg/>:<Navigate to='/dashboard'/>} />
      <Route path='SendPasswordResetEmail' element={<SendPasswordResetEmail/>}/>
      <Route path='api/user/reset/:uid/:token' element={<ResetPassword/>}/>
    </Route>
    <Route path='/dashboard' element={accessToken?<Dashboard/>:<Navigate to='/login'/>}/>
    <Route path='*' element={<h1>Error 404 Page Not Found!</h1>}/>
  </Routes>
  </BrowserRouter>
  </>

}

export default App;
