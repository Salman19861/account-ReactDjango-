import React from 'react'
import {Typography, Grid, Button, Box, Alert, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useChangeUserPasswordMutation } from '../../services/UserAuthAPI'
import { getToken } from '../../services/LocalStorageService'

const ChangePassword = () => {
    const navigate = useNavigate()
    const [serverError, setServerError] = useState({})
    const [serverMsg, setServerMsg] = useState({})
    const [changeUserPassword,{}] = useChangeUserPasswordMutation()
    console.log(useChangeUserPasswordMutation())

    const {accessToken} = getToken()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            password: data.get('password'),
            password2: data.get('password2'),
        }
        const res = await changeUserPassword({ actualData, accessToken })
        if (res.error) {
            setServerMsg({})
            setServerError(res.error.data.errors)
        }
        if (res.data) {
            document.getElementById('password-change-form').reset()
            setServerMsg(res.data)
            setServerError({})
        
        }

    }


    const myData = useSelector(state => state.userInfo)

    return (
        <>
            <Grid container justifyContent='center' sx={{ mt: 4 }}>
                    {serverMsg.msg ? <Alert severity='success'>{serverMsg.msg}</Alert> : ''}
                <Grid item sm={6} xs={12}>
                    {serverError.non_field_errors ? <Alert severity='error'>{serverError.non_field_errors}</Alert> : ''}

                    <h2 variant='h4' sx={{ fontWeight: 'bold' }}>Change Password</h2>
                    <Box component='form' id='password-change-form' noValidate sx={{ mt: 1, mx: 2 }} onSubmit={handleSubmit}>
                        <TextField margin='normal' required fullWidth type='password' id='password' name='password' label='New Password' />
                        {serverError.password ? <Typography style={{ color: 'red', fontSize: 12, paddingLeft: 10 }}>{serverError.password[0]}</Typography> : ''}


                        <TextField margin='normal' required fullWidth type='password' id='password2' name='password2' label='Confirm New Password' />
                        {serverError.password2 ? <Typography style={{ color: 'red', fontSize: 12, paddingLeft: 10 }}>{serverError.password2[0]}</Typography> : ''}

                        <Box sx={{ textAlign: 'right', m: 2 }}>
                            <Button type='submit' variant='contained'>Save</Button>
                        </Box>
                    </Box>
                </Grid></Grid>

        </>)
}

export default ChangePassword