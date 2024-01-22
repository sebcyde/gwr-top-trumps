import { configureStore } from "@reduxjs/toolkit";
import { setGameRecords, GameRecordSlice } from "./GameSlice";
import { setUserName, UserSlice } from "./UserSlice";

export const store = configureStore({
	reducer: {
		gameRecord: GameRecordSlice.reducer,
		userName: UserSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
