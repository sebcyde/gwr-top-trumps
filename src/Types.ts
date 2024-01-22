export type Card = {
	year: number | string;
	attempt_tries: number;
	times_broken: number;
	image_url: string;
	category: string;
	country: string;
	record: number;
	name: string;
};

export type Player = Card[];

export type UserState = {
	userName: string;
};

export type GameRecordState = {
	GamesPlayed: number;
	GamesLost: number;
	GamesWon: number;
};
