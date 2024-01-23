import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Card } from "../Types";
import { RootState } from "./Store";

const initialState: string = "";

export const AttributeSlice = createSlice({
	name: "ChosenAttribute",
	initialState,
	reducers: {
		setAttribute: (state, action: PayloadAction<keyof Card | string>) => {
			return action.payload;
		},
	},
});

export const { setAttribute } = AttributeSlice.actions;
export const getAttribute = (state: RootState) => state.chosenAttribute;
export default AttributeSlice.reducer;
