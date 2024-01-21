import { Card } from "../Types";

// Create the initial deck with all cards
const DeckContructor = (): Card[] => {
  const AllCards: Card[] = [];
  const ShuffledDeck: Card[] = ShuffleCards(AllCards);
  return ShuffledDeck;
};

// Shuffle the Deck using the Fisher-Yates algorithm
const ShuffleCards = (Cards: Card[]): Card[] => {
  const ShuffledCards: Card[] = [...Cards];
  for (let i = ShuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ShuffledCards[i], ShuffledCards[j]] = [ShuffledCards[j], ShuffledCards[i]];
  }
  return ShuffledCards;
};
