// src/app/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';


const rootReducer = combineReducers({
    // TODO: Add your reducers here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;