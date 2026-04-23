import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/login");
      return;
    }

    fetch(`http://127.0.0.1:8000/profile/${userId}`)
      .then(res => res.json())
      .then(data => setCompany(data))
      .catch(err => console.error(err));
  }, []);

  if (!company) return <h2>Loading...</h2>;

  return (
    <div className="profilePage">

      <button className="closeBtn" onClick={() => navigate("/dashboard")}>✕</button>

      <div className="profileContainer">

        {/* LEFT */}
        <div className="leftSection">
          <img
            src={`http://127.0.0.1:8000/${company.companyImage}`}
            alt="company"
          />
        </div>

        {/* RIGHT */}
        <div className="rightSection">
          <h1>{company.companyName}</h1>

          <div className="infoBlock">
            <h3>Description</h3>
            <p>{company.description}</p>
          </div>

          <div className="infoBlock">
            <h3>Popular Products</h3>
            <p>{company.popular_products}</p>
          </div>

          <div className="infoBlock">
            <h3>USP</h3>
            <p>{company.usp}</p>
          </div>

          <div className="infoBlock">
            <h3>Certified By</h3>
            <div className="certs">
              {company.fssai && <span>FSSAI</span>}
              {company.iso && <span>ISO</span>}
              {company.npop && <span>NPOP</span>}
            </div>
          </div>

          <button className="editBtn"onClick={() => navigate("/dashboard/edit-profile")}>Edit Profile</button>
        </div>

      </div>
    </div>
  );
}