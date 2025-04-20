import React, { createContext, useReducer } from "react";
import axios from "axios";

const initialState = {
  players: [],
  factors: [],
  prediction: {
    loading: false,
    error: null,
    data: null,
  },
};

export const AppContext = createContext(initialState);

function reducer(state, action) {
  switch (action.type) {
    case "SET_PLAYERS":
      return { ...state, players: action.payload };
    case "SET_FACTORS":
      return { ...state, factors: action.payload };
    case "PREDICTION_LOADING":
      return { ...state, prediction: { loading: true, error: null, data: null } };
    case "PREDICTION_SUCCESS":
      return { ...state, prediction: { loading: false, error: null, data: action.payload } };
    case "PREDICTION_ERROR":
      return { ...state, prediction: { loading: false, error: action.payload, data: null } };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const predictXI = async () => {
    if (state.players.length !== 22) {
      dispatch({ type: "PREDICTION_ERROR", payload: "Exactly 22 unique players required." });
      return;
    }
    if (state.factors.length === 0) {
      dispatch({ type: "PREDICTION_ERROR", payload: "Please select at least one factor." });
      return;
    }
    dispatch({ type: "PREDICTION_LOADING" });
    try {
      const response = await axios.post("/api/predict-xi", {
        players: state.players,
        factors: state.factors,
      });
      dispatch({ type: "PREDICTION_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "PREDICTION_ERROR", payload: error.message || "Prediction failed." });
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch, predictXI }}>
      {children}
    </AppContext.Provider>
  );
};
