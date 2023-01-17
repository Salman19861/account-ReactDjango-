import React from 'react'
import { Grid, TextField, Button, Box, Alert, Typography } from '@mui/material'
import { useState } from 'react'
import { useSendPasswordResetEmailMutation } from '../../services/UserAuthAPI'
const SendPasswordResetEmail = () => {
    const [serverError, setServerError] = useState({})
    const [serverMsg, setServerMsg] = useState({})
    const [sendPasswordResetEmail, { isLoading }] = useSendPasswordResetEmailMutation()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            email: data.get('email')
        }
        const res = await sendPasswordResetEmail(actualData)
        if (res.error) {
            setServerMsg({})
            setServerError(res.error.data.errors)
        }
        if (res.data) {
            document.getElementById('send-mail-for-password-reset-form').reset()
            setServerMsg(res.data)
            setServerError({})

        }


    }
    return (
        <>
            <Grid container justifyContent='center' sx={{ mt: 4 }}>
                <Grid item sm={6} xs={12}>
                    <Box component='form' id='send-mail-for-password-reset-form' noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                        <TextField margin='normal' autoFocus required fullWidth id='email' name='email' label='Email Address' />
                        {serverError.email ? <Typography style={{ color: 'red', fontSize: 12, paddingLeft: 10 }}>{serverError.email[0]}</Typography> : ''}
                    {serverError.non_field_errors ? <Alert severity='error'>{serverError.non_field_errors}</Alert> : ''}
                    {serverMsg.msg ? <Alert severity='success'>{serverMsg.msg}</Alert> : ''}


                        <Box sx={{ textAlign: 'right', m: 2 }}>
                            <Button type='submit' variant='contained'>Send</Button>
                        </Box>

                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default SendPasswordResetEmail