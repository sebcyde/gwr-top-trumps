import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigation - Simulating loading of game data etc
    const NavigateToGame = setTimeout(() => navigate("/Top-Trumps"), 1000);

    // Clear timeouts to prevent memory leaks
    return () => {
      clearTimeout(NavigateToGame);
    };
  }, []);

  return <div className="LoadingContainer">Loading</div>;
};

export default Loading;
