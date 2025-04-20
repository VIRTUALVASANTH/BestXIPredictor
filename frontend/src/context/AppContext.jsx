import React, { createContext, useReducer } from "react";

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

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};
