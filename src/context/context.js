import React, { useReducer, createContext } from 'react';
import contextReducer from './contextReducer';

const initialState = {
  transactions: [],  // Start with an empty transaction list
  isIncomeLocked: false,  // Locking income state
};

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(contextReducer, initialState);

  // Action creators
  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const addTransaction = (transaction) => {
    // Prevent adding income if income is locked
    if (transaction.type === 'Income' && state.isIncomeLocked) {
      return; // Prevent adding the transaction if income is locked
    }
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  };

  const lockIncome = () => {
    dispatch({ type: 'LOCK_INCOME' });
  };

  const unlockIncome = () => {
    dispatch({ type: 'UNLOCK_INCOME' });
  };

  const balance = state.transactions.reduce((acc, currVal) => (
    currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount
  ), 0);

  return (
    <ExpenseTrackerContext.Provider value={{
      deleteTransaction,
      addTransaction,
      lockIncome,
      unlockIncome,
      transactions: state.transactions,
      isIncomeLocked: state.isIncomeLocked,
      balance
    }}>
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
