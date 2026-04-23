import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditProduct.css";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    product_name: "",
    batch_number: "",
    manufacture_date: "",
    expiry_date: "",
    origin: "",
    ingredients: ""
  });

  // 🔥 Fetch product data
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/product/${id}`)
      .then(res => res.json())
      .then(data => setForm(data))
      .catch(err => console.error(err));
  }, [id]);

  // Handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://127.0.0.1:8000/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    console.log("API response:", data);

    if (!res.ok) {
      alert(data.detail);
      return;
    }

    // ✅ save updated AI result
    localStorage.setItem("analysisResult", JSON.stringify({
      status: data.status,
      safe: data.safe,
      hazardous: data.hazardous,
      allergens: data.allergens,
      explanation: data.explanation
    }));

    navigate("/dashboard/ai-analysis");

    // alert(data.message);
    // navigate("/dashboard/products");
  };

  // return (
  //   <div className="page">
  //     <h2>Edit Product</h2>

  //     <form onSubmit={handleSubmit} className="editForm">

  //       <input
  //         name="product_name"
  //         value={form.product_name}
  //         onChange={handleChange}
  //         placeholder="Product Name"
  //         required
  //       />

  //       <input
  //         name="batch_number"
  //         value={form.batch_number}
  //         onChange={handleChange}
  //         placeholder="Batch Number"
  //         required
  //       />

  //       <input
  //         type="date"
  //         name="manufacture_date"
  //         value={form.manufacture_date}
  //         onChange={handleChange}
  //       />

  //       <input
  //         type="date"
  //         name="expiry_date"
  //         value={form.expiry_date}
  //         onChange={handleChange}
  //       />

  //       <input
  //         name="origin"
  //         value={form.origin}
  //         onChange={handleChange}
  //         placeholder="Origin"
  //       />

  //       <textarea
  //         name="ingredients"
  //         value={form.ingredients}
  //         onChange={handleChange}
  //         placeholder="Ingredients"
  //       />

  //       <div className="btnGroup">
  //         <button type="button" onClick={() => navigate("/dashboard/products")}>
  //           Cancel
  //         </button>

  //         <button type="submit">Update</button>
  //       </div>

  //     </form>
  //   </div>
  // );
  return (
  <div className="page">
    <div className="card">

      <h2 className="title">Edit Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="product_name"
          value={form.product_name || ""}
          onChange={handleChange}
          placeholder="Product Name"
          className="input"
          required
        />

        <input
          name="batch_number"
          value={form.batch_number || ""}
          onChange={handleChange}
          placeholder="Batch Number"
          className="input"
          required
        />

        <input
          type="date"
          name="manufacture_date"
          value={form.manufacture_date || ""}
          onChange={handleChange}
          className="input"
        />

        <input
          type="date"
          name="expiry_date"
          value={form.expiry_date || ""}
          onChange={handleChange}
          className="input"
        />

        <input
          name="origin"
          value={form.origin || ""}
          onChange={handleChange}
          placeholder="Origin"
          className="input"
        />

        <textarea
          name="ingredients"
          value={form.ingredients || ""}
          onChange={handleChange}
          placeholder="Ingredients"
          className="input"
        />

        <div className="btnGroup">
          <button
            type="button"
            className="btn secondary"
            onClick={() => navigate("/dashboard/products")}
          >
            Cancel
          </button>

          <button type="submit" className="btn">
            Update
          </button>
        </div>

      </form>
    </div>
  </div>
);
}