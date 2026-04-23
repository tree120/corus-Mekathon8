import React, { useState } from "react";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import "./Register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
    companyName: "",
    location: "",
    description: "",
    popular_products: "",
    usp: "",
    certificationText: "",
    email: "",
    password: "",
    companyImage: null,
     fssai: null,
    npop: null,
    iso: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm({ ...form, [name]: files[0] });
  };

  // const handleSubmit = (e) => {

  //   e.preventDefault();
  //   if (!form.fssai && !form.npop && !form.iso) {
  //     alert("Please upload at least one certificate");
  //     return;
  //   }
    
  //   console.log(form);
  //   alert("Company Registered Successfully");
  //   navigate("/login");
  // };
  //  const handleCancel = () => {
  //   navigate("/");
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form) {
    console.log("Form is undefined");
    return;
  }

  if (!form.fssai && !form.npop && !form.iso) {
    alert("Please upload at least one certificate");
    return;
  }

  try {
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    });

    const res = await fetch("http://127.0.0.1:8000/register-company", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);

    navigate("/login");
  } catch (err) {
    console.error(err);
  }
  };
  const handleCancel = () => {
  navigate("/");
};
  return (
    <div className="page">
      <div className="card">
        <h2 className="title">Register Company</h2>

        <form onSubmit={handleSubmit}>
          {/* Company Name + Image */}
          <div className="row">
            <input
              name="companyName"
              placeholder="Company Name"
              onChange={handleChange}
              className="input"
            />

            <div className="imageUpload small">
              <label className="uploadCircle">
                <AddAPhotoIcon />
                <input type="file" name="companyImage" onChange={handleFileChange} hidden />
              </label>
            </div>
          </div>

          <input name="location" placeholder="Location" onChange={handleChange} className="input" />

          <textarea name="description" placeholder="Description" onChange={handleChange} className="input" />

          <input name="popular_products" placeholder="Popular Products" onChange={handleChange} className="input" />

          <input name="usp" placeholder="USP" onChange={handleChange} className="input" />
          
           <div className="certTable ">
            <h3 className="certTitle">Certification & Compliance</h3>
            <table>
              <thead>
                <tr>
                  <th>Certificate Type</th>
                  <th>Upload File (PDF/Image)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><label>FSSAI Certificate</label></td>
                  <td>
                    <input type="file" name="fssai" onChange={handleFileChange} />
                  </td>
                </tr>
                <tr>
                  <td><label>NPOP Certificate</label></td>
                  <td>
                    <input type="file" name="npop" onChange={handleFileChange} />
                  </td>
                </tr>
                <tr>
                  <td><label>ISO Certificate</label></td>
                  <td>
                    <input type="file" name="iso" onChange={handleFileChange} />
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="note">* At least one certificate is required</p>
          </div>
          

          <input name="email" placeholder="Email" onChange={handleChange} className="input" />

          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input" />

         <div className="btnGroup">
          <button type="button" className="btn secondary" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="btn">Save</button>
        </div>
        </form>
      </div>
    </div>
  );
}
