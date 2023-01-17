import React from 'react'
import { Typography, TextField, Button, Box, Alert, CircularProgress } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useLoginUserMutation } from '../../services/UserAuthAPI'
import { getToken, storeToken } from '../../services/LocalStorageService'
import { useSelector, useDispatch } from 'react-redux'
import { setAccessToken } from '../../features/AuthSlice'
import { useEffect } from 'react'

const UserLogin = () => {
  const navigate = useNavigate()
  const [error, setError] = useState({
    status: false, type: '', msg: ''
  })
  const [loginUser, { isLoading, isError }] = useLoginUserMutation()
  const [serverError, setServerError] = useState({})
  const dispatch=useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      password: data.get('password')
    }
    const res = await loginUser(actualData)
    if (res.error) {
      setServerError(res.error.data.errors)
    }
    if (res.data) {
      storeToken(res.data.token)
      let { accessToken } = getToken()
      dispatch(setAccessToken({ accessToken: accessToken }))
      navigate('/dashboard')
    }
  }


  let { accessToken } = getToken()
  useEffect(() => {
    dispatch(setAccessToken({ accessToken: accessToken }))
  }, [accessToken,dispatch])

  return (
    <>
      <Box component='form' id='login-form' noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
        {serverError.non_field_errors ? <Alert severity='error'>{serverError.non_field_errors}</Alert> : ''}


        <TextField margin='normal' autoFocus required fullWidth id='email' name='email' label='Email Address' />
        {serverError.email ? <Typography style={{ color: 'red', fontSize: 12, paddingLeft: 10 }}>{serverError.email[0]}</Typography> : ''}


        <TextField margin='normal' required fullWidth type='password' id='password' name='password' label='Password' />
        {serverError.password ? <Typography style={{ color: 'red', fontSize: 12, paddingLeft: 10 }}>{serverError.password[0]}</Typography> : ''}

        {isLoading ? <CircularProgress sx={{ textAlign: 'right', m: 2, mx: 53 }} /> :
          <Box sx={{ textAlign: 'right', m: 2 }}>
            <Button type='submit' variant='contained'>Login</Button>
          </Box>}
        <NavLink to='/SendPasswordResetEmail' >Forget Password?</NavLink>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert>
          : ''}
      </Box>

    </>
  )
}

export default UserLogin