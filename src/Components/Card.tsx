import { useDispatch } from "react-redux";
import Logo from "../assets/top_trumps_logo.png";
import { setAttribute } from "../Store/AttributeSlice";
import { Card } from "../Types";

type Props = {
	PlayerTurn: boolean;
	Card: Card;
};

const CardComponent = ({ PlayerTurn, Card }: Props) => {
	const dispatch = useDispatch();

	// Set the selected attribute in the global store
	const SetSelectedAttribute = (attribute: keyof Card) => {
		if (PlayerTurn) dispatch(setAttribute(attribute));
	};

	return (
		<div className="card">
			<div className="front">
				<p className="card_name">{Card.name}</p>
				<p className="card_country">{Card.country}</p>

				<img className="card_picture" src={Card.image_url} />

				<div className="CardInformationContainer">
					<span
						className="CardInformationRow"
						onClick={() => {
							SetSelectedAttribute("record");
						}}
					>
						<p>Record: </p>
						<p>{Card.record}</p>
					</span>
					<span
						className="CardInformationRow"
						onClick={() => {
							SetSelectedAttribute("attempt_tries");
						}}
					>
						<p>Attempts:</p>
						<p>{Card.attempt_tries}</p>
					</span>
					<span
						className="CardInformationRow"
						onClick={() => {
							SetSelectedAttribute("times_broken");
						}}
					>
						<p>Times Broken: </p>
						<p>{Card.times_broken}</p>
					</span>
					<span
						className="CardInformationRow"
						onClick={() => {
							SetSelectedAttribute("year");
						}}
					>
						<p>Year:</p>
						<p>{Card.year}</p>
					</span>
				</div>
			</div>
			<div className="back">
				<img src={Logo} />
			</div>
		</div>
	);
};

export default CardComponent;
