import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const factorCategories = {
  Performance: [
    { key: "recentForm", label: "Recent Form", tooltip: "Player's recent performance" },
    { key: "careerAvg", label: "Career Average", tooltip: "Player's career batting/bowling average" },
    { key: "strikeRate", label: "Strike Rate", tooltip: "Player's strike rate" },
  ],
  Pitch: [
    { key: "venueAvgScore", label: "Venue Average Score", tooltip: "Average first innings score at venue" },
    { key: "spinVsPace", label: "Spin vs Pace Success", tooltip: "Success rates of spin vs pace bowlers" },
  ],
  Opposition: [
    { key: "headToHeadAvg", label: "Head to Head Average", tooltip: "Batsman vs Bowler average" },
    { key: "deathOverEconomy", label: "Death Over Economy", tooltip: "Bowler economy in death overs" },
  ],
};

const FactorSelector = () => {
  const { state, dispatch } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleFactorChange = (e, key) => {
    let newFactors = [...state.factors];
    if (e.target.checked) {
      newFactors.push(key);
    } else {
      newFactors = newFactors.filter((f) => f !== key);
    }
    dispatch({ type: "SET_FACTORS", payload: newFactors });
  };

  const filteredCategories = Object.entries(factorCategories).reduce((acc, [category, factors]) => {
    const filteredFactors = factors.filter((f) =>
      f.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredFactors.length > 0) {
      acc[category] = filteredFactors;
    }
    return acc;
  }, {});

  return (
    <div className="p-4 border rounded shadow bg-white dark:bg-gray-800 max-h-[480px] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">Factor Selector</h2>
      <input
        type="search"
        placeholder="Search factors..."
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search factors"
      />
      {Object.entries(filteredCategories).map(([category, factors]) => (
        <div key={category} className="mb-4">
          <button
            onClick={() => toggleCategory(category)}
            className="w-full text-left font-semibold text-blue-600 dark:text-blue-400 flex justify-between items-center"
            aria-expanded={!!expandedCategories[category]}
            aria-controls={`${category}-factors`}
          >
            {category}
            <span>{expandedCategories[category] ? "-" : "+"}</span>
          </button>
          {expandedCategories[category] && (
            <ul id={`${category}-factors`} className="mt-2 pl-4">
              {factors.map(({ key, label, tooltip }) => (
                <li key={key} className="mb-1">
                  <label className="inline-flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={state.factors.includes(key)}
                      onChange={(e) => handleFactorChange(e, key)}
                      aria-describedby={`${key}-tooltip`}
                    />
                    <span>{label}</span>
                    <span
                      id={`${key}-tooltip`}
                      className="ml-1 text-xs text-gray-500 dark:text-gray-400"
                      title={tooltip}
                    >
                      <i className="fas fa-info-circle"></i>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default FactorSelector;
