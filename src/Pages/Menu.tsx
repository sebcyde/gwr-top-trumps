import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [UserName, setUserName] = useState<String>("");
  const navigate = useNavigate();

  // GAME SETUP

  const StartGame = () => {
    // Set Store UserName Reducer HERE -> UserName
    navigate("/Loading-Game");
  };

  return (
    <div className="MenuContainer">
      <h2>Welcome to Top Trumps</h2>
      <input
        value={UserName.toString()}
        onChange={(e) => {
          e.preventDefault();
          console.log("Input Value: ", e.target.value.toString());
          setUserName(e.target.value.toString());
        }}
        type="text"
        placeholder="Username..."
      />
      <button onClick={StartGame}>PLAY!</button>
    </div>
  );
};

export default Menu;
