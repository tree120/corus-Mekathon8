import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import UploadProduct from "./components/UploadProduct";
import AIAnalysis from "./components/AIAnalysis";
import QRCodes from "./components/QRCodes";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>

          <Route path="upload-product" element={<UploadProduct />} />
          <Route path="ai-analysis" element={<AIAnalysis />} />
          <Route path="qr-codes" element={<QRCodes />} />

        </Route>
        {/*<Route path="/dashboard" element={<Dashboard />}/>
         <Route path="/upload-product" element={<UploadProduct />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
