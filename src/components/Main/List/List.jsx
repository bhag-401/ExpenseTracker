import Delete from '@mui/icons-material/Delete';
import MoneyOff from '@mui/icons-material/MoneyOff';
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, List as MUIList, Slide } from '@mui/material';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { collection, getDocs ,deleteDoc,doc } from 'firebase/firestore';
import React, { useContext, useEffect } from 'react';
import { ExpenseTrackerContext } from '../../../context/context';
import { auth,db } from '../../Firebase';
import useStyles from './style';

const List = () => {
  const classes = useStyles();
  const {deleteTransaction,transactions,addTransaction} = useContext(ExpenseTrackerContext);

  useEffect(()=>{
    getUserTransactions(localStorage.getItem("uid"))
  },[localStorage.getItem("uid")])

  async function getUserTransactions(userId) {
    try {
      console.log(userId)
      const transactionsRef = collection(db, "Users", userId, "transactions");
      
      const querySnapshot = await getDocs(transactionsRef);
       querySnapshot.docs.forEach(doc => addTransaction({ id: doc.id, ...doc.data() }));
      
    } catch (error) {
      console.error("Error retrieving transactions: ", error);
    }
  }
  

  async function handleDelete(transactionId) {
    const userId = localStorage.getItem("uid");
    console.log(transactionId)
    if (!userId) {
      console.error("User ID is undefined. Please check if the user is logged in.");
      return;
    }

    try {
      const transactionRef = doc(db, "Users", userId, "transactions", transactionId);
      await deleteDoc(transactionRef);

      // Remove the transaction from context or local state
      deleteTransaction(transactionId);
      console.log("Transaction deleted successfully!");
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  
  }


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
                <IconButton edge="end" aria-label="delete" onClick={()=>handleDelete(transaction.id)}>
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

