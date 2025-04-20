import React from "react";
import { AppProvider } from "./context/AppContext";
import PlayerInput from "./components/PlayerInput";
import FactorSelector from "./components/FactorSelector";
import ResultsPanel from "./components/ResultsPanel";

const App = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <PlayerInput />
        </div>
        <div>
          <FactorSelector />
        </div>
        <div>
          <ResultsPanel />
        </div>
      </div>
    </AppProvider>
  );
};

export default App;
