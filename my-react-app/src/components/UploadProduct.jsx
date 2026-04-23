import { useState } from "react";
import "./UploadProduct.css";

function UploadProduct() {

  // Form states
  const [productName, setProductName] = useState("");
  //const [companyName, setCompanyName] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [manufactureDate, setManufactureDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [origin, setOrigin] = useState("");
  const [ingredients, setIngredients] = useState("");

  // Result states
  const [analysisResult, setAnalysisResult] = useState(null);
  const [qrCode, setQrCode] = useState("");

  // 🔍 Analyze
  // const handleAnalyze = async () => {
  //   try {
  //     const res = await fetch("http://127.0.0.1:8000/analyze", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ ingredients })
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       setAnalysisResult(data);
  //     } else {
  //       alert("Analysis failed");
  //     }

  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // 🚀 Upload
  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
     try {
      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ingredients })
      });

      const data = await res.json();

      if (res.ok) {
        setAnalysisResult(data);
        localStorage.setItem("analysisResult", JSON.stringify(data));

      } else {
        alert("Analysis failed");
      }

    } catch (err) {
      console.error(err);
    }
    try {
      const res = await fetch("http://127.0.0.1:8000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product_name: productName,
          //company_name: companyName,
          batch_number: batchNumber,
          manufacture_date: manufactureDate,
          expiry_date: expiryDate,
          origin,
          ingredients,
          user_id: parseInt(userId) 
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Product saved successfully");

        setQrCode("http://127.0.0.1:8000" + data.qr_code);
        setAnalysisResult(data.analysis);

      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="upload-container">

      <div className="top-section">

        {/* 🟦 LEFT: FORM */}
        <div className="form-card">
          <h3>Product Details</h3>

          <input placeholder="Product Name" value={productName}
            onChange={(e) => setProductName(e.target.value)} />

          

          <input placeholder="Batch Number" value={batchNumber}
            onChange={(e) => setBatchNumber(e.target.value)} />

          <input type="date" value={manufactureDate}
            onChange={(e) => setManufactureDate(e.target.value)} />

          <input type="date" value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)} />

          <input placeholder="Origin" value={origin}
            onChange={(e) => setOrigin(e.target.value)} />

          <textarea placeholder="Ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)} />

          {/* <div className="btn-group">
            <button className="analyze-btn" onClick={handleAnalyze}>
              Analyze
            </button> */}

            <button className="upload-btn" onClick={handleSubmit}>
              Upload
            </button>
          </div>
        </div>

        {/* 🟨 MIDDLE: AI RESULT */}
        <div className="analysis-box">
          <h3>AI Analysis</h3>

          {analysisResult ? (
            <>
              <p>
                Status:
                <span className={
                  analysisResult.status === "safe" ? "safe" : "hazard"
                }>
                  {analysisResult.status}
                </span>
              </p>

              <p>
                Hazardous: {analysisResult.hazardous?.join(", ") || "None"}
              </p>

              <p>
                Allergens: {analysisResult.allergens?.join(", ") || "None"}
              </p>

              <p>{analysisResult.explanation}</p>
            </>
          ) : (
            <p>No analysis yet</p>
          )}
        </div>

        {/* 🟩 RIGHT: QR */}
        <div className="qr-box">
          <h3>QR Code</h3>

          {qrCode ? (
            <img src={qrCode} alt="QR Code" />
          ) : (
            <p>No QR generated</p>
          )}
        </div>

      </div>

    // </div>
  );
}

export default UploadProduct;