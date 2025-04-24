import { combineReducers } from '@reduxjs/toolkit';
import registerReducer from '../features/auth/register/RegisterSlice';

const rootReducer = combineReducers({
  register: registerReducer,
});

export default rootReducer;
