import React from 'react'
import { useState,useEffect } from 'react'
import { CssBaseline, Card, Grid, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ChangePassword from './auth/ChangePassword'
import { getToken, removeToken } from '../services/LocalStorageService'
import Navbar from '../components/Navbar'
import { unSetAccessToken } from '../features/AuthSlice'
import { useDispatch } from 'react-redux'
import { useGetLoggedUserQuery } from '../services/UserAuthAPI'
import {unSetUserInfo,setUserInfo} from '../features/userSlice'

const Dashboard = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(unSetUserInfo({name:'',email:''}))
    removeToken()
    dispatch(unSetAccessToken({ accessToken: null }))
    navigate('/login')
  }
  const [userData,setUserData]=useState({
    name:'',email:''
  })
  const { accessToken } = getToken()
  const { data, isSuccess } = useGetLoggedUserQuery(accessToken)
  useEffect(()=>{
    if(data && isSuccess){
      setUserData({name:data.name,email:data.email})
    }
  },[data,isSuccess])

  useEffect(()=>{
    if(data && isSuccess){
      dispatch(setUserInfo({name:data.name,email:data.email}))
    }
  },[data,isSuccess,dispatch])
  return <>
    <CssBaseline />
    <Navbar />
    <h1>Dashboard</h1>
    <Grid container>
      <Grid item sm={4}>
        <Card sx={{ m: 1, p: 3, textAlign: 'center' }}>
          <Typography variant='h4' sx={{ fontWeight: 'bold' }}>Profile</Typography>
          <Typography>Name: {userData.name}</Typography>
          <Typography>Email: {userData.email}</Typography>
          <Button onClick={handleClick} color='primary' size='large' variant='contained' sx={{ mt: 5 }}>Logout</Button>
        </Card>
      </Grid>
      <Grid item sm={7} sx={{}}>
        <ChangePassword />
      </Grid>
    </Grid>

  </>
}

export default Dashboard