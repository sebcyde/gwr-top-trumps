import { CompareCards, playComputerTurn } from "./Functions/GameFunctions";
import ReversedCardComponent from "./Components/ReversedCard";
import StatusContainer from "./Components/StatusContainer";
import { CreateDeck } from "./Functions/CardFunctions";
import { setAttribute } from "./Store/AttributeSlice";
import StatusBoard from "./Components/StatusBoard";
import { setGameRecords } from "./Store/GameSlice";
import { useAppSelector } from "./Store/Hooks";
import { useNavigate } from "react-router-dom";
import CardComponent from "./Components/Card";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Player, Card } from "./Types";
import "./App.css";

function App() {
	const [DealingCards, setDealingCards] = useState<boolean>(true); // Whether loading state changes
	const [SideCards, setSideCards] = useState<Player | null>(null); // Extra deck in event of a draw
	const [Turn, setTurn] = useState<boolean>(true); // Deciding whos turn it is
	const [Computer, setComputer] = useState<Player>(); // Computer Hand
	const [Player, setPlayer] = useState<Player>(); // Player Hand

	// Status board content
	const [Status, setStatus] = useState<string>("Your Turn");
	const [StatusTwo, setStatusTwo] = useState<string>("");

	// Global Store Values
	const currentAttribute = useAppSelector((state) => state.chosenAttribute);
	const GameRecord = useAppSelector((state) => state.gameRecord);
	const PlayerName = useAppSelector((state) => state.userName);

	// Utils
	const [GameOver, setGameOver] = useState<boolean>(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Whenever player selects their chosen attribute
	useEffect(() => {
		if (
			typeof currentAttribute === "string" &&
			// Ensure is not default "" initial attribute
			["year", "attempt_tries", "times_broken", "record"].includes(
				currentAttribute
			)
		) {
			// Run Comparisons etc
			SelectMetric(currentAttribute as keyof Card);
			// Reset to default
			dispatch(setAttribute(""));
			// End Turn
			setTurn((prevTurn) => !prevTurn);
		}
	}, [currentAttribute]);

	// Initialise Game
	useEffect(() => {
		// Give each player a deck
		setStatus("Generating Decks");
		const Deck: Card[][] = CreateDeck();
		setComputer(Deck[0]);
		setPlayer(Deck[1]);
		setDealingCards(false);
		setStatus("Your Turn");
	}, []);

	// Control Computer's turn
	useEffect(() => {
		if (!GameOver) {
			if (!DealingCards && !Turn) {
				setStatus("Computer's Turn");
				setTimeout(() => {
					console.log("--------------");
					console.log("Computers Turn");
					const ChosenMetric = playComputerTurn();
					SelectMetric(ChosenMetric);
					console.log("--------------");
					setTurn((prevTurn) => !prevTurn);
					setStatus("Your Turn");
				}, 500);
			}
		}
	}, [Turn, DealingCards]);

	// End of game scenario
	const TriggerGameWin = (Result: boolean) => {
		// True Result = player win, false = computer win
		setGameOver(true);
		setStatus(Result ? "YOU WIN" : "YOU LOSE");
		dispatch(
			setGameRecords({
				GamesPlayed: GameRecord.GamesPlayed + 1,
				GamesLost: Result ? GameRecord.GamesLost : GameRecord.GamesLost + 1,
				GamesWon: Result ? GameRecord.GamesWon + 1 : GameRecord.GamesWon,
			})
		);

		setTimeout(() => {
			navigate("/");
		}, 2000);
	};

	// Round Play Functionality
	const SelectMetric = (Metric: keyof Card) => {
		// Get Current Playing Cards
		const ComputerCard: Card = Computer![0];
		const PlayerCard: Card = Player![0];

		// DEBUG
		console.log("Metric:", Metric);
		console.log("ComputerCard:", ComputerCard);
		console.log("PlayerCard:", PlayerCard);
		console.log("Computer Value:", ComputerCard[Metric]);
		console.log("Player Value:", PlayerCard[Metric]);

		// Compare them based on chosen metric
		let Result = CompareCards(PlayerCard, ComputerCard, Metric);

		// Remove played cards from each hand
		setComputer((prevComputer) => prevComputer!.slice(1));
		setPlayer((prevPlayer) => prevPlayer!.slice(1));

		// Add cards to winning hand
		if (SideCards && SideCards.length > 0) {
			console.log("Adding cards from side deck");

			// Add the draw cards from previous round to winners hand
			if (Result == "c")
				setComputer((prevComp) => [
					...prevComp!,
					PlayerCard,
					ComputerCard,
					...SideCards,
				]);
			setSideCards(null);

			if (Result == "p")
				setPlayer((PrevPlayer) => [
					...PrevPlayer!,
					ComputerCard,
					PlayerCard,
					...SideCards,
				]);
			setSideCards(null);
		} else {
			// Add won cards from current round to winners hand
			if (Result == "c")
				setComputer((prevComp) => [...prevComp!, PlayerCard, ComputerCard]);
			if (Result == "p")
				setPlayer((PrevPlayer) => [...PrevPlayer!, ComputerCard, PlayerCard]);
		}

		// In a draw, set cards to the side for next round
		if (Result == "d" && SideCards && SideCards.length > 0) {
			setStatus("DRAW - Adding cards to side deck");
			setSideCards([...SideCards!, ComputerCard, PlayerCard]);
		} else if (Result == "d" && !SideCards) {
			setStatus("DRAW - Adding cards to side deck");
			setSideCards([ComputerCard, PlayerCard]);
		}

		console.log("Computer!.length", Computer!.length);
		console.log("Player!.length", Player!.length);

		// Check game status
		// True Parameter = player win, false = computer win
		if (Computer!.length === 1 && Result == "p") {
			// Cpmputer out of cards
			TriggerGameWin(true);
		} else if (Player!.length === 1 && Result == "c") {
			// Player out of cards
			TriggerGameWin(false);
		} else if (Player!.length === 1 && Result == "d") {
			// Player out of cards
			TriggerGameWin(false);
		} else if (Computer!.length === 1 && Result == "d") {
			// Computer out of cards
			TriggerGameWin(true);
		}
		setStatusTwo(
			`${
				Result == "c"
					? "Computer wins round"
					: Result == "p"
					? "Player wins round"
					: "Round is a draw"
			}`
		);
	};

	return (
		<div className="MainScreen">
			{DealingCards ? (
				<div className="DealingScreen">
					<h2>Dealing Cards...</h2>
				</div>
			) : (
				<>
					<StatusBoard topText={Status} bottomText={StatusTwo} />

					<div className="GameBoard">
						<div className="ComputerSide">
							<div className="ComputerStats Menu">
								{Computer && Computer.length < 20 && Computer.length > 0 && (
									<StatusContainer
										CardsRemaining={Computer!.length}
										UserName="Computer"
									/>
								)}
							</div>

							<div className="Card_Back Card">
								<ReversedCardComponent />
							</div>
						</div>

						<div className="PlayerSide">
							<div className="UserStats">
								<StatusContainer
									CardsRemaining={Player!.length}
									UserName={PlayerName.userName}
								/>
							</div>

							<div className="Cards">
								{Player && Player.length < 20 && Player.length > 0 && (
									<CardComponent PlayerTurn={Turn} Card={Player[0]} />
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default App;
