import Data from "../../world_records_sample.json";
import { Card } from "../Types";
import axios from "axios";

// Create the initial deck with all cards
export const CreateDeck = (): Card[][] => {
	// EDGE CASE - UNLKNOWN YEAR
	Data.map((C) => {
		if (typeof C.year == "string") {
			// Unknown year - treat as joker (trumps all?)
		}
	});

	// Shuffle Cards
	const AllCards: Card[] = Data;
	const ShuffledDeck: Card[] = ShuffleCards(AllCards);
	const cardsPerPlayer = ShuffledDeck.length / 2;

	// Deal Hands
	const HandOne = ShuffledDeck.slice(0, cardsPerPlayer);
	const HandTwo = ShuffledDeck.slice(cardsPerPlayer);

	return [HandOne, HandTwo];
};

// Shuffle the Deck using the Fisher-Yates algorithm
export const ShuffleCards = (Cards: Card[]): Card[] => {
	const ShuffledCards: Card[] = [...Cards];
	for (let i = ShuffledCards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[ShuffledCards[i], ShuffledCards[j]] = [ShuffledCards[j], ShuffledCards[i]];
	}
	return ShuffledCards;
};
