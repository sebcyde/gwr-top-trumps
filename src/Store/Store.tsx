import { AttributeSlice } from "./AttributeSlice";
import { configureStore } from "@reduxjs/toolkit";
import { GameRecordSlice } from "./GameSlice";
import { UserSlice } from "./UserSlice";

export const store = configureStore({
	reducer: {
		gameRecord: GameRecordSlice.reducer,
		userName: UserSlice.reducer,
		chosenAttribute: AttributeSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
