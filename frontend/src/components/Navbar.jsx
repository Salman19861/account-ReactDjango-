import React from 'react'
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { getToken } from '../services/LocalStorageService'
import Dashboard from '../pages/Dashboard'
const Navbar = () => {
    const { accessToken, refreshToken } = getToken()

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position='static' color='primary'>
                    <Toolbar>
                        <Typography variant='h5' component='div' sx={{ flexGrow: 1, fontWeight: 'bold' }} >
                            Memehub
                        </Typography>
                        <Button component={NavLink} to='/' sx={{ color: 'white', textTransform: 'none' }}
                            style={
                                ({ isActive }) => {
                                    return { backgroundColor: isActive ? '#055099' : '' }
                                }
                            }
                        >Home</Button>
                        <Button component={NavLink} to='/contact' sx={{ color: 'white', textTransform: 'none' }}
                            style={
                                ({ isActive }) => {
                                    return { backgroundColor: isActive ? '#055099' : '' }
                                }
                            }
                        >Contact</Button>

                        {accessToken ?
                            <Button component={NavLink} to='/dashboard' sx={{ color: 'white', textTransform: 'none' }}
                                style={
                                    ({ isActive }) => {
                                        return { backgroundColor: isActive ? '#055099' : '' }
                                    }
                                }
                            >Dashboard</Button>
                        :
                        <Button component={NavLink} to='/login' sx={{ color: 'white', textTransform: 'none' }}
                            style={
                                ({ isActive }) => {
                                    return { backgroundColor: isActive ? '#055099' : '' }
                                }
                            }
                        >Login/Register</Button>}

                    </Toolbar>
                </AppBar>

            </Box>
        </>
    )
}

export default Navbar