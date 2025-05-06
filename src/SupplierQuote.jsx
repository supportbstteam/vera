import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios, { Axios } from "axios";
import BaseComponent from "bootstrap/js/dist/base-component";
import Navbar from "./Navbar";
export default function SupplierQuote() {
    const [quote, setQuote] = useState([]);
    const [loading,setLoading] = useState(true);
    const [quotePrice,setQuotePrice] = useState({});
    const [status, setStatus] = useState(true);
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
     const response = await axios.get(`${baseUrl}/api/supplier/quote/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
      });
      console.log(response.data.data);
      const count = response.data.data.length;
      if(count > 0) {
        setStatus(false);
      }
      console.log("Number of elements:", count);
      setQuote(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching category data:", error);
      if (error.response?.status === 401) {
        navigate("");
      }
    }
  };
  const handleSend = async () => {
    const payload = quote.map((item) => ({
      id: item.id,
      price: quotePrice[item.id] || "",
      product_id: item.product.id,
      category_id: item.category.id,
      supplier_id: item.supplier_id,
      quote_id: item.quote_id,
      customer_id: item.customer_id,
    }));
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${baseUrl}/api/supplier/quote/sent/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status) {
        console.log("mughis",response.data.status);
        setQuote([]);
        setTimeout(() => {
          navigate(`/supplier/quote/sent/${id}`);
        }, 500);
      } else {
        alert("Something went wrong: " + response.data.message);
      }
    } catch (error) {
      console.error("Error sending quote data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);
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
                <h3 className="text-center text-primary my-3">Quote from admin</h3>
            </div>
            <table style={{ width: "100%" }}>
  <thead>
    <tr>
      <th>Quote Id</th>

      <th>Product Name</th>
      <th>Category Name</th>
      <th>Image</th>
      <th>Set Price</th>
    </tr>
  </thead>
  <tbody>
    {loading ? (
      <tr>
        <td colSpan="5" className="text-center">Loading...</td>
      </tr>
    ) : (
      quote.map((item) => (
        <tr key={item.id}>
          <td>{item.quote_id}</td>
          <td>{item.product.name}</td>
          <td>{item.category.name}</td>
          <td>
            <img src={`${baseUrl}/public/${item.product.image}`} alt="Product" style={{ width: 300, height: 200 }}/>
          </td>
          <td><input type="text" value={quotePrice[item.id] || ""} onChange={(e) => setQuotePrice({ ...quotePrice, [item.id]: e.target.value })} style={{ with: "100%"}} className="form-control"/></td>
        </tr>
      ))
    )}
  </tbody>
</table>
{/* {quote.length > 0 && (
  <Link to={`/supplier/quote/sent/${quote[0].quote_id}`} className="btn btn-primary">
    Send
  </Link>
)} */}
<div className="text-end">
<button onClick={ handleSend} disabled={status}className="btn btn-primary my-3">Send</button>
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
