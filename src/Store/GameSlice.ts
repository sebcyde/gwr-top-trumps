import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./Store";
import { GameRecordState } from "../Types";

const initialState: GameRecordState = {
	GamesPlayed: 0,
	GamesLost: 0,
	GamesWon: 0,
};

export const GameRecordSlice = createSlice({
	name: "GameRecord",
	initialState,
	reducers: {
		setGameRecords: (state, action: PayloadAction<GameRecordState>) => {
			state.GamesPlayed = action.payload.GamesPlayed;
			state.GamesLost = action.payload.GamesLost;
			state.GamesWon = action.payload.GamesWon;
		},
	},
});

export const { setGameRecords } = GameRecordSlice.actions;
export const getGameRecords = (state: RootState) => state;
export default GameRecordSlice.reducer;
