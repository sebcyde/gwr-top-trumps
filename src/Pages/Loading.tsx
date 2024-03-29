import BarLoader from "react-spinners/BarLoader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Loading = () => {
	const navigate = useNavigate();

	useEffect(() => {
		// Navigation - Simulating loading of game data etc
		const NavigateToGame = setTimeout(
			() => navigate("/gwr-top-trumps/top-trumps"),
			2000
		);

		// Clear timeouts to prevent memory leaks
		return () => {
			clearTimeout(NavigateToGame);
		};
	}, []);

	return (
		<div className="LoadingContainer">
			<BarLoader
				color={"#023e8a"}
				width={150}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	);
};

export default Loading;
