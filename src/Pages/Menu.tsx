import { useDispatch, useSelector } from "react-redux";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { setUserName } from "../Store/UserSlice";
import Logo from "../assets/top_trumps_logo.png";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { RootState } from "../Store/Store";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { useState } from "react";
import React from "react";

const Menu = () => {
	const GameRecord = useSelector((state: RootState) => state.gameRecord);
	const [Name, setName] = useState<string>("");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Set Global UserName in Redux -> UserName
	const StartGame = async () => {
		dispatch(setUserName(Name));
		navigate("/loading");
	};

	return (
		<div className="MenuContainer">
			<Card sx={{ minWidth: 275 }} className="Menu">
				<CardContent>
					<div className="LogoContainer">
						<img src={Logo} />
					</div>

					<Box
						component="form"
						sx={{
							"& > :not(style)": { m: 1, width: "25ch" },
						}}
						noValidate
						autoComplete="off"
					>
						<Typography>Games Played: {GameRecord.GamesPlayed}</Typography>
						<Typography>
							Won: {GameRecord.GamesWon}, Lost: {GameRecord.GamesLost}
						</Typography>

						<TextField
							id="outlined-controlled"
							label="Enter Username..."
							value={Name}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								setName(event.target.value);
							}}
						/>
					</Box>
				</CardContent>
				<CardActions>
					<Button variant="contained" onClick={StartGame}>
						PLAY!
					</Button>
				</CardActions>
			</Card>
		</div>
	);
};

export default Menu;
