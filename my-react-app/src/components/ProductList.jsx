import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/products/${userId}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://127.0.0.1:8000/delete-product/${id}`, {
      method: "DELETE"
    });

    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="productPage">

      {/* Header */}
      <div className="header">
        <h2>My Products ({products.length})</h2>
        <button onClick={() => navigate("/dashboard/upload-product")}>
          + New Product
        </button>
      </div>

      {/* Table */}
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Batch Number</th>
              <th>Origin</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="4">No products found</td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <td>{p.product_name}</td>
                  <td>{p.batch_number}</td>
                  <td>{p.origin}</td>

                  <td className="actions">
                     <a
    href="#"
    className="editLink"
    onClick={(e) => {
      e.preventDefault();
      navigate(`/dashboard/edit-product/${p.id}`);
    }}
  >
    Edit
  </a>

  <a
    href="#"
    className="deleteLink"
    onClick={(e) => {
      e.preventDefault();
      handleDelete(p.id);
    }}
  >
    Delete
  </a>
                      
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}