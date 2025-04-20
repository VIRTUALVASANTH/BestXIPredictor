import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const PlayerInput = () => {
  const { state, dispatch } = useContext(AppContext);
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState(null);

  const validatePlayers = (players) => {
    const uniquePlayers = Array.from(new Set(players));
    if (uniquePlayers.length !== 22) {
      setError("Please enter exactly 22 unique player names.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
    const players = e.target.value
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
    if (validatePlayers(players)) {
      dispatch({ type: "SET_PLAYERS", payload: players });
    } else {
      dispatch({ type: "SET_PLAYERS", payload: [] });
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-2">Player Input (22 unique names)</h2>
      <textarea
        className="w-full h-48 p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        placeholder="Enter player names, one per line"
        value={inputText}
        onChange={handleChange}
        aria-label="Player names input"
      />
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default PlayerInput;
