import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import UploadProduct from "./components/UploadProduct";
import AIAnalysis from "./components/AIAnalysis";
import QRCodes from "./components/QRCodes";
import Register from "./components/Register";
import Profile from "./components/Profile"
import DashboardHome from "./components/DashboardHome";
import ProductList from "./components/ProductList";
import EditProduct from "./components/EditProduct";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
       
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="products" element={<ProductList />} />
          <Route path="upload-product" element={<UploadProduct />} />
          <Route path="ai-analysis" element={<AIAnalysis />} />
          <Route path="qr-codes" element={<QRCodes />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
        </Route>
        {/*<Route path="/dashboard" element={<Dashboard />}/>
         <Route path="/upload-product" element={<UploadProduct />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
