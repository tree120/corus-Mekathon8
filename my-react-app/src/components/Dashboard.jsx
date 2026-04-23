import { useNavigate, Outlet } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="brand">Tatva</h2>
        <h3 className="brand">Dashboard</h3>
         <ul className="menu">
          <li onClick={() => navigate("/dashboard/profile")}>Profile</li>
          <li onClick={() => navigate("/dashboard/products")}>My Products</li>
          <li onClick={() => navigate("/dashboard/upload-product")}>Add Products</li>
          <li onClick={() => navigate("/dashboard/ai-analysis")}>AI Analysis</li>
          {/* <li onClick={() => navigate("/dashboard/qr-codes")}>QR Codes</li> */}
          <li onClick={handleLogout} className="logout">Logout</li>
        </ul>

      </div>

      {/* Main Area */}
      <div className="main">
        <div className="content">
          
          <Outlet />   {/* Right side content loads here */}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;