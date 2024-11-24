// src/app/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/login/LoginSlice';
import registerReducer from '../features/auth/register/RegisterSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
    // noMatchingPassword: registerReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;