 import { useState, useEffect } from "react";
 import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./UploadProduct.css";

function UploadProduct() {
  // const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

  const savedProduct = JSON.parse(localStorage.getItem("productData"));
  const savedAnalysis = JSON.parse(localStorage.getItem("analysisResult"));

  if (savedProduct) {
    setProductName(savedProduct.productName || "");
    setCompanyName(savedProduct.companyName || "");
    setBatchNumber(savedProduct.batchNumber || "");
    setManufactureDate(savedProduct.manufactureDate || "");
    setExpiryDate(savedProduct.expiryDate || "");
    setOrigin(savedProduct.origin || "");
    setIngredients(savedProduct.ingredients || "");
  }

  if (savedAnalysis) {
    setAnalysisResult(savedAnalysis);
    setIsAnalyzed(true);
  }

}, []);

  const [productName, setProductName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [manufactureDate, setManufactureDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [origin, setOrigin] = useState("");
  const [ingredients, setIngredients] = useState("");

  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [qrGenerated, setQrGenerated] = useState(false);

  // 🟢 STEP 1: Analyze Ingredients
  const handleAnalyze = async () => {
    if (!ingredients) {
      alert("Please enter ingredients first");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ingredients })
      });

      const data = await response.json();

      if (response.ok) {
        // Save to localStorage
      localStorage.setItem("productData", JSON.stringify({
      productName,
      companyName,
      batchNumber,
      manufactureDate,
      expiryDate,
      origin,
      ingredients
      }));

  localStorage.setItem("analysisResult", JSON.stringify(data));

  navigate("/dashboard/ai-analysis");
      //   setAnalysisResult(data);
      //   setIsAnalyzed(true);
      //   alert("AI Analysis Completed");
      //   navigate("/dashboard/ai-analysis", {
      //   state: {
      //   analysisResult: data,
      //   productData: {
      //   productName,
      //   companyName,
      //   batchNumber,
      //   manufactureDate,
      //   expiryDate,
      //   origin,
      //   ingredients }}
      // });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("AI Server Error");
    }
  };

  // 🟣 STEP 2: Generate QR Code
  const handleGenerateQR = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/generate-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productName,
          companyName,
          batchNumber,
          manufactureDate,
          expiryDate,
          origin,
          ingredients,
          analysisResult
        })
      });

      const data = await response.json();

      if (response.ok) {
        setQrCode(data.qr);
        setQrGenerated(true);
        alert("QR Code Generated Successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("QR Generation Error");
    }
  };

  // 🔴 FINAL STEP: Upload Product (Only After QR)
  const handleSubmit = async () => {

  if (!analysisResult) {
    alert("Please analyze ingredients first");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product_name: productName,
        company_name: companyName,
        batch_number: batchNumber,
        manufacture_date: manufactureDate,
        expiry_date: expiryDate,
        origin,
        ingredients,
        analysis: analysisResult
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Product saved successfully");
      
      setQrCode("http://127.0.0.1:8000" + data.qr_code);

      localStorage.removeItem("productData");
      localStorage.removeItem("analysisResult");
    } else {
      alert(data.message);
    }

  } catch (error) {
    console.error(error);
    alert("Upload failed");
  }
  // new change
 
};

  return (
    <div className="upload-page">
      <h2>Upload Product Details</h2>

      <div className="form-card">

        <label>Product Name</label>
        <input type="text" value={productName}
          onChange={(e) => setProductName(e.target.value)} />

        <label>Company Name</label>
        <input type="text" value={companyName}
          onChange={(e) => setCompanyName(e.target.value)} />

        <label>Batch Number</label>
        <input type="text" value={batchNumber}
          onChange={(e) => setBatchNumber(e.target.value)} />

        <label>Manufacture Date</label>
        <input type="date" value={manufactureDate}
          onChange={(e) => setManufactureDate(e.target.value)} />

        <label>Expiry Date</label>
        <input type="date" value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)} />

        <label>Country of Origin</label>
        <input type="text" value={origin}
          onChange={(e) => setOrigin(e.target.value)} />
        
        <label>Ingredients</label>
        <textarea rows="4" value={ingredients}
          onChange={(e) => setIngredients(e.target.value)} />
        <label>Upload Shipping Log</label>
        {/* 🟢 Analyze Button */}
<button onClick={handleAnalyze}>
  Analyze Ingredients
</button>



{/* 🔴 Upload Product Button (Only after analysis) */}
<button
  onClick={handleSubmit}
  disabled={!analysisResult}
>
  Upload Product
</button>

{/* 🔵 Show QR AFTER upload */}
{qrCode && (
  <div className="qr-box">
    <h3>Generated QR Code</h3>
    <img src={qrCode} alt="QR Code" />
  </div>
)}

<button
  className="back-btn"
  onClick={() => navigate("/dashboard")}
>
  Back to Dashboard
</button>

      </div>
    </div>
  );
}

export default UploadProduct;