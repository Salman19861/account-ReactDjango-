import React from 'react'
import { FormControlLabel, Checkbox, Button, Box, TextField, Typography, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useRegisterUserMutation } from '../../services/UserAuthAPI'
import { storeToken } from '../../services/LocalStorageService'


const Registration = () => {
  const navigate = useNavigate()
  const [registerUser, { isLoading, isError }] = useRegisterUserMutation()
  const [serverError, setServerError] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      password2: data.get('password2'),
      tc: data.get('tc')
    }
    const res = await registerUser(actualData)
    console.log(res)
    if (res.error) {
      setServerError(res.error.data.errors)
    }
    if (res.data) {
      storeToken(res.data.token)
      navigate('/dashboard') }
  
    }

  return (
    <>
      <Box component='form' id='registration-form' noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>

        {serverError.non_field_errors ? <Alert severity='error'>{serverError.non_field_errors}</Alert> : ''}

        <TextField margin='normal' autoFocus required fullWidth id='name' name='name' label='Name' />
        {serverError.name ? <Typography style={{ color: 'red', fontSize: 12, paddingLeft: 10 }}>{serverError.name[0]}</Typography> : ''}

        <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
        {serverError.email ? <Typography style={{ color: 'red', fontSize: 12, paddingLeft: 10 }}>{serverError.email[0]}</Typography> : ''}

        <TextField margin='normal' required fullWidth type='password' id='password' name='password' label='Password' />
        {serverError.password ? <Typography style={{ color: 'red', fontSize: 12, paddingLeft: 10 }}>{serverError.password[0]}</Typography> : ''}

        <TextField margin='normal' required fullWidth type='password' id='password2' name='password2' label='Confirm Password' />
        {serverError.password2 ? <Typography style={{ color: 'red', fontSize: 12, paddingLeft: 10 }}>{serverError.password2[0]}</Typography> : ''}


        <FormControlLabel control={<Checkbox name='tc' id='tc' color='primary' value={true} />}
          label='I agree to terms and conditions' />
        {serverError.tc ? <span style={{ color: 'red', fontSize: 12, paddingLeft: 10 }}>{serverError.tc[0]}</span> : ''}
        <Box sx={{ textAlign: 'right', m: 2 }}>
          <Button type='submit' variant='contained'>Register</Button>
        </Box>
      </Box>
    </>
  )
}

export default Registration