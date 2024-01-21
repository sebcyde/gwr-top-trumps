export type Card = {
    name: string,
    category: string,
    record: number,
    year:number,
    country: string,
    attempt_tries: number,
    times_broken: number,
    image_url: string,
}

export type Player = {
    username: string,
    cards: Card[],
}

