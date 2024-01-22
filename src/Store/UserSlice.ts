import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./Store";
import { UserState } from "../Types";

const initialState: UserState = {
	userName: "",
};

export const UserSlice = createSlice({
	name: "UserName",
	initialState,
	reducers: {
		setUserName: (state, action: PayloadAction<string>) => {
			state.userName = action.payload;
		},
	},
});

export const { setUserName } = UserSlice.actions;
export const getUserName = (state: RootState) => state.userName;
export default UserSlice.reducer;
