import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios, { Axios } from "axios";
import BaseComponent from "bootstrap/js/dist/base-component";
import Navbar from "./Navbar";
export default function SupplierQuoteSent() {
    const [quotePrice, setQuotePrice] = useState([]);
    const [loading,setLoading] = useState(true);
     const {id}  = useParams();
    const baseUrl = process.env.REACT_APP_API_URL
    const email = localStorage.getItem("email");
    const navigate = useNavigate();
    const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
     const response = await axios.get(`baseUrl/api/supplier/quote/sent/price/${id}`, {
        headers: {
        Authorization: `Bearer ${token}`
        },
      });
    //   console.log(response.data);
      setQuotePrice(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching category data:", error);
      if (error.response?.status === 401) {
        navigate("");
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
   <Navbar />
    <div id="layoutSidenav" className="d-flex">
      <div className="bg-black text-white p-3" style={{ minWidth: '200px', minHeight: '100vh' }}>
        <ul className="nav flex-column">
          <li className="nav-item">
              <Link className="nav-link text-white" to={`/supplier/quote/${id}`}>
            <div className="sb-nav-link-icon"><i className="fas fa-file-alt"></i></div>
            Quotes from Admin
          </Link>
          <Link className="nav-link text-white" to={`/supplier/quote/sent/${id}`}>
            <div className="sb-nav-link-icon"><i className="fas fa-file-alt"></i></div>
            Quotes sent to Admin
          </Link>
          </li>
        </ul>
      </div>
      <div id="layoutSidenav_content" className="flex-grow-1 px-4 py-4">
        <main>
          <div className="container-fluid px-4">
            <div className="row py-6">
                <h3 className="text-center text-primary">Quote sent to admin</h3>
                <table style={{ width: "100%" }}>
  <thead>
    <tr>
      <th>Quote Id</th>
      <th>Quote Details Id</th>
      <th>Product Name</th>
      <th>Product Image</th>
      <th>Category Name</th>
      <th> Price</th>
    </tr>
  </thead>
  <tbody>
    {loading ? (
      <tr>
        <td colSpan="5" className="text-center">Loading...</td>
      </tr>
    ) : (
        quotePrice.map((item) => (
        <tr key={item.id}>
          <td>{item.quote_id}</td>
          <td>{item.id}</td>
          <td>{item.product.name}</td>
          <td>
            <img
              src={`${baseUrl}/public/${item.product.image}`}
              alt="Product"
              style={{ width: 300, height: 200 }}
            />
          </td>
          <td>{item.category.name}</td>
          <td>{item.price}</td>
        </tr>
      ))
    )}
  </tbody>
</table>
            </div>
          </div>
        </main>
        <footer className="py-4 bg-light mt-auto">
          <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between small">
              <div className="text-muted">&copy; Vera 2025</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </>
  );
}
