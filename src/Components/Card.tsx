import React from "react";
import { Card } from "../Types";

type Props = {
	Card: Card;
};

const CardComponent = ({ Card }: Props) => {
	console.log("Creating Card: ", Card.name);

	return (
		<div className="card">
			<div className="front">
				<img
					className="card_picture"
					src="https://www.seeklogo.net/wp-content/uploads/2011/06/facebook-icon-logo-vector.png"
				/>
				<p className="card_name">{Card.name}</p>
				<table className="card_table">
					<tr>
						<td className="left-align">Attempts:</td>
						<td>{Card.attempt_tries}</td>
					</tr>
					<tr>
						<td className="left-align">Records:</td>
						<td>{Card.record}</td>
						<tr>
							<td className="left-align">Coolness Factor:</td>
							<td>7</td>
						</tr>
					</tr>
				</table>
			</div>
			<div className="back">Back</div>
		</div>
	);
};

export default CardComponent;
