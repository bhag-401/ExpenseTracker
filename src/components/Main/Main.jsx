import React, { useContext } from 'react'
import { Card,CardHeader,CardContent,Typography,Grid,Divider } from '@mui/material'
import useStyles from "./style";
import Form from './Form/Form';
import { ExpenseTrackerContext } from '../../context/context';
import List from './List/List';
const Main = () => {
    const classes=useStyles();
    const {balance} = useContext(ExpenseTrackerContext)
  return (
    <Card className={classes.root}>
        <CardHeader title="Expense Tracker" ></CardHeader>
        <CardContent>
            <Typography align="center" varient="h5">Total Balance ₹${balance}</Typography>
            <Typography varient="subtitle1" style={{lineHeight:'1.5em',marginTop:'20px'}}>
               
            </Typography>
        <Divider/>
        <Form/>
        </CardContent>
        <CardContent className={classes.cartContent}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <List/>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
  );
}

export default Main
