import React from "react";
import "./DashboardHome.css";

export default function DashboardHome() {
  return (
    <div className="dashboardPage">

      <h1 className="mainTitle">Food Safety & AI Transparency System</h1>

      <div className="section">

        <h2>🍽 Why Food Safety is Important</h2>

        <div className="cardGrid">
          <div className="infoCard">
            <h3>Health Protection</h3>
            <p>
              Unsafe food can cause serious diseases, infections, and long-term health issues.
            </p>
          </div>

          <div className="infoCard">
            <h3>Consumer Trust</h3>
            <p>
              Verified and certified food builds confidence among customers.
            </p>
          </div>

          <div className="infoCard">
            <h3>Fraud Prevention</h3>
            <p>
              Fake or low-quality products can be detected through proper verification systems.
            </p>
          </div>

          <div className="infoCard">
            <h3>Regulatory Compliance</h3>
            <p>
              Ensures companies follow standards like FSSAI, ISO, and NPOP.
            </p>
          </div>
        </div>
      </div>

      <div className="section">

        <h2>🤖 How AI Helps in Food Safety</h2>

        <div className="cardGrid">
          <div className="infoCard">
            <h3>Fake Product Detection</h3>
            <p>
              AI can analyze product data and detect inconsistencies in supply chain.
            </p>
          </div>

          <div className="infoCard">
            <h3>Smart Verification</h3>
            <p>
              AI checks whether certification data matches real-world standards.
            </p>
          </div>

          <div className="infoCard">
            <h3>QR-based Tracking</h3>
            <p>
              Consumers can scan QR codes to verify product authenticity instantly.
            </p>
          </div>

          <div className="infoCard">
            <h3>Risk Prediction</h3>
            <p>
              AI predicts unsafe products based on historical data and patterns.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}