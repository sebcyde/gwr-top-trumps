import { Card, Player } from "../Types";

const StartGame = () => {
  const Players: Player[] = [];
};

export const CompareCards = (
  PlayerCard: Card,
  ComputerCard: Card,
  metric: keyof Card
): string => {
  // "P" => Player Win
  // "C" = Computer Win
  // "D" = Draw

  // DEBUG
  console.log("ComputerCard[metric]:", ComputerCard[metric]);
  console.log("PlayerCard[metric]:", PlayerCard[metric]);

  // Edge Cases - Unknown trumps all values
  if (ComputerCard[metric] === "unknown") return "c";
  if (PlayerCard[metric] === "unknown") return "p";

  switch (metric) {
    case "year":
      // Lower is better
      return +PlayerCard[metric] < +ComputerCard[metric] ? "p" : "c";
    case "attempt_tries":
      // Lower is better
      return PlayerCard[metric] < ComputerCard[metric] ? "p" : "c";
    case "times_broken":
      // Lower is better
      return PlayerCard[metric] < ComputerCard[metric] ? "p" : "c";
    case "record":
      // Higher is better
      return PlayerCard[metric] > ComputerCard[metric] ? "p" : "c";
    default:
      console.log("ERROR: ", metric, ComputerCard[metric], PlayerCard[metric]);
      return "d";
  }
};

export const ComputerTurn = (
  CurrentComputerCard: Card,
  CurrentPlayerCard: Card
) => {
  // Choose a metric = TODO

  // Run Comparisons
  const Res = CompareCards(
    CurrentPlayerCard,
    CurrentComputerCard,
    "attempt_tries"
  );
  return Res;
};
