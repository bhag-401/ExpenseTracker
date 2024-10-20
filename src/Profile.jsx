import React from 'react'
import Detail from './components/Detail/Detail';
import Main from './components/Main/Main';
import { Grid } from '@mui/material'
import useStyles from './style'
import { Link } from 'react-router-dom';
const Profile = () => {
    const classes= useStyles();
  return (
    <div>
        <button style={{height:25,width:70,marginLeft:1430,borderRadius:10}}><Link to="/" style={{textDecoration:'none',color:'grey'}}>Logout</Link></button>
        <Grid className={classes.grid} container spacing={1} alignItems="center" justifyContent="center" style={{height:'100vh'}}>
    <Grid item xs={12} sm={4} display="flex" justifyContent="center">
      <Detail title='Income'></Detail>
    </Grid>
    <Grid item xs={12} sm={3} display="flex" justifyContent="center">
      <Main/>
    </Grid>
    <Grid item xs={13} sm={5} display="flex" justifyContent="center">
      <Detail title='Expense'></Detail>
    </Grid>
   </Grid>
    </div>
  )
}

export default Profile