import { createSlice } from '@reduxjs/toolkit';

const initialExpense = {expensesUpdated: ''}

const reportSlice = createSlice({
  name: 'report',
  initialState: initialExpense,
  reducers: {
    onExpensesUpdate(state, action) {
      state.expensesUpdated = action.payload;
    }
  },
});

export const reportActions = reportSlice.actions;

export default reportSlice.reducer;