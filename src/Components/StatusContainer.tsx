import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

type Props = {
	UserName: string;
	CardsRemaining: number;
};

const StatusContainer = ({ CardsRemaining, UserName }: Props) => {
	return (
		<div>
			<Card sx={{ minWidth: 275, textAlign: "center" }} className="Menu">
				<CardContent>
					<Typography sx={{ fontSize: 20, textTransform: "capitalize" }}>
						{UserName ? UserName : "Player"}s Hand
					</Typography>
					<Typography sx={{ fontSize: 14 }}>
						Cards Remaining: {CardsRemaining}
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
};

export default StatusContainer;
