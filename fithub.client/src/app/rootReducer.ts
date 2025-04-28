import { combineReducers } from '@reduxjs/toolkit';
import registerReducer from '../features/auth/register/RegisterSlice';
import workoutsReducer from '../features/workouts/workoutsSlice';

const rootReducer = combineReducers({
  register: registerReducer,
  workouts: workoutsReducer,
});

export default rootReducer;
