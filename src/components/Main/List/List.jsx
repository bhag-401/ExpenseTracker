import React ,{useContext} from 'react'
import {List as MUIList,ListItem,ListItemAvatar,ListItemText,Avatar,IconButton,Slide} from '@mui/material'
import Delete from '@mui/icons-material/Delete';
import MoneyOff from '@mui/icons-material/MoneyOff';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import useStyles from './style'
import {ExpenseTrackerContext} from '../../../context/context'

const List = () => {
  const classes = useStyles();
  const {deleteTransaction,transactions} = useContext(ExpenseTrackerContext);

  // console.log(globalState,'111');

  // const transaction= [
  //   {id:1, type:'Income',category:'Salary',amount:50,date:'Aug 31 2024'},
  //   {id:2, type:'Income',category:'Salary',amount:50,date:'Aug 31 2024'} ,
  //   {id:3, type:'Income',category:'Salary',amount:50,date:'Aug 31 2024'}  
  // ]



  return (
    <MUIList dense={false} className={classes.list}>
      {
        transactions.map((transaction)=>(
          <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={transaction.type==="Income"?classes.avatarIncome:classes.avatarExpense}>
                 <MoneyOff/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={transaction.category} secondary={`$${transaction.amount} - ${transaction.date}`}/>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={()=>deleteTransaction(transaction.id)}>
                   <Delete/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Slide>
        ))
      }
      
    </MUIList>
  )
}

export default List

