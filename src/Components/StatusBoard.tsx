import React from "react";

type Props = {
	topText: string;
	bottomText: string;
};

const StatusBoard = ({ topText, bottomText }: Props) => {
	return (
		<div className="StatusBoard">
			<p>Current Turn: {topText}</p>
			<p>Last Round Result: {bottomText ? bottomText : "First Round"}</p>
		</div>
	);
};

export default StatusBoard;
