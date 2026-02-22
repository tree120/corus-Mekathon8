import { useLocation, useNavigate } from "react-router-dom";
import "./AIAnalysis.css";

function AIAnalysis() {
  const location = useLocation();
  const navigate = useNavigate();

  const analysisResult = JSON.parse(localStorage.getItem("analysisResult"));

  if (!analysisResult) {
    return <h3>No analysis data found</h3>;
  }

  return (
    <div className="analysis-page">
      <h2>AI Ingredient Analysis</h2>

      <p><b>Status:</b> {analysisResult.status}</p>
      <p><b>Safe:</b> {analysisResult.safe?.join(", ")}</p>
      <p><b>Hazardous:</b> {analysisResult.hazardous?.join(", ")}</p>
      <p><b>Allergens:</b> {analysisResult.allergens?.join(", ")}</p>
      <p><b>Explanation:</b> {analysisResult.explanation}</p>

      <button
        className="auth-btn"
        onClick={() =>
          navigate("/dashboard/upload-product", {
            state: {
              productData: location.state?.productData,
              analysisResult: analysisResult
            }
          })
        }
      >
        Back
      </button>
    </div>
  );
}

export default AIAnalysis;

