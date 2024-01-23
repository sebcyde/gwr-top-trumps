import { Card } from "../Types";

export const CompareCards = (
	PlayerCard: Card,
	ComputerCard: Card,
	metric: keyof Card
): string => {
	// "P" => Player Win
	// "C" = Computer Win
	// "D" = Draw

	// Edge Cases - Unknown trumps all values, Equal values is a draw
	if (PlayerCard[metric] === ComputerCard[metric]) return "d";
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
			return "d";
	}
};

export const playComputerTurn = (): string => {
	// For simplicity, can randomly select a metric
	const Metrics = ["year", "attempt_tries", "times_broken", "record"];
	const randomMetric = Metrics[Math.floor(Math.random() * Metrics.length)];
	return randomMetric;
};
