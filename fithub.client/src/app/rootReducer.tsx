// src/app/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/login/LoginSlice";
import registerReducer from "../features/auth/register/RegisterSlice";
import navReducer from "../common/nav/NavSlice";
import workoutsReducer from "../features/workouts/workoutsSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
  nav: navReducer,
  workouts: workoutsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;