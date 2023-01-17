import React, { useState } from 'react'
import Pic1 from '../../images/pic1.png'
import {Grid,Card,Tabs,Tab,Box} from '@mui/material'
import UserLogin from './UserLogin'
import Registration from "./Registration";


function TabPanel(props) {
    const {children,value,index}=props;
    return (
    <div role='tabpanel' hidden={value!==index}>
        {value===index&&<Box>{children}</Box>}
    </div>
  )
}



const LoginReg = () => {
    const [value,setValue]=useState(0)
    const handleChange=(event,newValue)=>{
        setValue(newValue)
    }
    return (
    <>
        <Grid container sx={{height:'89vh'}}>
            <Grid item lg={7} sm={5} sx={{
                backgroundImage:`url(${Pic1})`,
                backgroundRepeat:'no-repeat',
                backgroundSize:'cover',
                backgroundPosition:'center',
                display:{xs:'none',sm:'block'},
                overflowY:'hidden'
            }}></Grid>

        <Grid item lg={5} sm={7} xs={12} sx={{}}>
            <Card sx={{height:'100%',width:'100%'}}>
                <Box sx={{m:3}}>
                    <Box sx={{borderBottom:1,borderColor:'divider'}}> 
                        <Tabs value={value} indicatorColor='secondary' textColor='secondary'
                            onChange={handleChange}
                        >
                            <Tab  label='Login' sx={{textTransform:'none' , fontWeight:'bold'}}></Tab>
                            <Tab label='Register' sx={{textTransform:'none' , fontWeight:'bold'}}></Tab>
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}><UserLogin/></TabPanel>
                    <TabPanel value={value} index={1}><Registration/></TabPanel>
                </Box>
            </Card>
        </Grid>

        </Grid>
        
    </>
  )
}

export default LoginReg