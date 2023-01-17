import React from 'react'
import {Grid, Button, Box, Alert, TextField,Typography } from '@mui/material'
import {useNavigate, useParams} from 'react-router-dom'
import { useState } from 'react'
import {useResetPasswordMutation} from '../../services/UserAuthAPI'
const ResetPassword = () => {
    const navigate = useNavigate()
    const [serverError, setServerError] = useState({})
    const [serverMsg, setServerMsg] = useState({})
    const [resetPassword, {}] = useResetPasswordMutation()
    const {id,token}=useParams()

    const handleSubmit =async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            password: data.get('password'),
            password2: data.get('password2'),
        }
        const res = await resetPassword({actualData,id,token})
        if (res.error) {
            setServerMsg({})
            setServerError(res.error.data.errors)
        }
        if (res.data) {
            document.getElementById('reset-password-form').reset()
            setServerMsg(res.data)
            setServerError({})
            navigate('/login')

        }



    }


    return (
        <>
        <Grid container justifyContent='center' sx={{mt:4}}>
            <Grid item sm={6} xs={12}>     
            <h2>Reset Password</h2>
            <Box component='form' id='reset-password-form' noValidate sx={{ mt: 1 ,mx:2}} onSubmit={handleSubmit}>
                <TextField margin='normal' required fullWidth type='password' id='password' name='password' label='New Password' />
                {serverError.password ? <Typography style={{ color: 'red', fontSize: 12, paddingLeft: 10 }}>{serverError.password[0]}</Typography> : ''}

                
                <TextField margin='normal' required fullWidth type='password' id='password2' name='password2' label='Confirm New Password' />
                {serverError.password2 ? <Typography style={{ color: 'red', fontSize: 12, paddingLeft: 10 }}>{serverError.password2[0]}</Typography> : ''}
                {serverError.non_field_errors ? <Alert severity='error'>{serverError.non_field_errors}</Alert> : ''}
                    {serverMsg.msg ? <Alert severity='success'>{serverMsg.msg}</Alert> : ''}

                <Box sx={{ textAlign: 'right', m: 2 }}>
                    <Button type='submit' variant='contained'>Save</Button>
                </Box>
            </Box>
        </Grid></Grid>

        </>)
}

export default ResetPassword