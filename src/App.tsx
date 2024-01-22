import { CreateDeck } from "./Functions/CardFunctions";
import { CompareCards } from "./Functions/GameFunctions";
import CardBack from "./assets/top_trumps_logo.png";
import { useNavigate } from "react-router-dom";
import CardComponent from "./Components/Card";
import { useEffect, useState } from "react";
import { Player, Card } from "./Types";
import "./App.css";

function App() {
	const [DealingCards, setDealingCards] = useState<boolean>(true);
	const [Computer, setComputer] = useState<Player>();
	const [Player, setPlayer] = useState<Player>();
	const [Side, setSide] = useState<Player>();
	const [Turn, setTurn] = useState(true);
	const navigate = useNavigate();

	// Initialise Game
	useEffect(() => {
		const Deck: Card[][] = CreateDeck();
		setComputer(Deck[0]);
		setPlayer(Deck[1]);
		setDealingCards(false);
	}, []);

	// End game scenario
	const TriggerGameWin = (Result: boolean) => {
		console.log(Result ? "YOU WIN" : "YOU LOSE");
		setTimeout(() => {
			navigate("/");
		}, 5000);
	};

	// Round Play Functionality
	const SelectMetric = (Metric: keyof Card) => {
		// Get Current Playing Cards
		const ComputerCard: Card = Computer![0];
		const PlayerCard: Card = Player![0];

		// Compare them based on chosen metric
		let Result = CompareCards(ComputerCard, PlayerCard, Metric);

		// Remove played cards from each hand
		setComputer(Computer!.slice(1));
		setPlayer(Player!.slice(1));

		// Add cards to winning hand
		if (Result == "c") setComputer([...Computer!, PlayerCard, ComputerCard]);
		if (Result == "p") setPlayer([...Player!, ComputerCard, PlayerCard]);

		// In a draw, set cards to the side for next round
		if (Result == "d") setSide([...Side!, ComputerCard, PlayerCard]);

		// Check game status
		if (Computer!.length === 0) TriggerGameWin(true);
		if (Player!.length === 0) TriggerGameWin(false);
	};

	return (
		<div className="MainScreen">
			{DealingCards ? (
				<div className="DealingScreen">
					<h2>Dealing Cards...</h2>
				</div>
			) : (
				<div className="GameBoard">
					<div className="ComputerSide">
						<div className="Card_Back Card">
							<img src={CardBack} />
						</div>
						<div className="ComputerStats">
							<h2>Computer Hand</h2>
							<h3>Cards Remaining: {Computer!.length}</h3>
						</div>
					</div>

					<div className="SelectedCardsContainer">
						<div className="ComputerCardSlot"></div>
						<div className="PlayerCardSlot"></div>
					</div>

					<div className="PlayerSide">
						<div className="Cards">
							{Player!.map((C: Card) => {
								return (
									<CardComponent Card={C} />

									// <div className="Card">
									// 	<div className="ClassInfo">
									// 		<h3>{C.name}</h3>
									// 		<h4>
									// 			{C.category} / {C.country}
									// 		</h4>
									// 	</div>

									// 	<p
									// 		onClick={() => SelectMetric("attempt_tries")}
									// 		className="Metric"
									// 	>
									// 		attempt_tries: {C.attempt_tries}
									// 	</p>
									// 	<p
									// 		onClick={() => SelectMetric("record")}
									// 		className="Metric"
									// 	>
									// 		record: {C.record}
									// 	</p>
									// 	<p
									// 		onClick={() => SelectMetric("times_broken")}
									// 		className="Metric"
									// 	>
									// 		times_broken: {C.times_broken}
									// 	</p>
									// 	<p onClick={() => SelectMetric("year")} className="Metric">
									// 		year: {C.year}
									// 	</p>
									// </div>
								);
							})}
						</div>

						<div className="UserStats">
							<h2>Your Hand</h2>
							<h3>Cards Remaining: {Player!.length}</h3>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
