import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";   // ✅ reuse same styling

export default function EditProfile() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [form, setForm] = useState({
    companyName: "",
    location: "",
    description: "",
    popular_products: "",   // ✅ updated field
    usp: "",
    companyImage: null
  });

  // 🔥 Fetch existing user data
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          companyName: data.company_name || "",
          location: data.location || "",
          description: data.description || "",
          popular_products: data.products || "",  // map backend → frontend
          usp: data.usp || "",
          companyImage: null
        });
      })
      .catch(err => console.error(err));
  }, [userId]);

  // Handle text change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image change
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm({ ...form, [name]: files[0] });
  };

  // 🔥 Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (form[key] !== null) {
          formData.append(key, form[key]);
        }
      });

      const res = await fetch(`http://127.0.0.1:8000/user/${userId}`, {
        method: "PUT",
        body: formData
      });

      const data = await res.json();

      alert(data.message);
      navigate("/dashboard/profile");

    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/profile");
  };

  return (
    <div className="page">
      <div className="card">

        <h2 className="title">Edit Profile</h2>

        <form onSubmit={handleSubmit}>

          {/* Company Name + Image */}
          <div className="row">
            <input
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              className="input"
            />

            <div className="imageUpload small">
              <label className="uploadCircle">
                Upload
                <input
                  type="file"
                  name="companyImage"
                  onChange={handleFileChange}
                  hidden
                />
              </label>
            </div>
          </div>

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="input"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="input"
          />

          <input
            name="popular_products"
            value={form.popular_products}
            onChange={handleChange}
            placeholder="Popular Products"
            className="input"
          />

          <input
            name="usp"
            value={form.usp}
            onChange={handleChange}
            placeholder="USP"
            className="input"
          />

          <div className="btnGroup">
            <button
              type="button"
              className="btn secondary"
              onClick={handleCancel}
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