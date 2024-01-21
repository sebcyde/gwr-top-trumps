import { CreateDeck, ShuffleCards } from "./Functions/CardFunctions";
import CardBack from "./assets/top_trumps_logo.png";
import { useEffect, useState } from "react";
import { Player, Card } from "./Types";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { CompareCards } from "./Functions/GameFunctions";

function App() {
  const [DealingCards, setDealingCards] = useState<boolean>(true);
  const [Computer, setComputer] = useState<Player>();
  const [Player, setPlayer] = useState<Player>();
  const [Turn, setTurn] = useState(true);
  const navigate = useNavigate();

  // Initialise Game
  useEffect(() => {
    const Deck: Card[][] = CreateDeck();
    setComputer(Deck[0]);
    setPlayer(Deck[1]);
    setDealingCards(false);
  }, []);

  // Value Selection Functionality
  const SelectMetric = (Metric: keyof Card) => {
    let Result = CompareCards(Player![0], Computer![0], Metric);

    switch (Result) {
      case "p":
        PlayerWinRound();
        break;
      case "c":
        PlayerLoseRound();
        break;
      default:
        PlayerDrawRound();
    }
  };

  const TriggerGameWin = (Result: boolean) => {
    console.log(Result ? "YOU WIN" : "YOU LOSE");
    setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  const PlayerDrawRound = () => {
    setDealingCards(true);
    if (Computer) setComputer(ShuffleCards(Computer));
    if (Player) setPlayer(ShuffleCards(Player));
    setDealingCards(false);
  };

  const PlayerWinRound = () => {
    if (Computer!.length === 1) TriggerGameWin(true);
    setDealingCards(true);

    const WonCard: Card = Computer![0];
    console.log("Won Card:", WonCard);

    setComputer(Computer!.slice(1));
    setPlayer([...Player!.slice(1), WonCard]);
    setDealingCards(false);
  };

  const PlayerLoseRound = () => {
    if (Player!.length === 1) TriggerGameWin(false);

    const WonCard: Card = Player![0];
    console.log("Won Card:", WonCard);

    setDealingCards(true);
    setPlayer(Player!.slice(1));
    setComputer([...Computer!.slice(1), WonCard]);
    setDealingCards(false);
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
                  <div className="Card">
                    <div className="ClassInfo">
                      <h3>{C.name}</h3>
                      <h4>
                        {C.category} / {C.country}
                      </h4>
                    </div>

                    <p
                      onClick={() => SelectMetric("attempt_tries")}
                      className="Metric"
                    >
                      attempt_tries: {C.attempt_tries}
                    </p>
                    <p
                      onClick={() => SelectMetric("record")}
                      className="Metric"
                    >
                      record: {C.record}
                    </p>
                    <p
                      onClick={() => SelectMetric("times_broken")}
                      className="Metric"
                    >
                      times_broken: {C.times_broken}
                    </p>
                    <p onClick={() => SelectMetric("year")} className="Metric">
                      year: {C.year}
                    </p>
                  </div>
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
