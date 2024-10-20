const contextReducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload)
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case 'LOCK_INCOME':
      return {
        ...state,
        isIncomeLocked: true,
      };
    case 'UNLOCK_INCOME':
      return {
        ...state,
        isIncomeLocked: false,
      };
    default:
      return state;
  }
};

export default contextReducer;
