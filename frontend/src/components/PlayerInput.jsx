import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const PlayerInput = () => {
  const { state, dispatch, predictXI } = useContext(AppContext);
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

  const handlePredict = () => {
    predictXI();
  };

  return (
    <div className="p-4 border rounded shadow bg-white dark:bg-gray-800 flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-2">Player Input (22 unique names)</h2>
      <textarea
        className="w-full flex-grow p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        placeholder="Enter player names, one per line"
        value={inputText}
        onChange={handleChange}
        aria-label="Player names input"
      />
      {error && <p className="text-red-600 mt-2">{error}</p>}
      <button
        onClick={handlePredict}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        disabled={state.players.length !== 22}
      >
        Predict Best XI
      </button>
    </div>
  );
};

export default PlayerInput;
