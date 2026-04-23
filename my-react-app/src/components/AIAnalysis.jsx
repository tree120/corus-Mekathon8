import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";   // ✅ FIX
import "./AIAnalysis.css";

function AIAnalysis() {
  const location = useLocation();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("analysisResult");
    console.log("Stored:", stored);

    if (stored) {
      setResult(JSON.parse(stored));
    }
  }, []);

  // ✅ Correct check
  if (!result) {
    return <h3>No analysis data found</h3>;
  }

  return (
    <div className="analysisPage">

      <h1 className="mainTitle">AI Ingredient Analysis</h1>

      <div className="section">
        <div className="cardGrid">

          <div className="infoCard">
            <h3>Status</h3>
            <p>{result.status}</p>
          </div>

          <div className="infoCard">
            <h3>Safe</h3>
            <p>{result.safe?.join(", ")}</p>
          </div>

          <div className="infoCard">
            <h3>Hazardous</h3>
            <p>{result.hazardous?.join(", ")}</p>
          </div>

        </div>
      </div>

      <div className="section">
        <div className="cardGrid">

          <div className="infoCard">
            <h3>Allergens</h3>
            <p>{result.allergens?.join(", ")}</p>
          </div>

          <div className="infoCard">
            <h3>Explanation</h3>
            <p>{result.explanation}</p>
          </div>

        </div>
      </div>

      {/* ✅ FIXED BUTTON */}
      <button
        className="back-btn"
        onClick={() => navigate("/dashboard/upload-product")}
      >
        Back
      </button>

    </div>
  );
}

export default AIAnalysis;