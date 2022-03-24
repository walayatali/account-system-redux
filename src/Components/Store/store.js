import { configureStore } from '@reduxjs/toolkit'
import  authSliceReducer  from './auth-slice'
import  reportSliceReducer  from './report-slice'

export const store = configureStore({
  reducer: {auth: authSliceReducer, report: reportSliceReducer},
})