import React, { useState, useContext } from 'react';
import { TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ExpenseTrackerContext } from '../../../context/context';
import { v4 as uuidv4 } from 'uuid';
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import formatDate from '../../../utils/formatDate';
import { auth, db } from '../../Firebase';
import { doc, setDoc } from 'firebase/firestore';
import useStyles from './style';

const initialState = {
  amount: '',
  category: '',
  type: 'Income',
  date: formatDate(new Date()),
};

const Form = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const { addTransaction } = useContext(ExpenseTrackerContext);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const createTransaction = async () => {
    const transaction = { ...formData, amount: Number(formData.amount), id: uuidv4() };
    const user = auth.currentUser;

    if (!user || !user.uid) {
      console.warn("No user UID found");
      return;
    }

    try {
      // Create a reference to the specific transaction document within the user's transactions subcollection
      const transactionRef = doc(db, "Users", user.uid, "transactions", transaction.id);
      
      // Save the transaction
      await setDoc(transactionRef, transaction);
      addTransaction(transaction);
      setFormData(initialState);
      console.log("Transaction added to user's transactions subcollection successfully!");

      // Redirect to Monthly Chart after transaction is created
      navigate('/monthly'); // Use navigate instead of history.push

    } catch (error) {
      console.error("Error adding transaction: ", error);
    }
  };

  const selectedCategories = formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {/* You can add a title or instruction here if needed */}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            {selectedCategories.map((c) => (
              <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          fullWidth
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="date"
          label="Date"
          fullWidth
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })}
        />
      </Grid>

      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        style={{ marginTop: 20, marginLeft: 10 }}
        fullWidth
        onClick={createTransaction}
      >
        Create
      </Button>
    </Grid>
  );
};

export default Form;
