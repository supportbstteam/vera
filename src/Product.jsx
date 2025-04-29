import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "./Navbar";
export default function Product() {
  const baseUrl = process.env.REACT_APP_API_URL
  const email = localStorage.getItem("email");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  console.log(slug);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const handleAddToQuote = async (productId) => {
    try {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
      const response = await axios.post(
        `${baseUrl}/api/product/${productId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status) {
        Swal.fire({
          icon: "success",
          title: "Product added to quote!",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/checkout");
      } else if (response.data.message === "Product is already added") {
        Swal.fire({
          icon: "info",
          title: "Product is already in quote.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to add product to quote.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Add to quote error:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.message,
      });
    }
  };
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${baseUrl}/api/category/product/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);

      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      if (error.response?.status === 401) {
        navigate("/");
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [slug, navigate]);
  return (
    <>
     <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_content" className=" px-4 py-4">
          <main>
            <button className="btn btn-primary my-4" onClick={() => navigate(-1)}>
              <FaArrowLeft />
              Back
            </button>
            <div className="container-fluid px-4">
              <div className="container-fluid px-4"></div>
            </div>
            <div className="row py-6">
              {message && <small>{message}</small>}
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : products.length === 0 ? (
                <div className="text-center">No products found.</div>
              ) : (
                products.map((item) => (
                  <div className="col-xl-3 col-md-6 mx-5 my-4 hover-affect py-3 px-3" key={item.id}>
                    <Link to={`${item.slug}`} className="text-decoration-none">
                      <div className="" key={item.id}>
                        <img src={`${baseUrl}/public/${item.image}`} alt="Product" style={{ width: 300, height: 200 }}/>
                        <h4 className="text-center py-3" style={{ color: "black" }}>{item.name}</h4>
                      </div>
                    </Link>
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-primary" onClick={() => handleAddToQuote(item.id)}>
                        Add to Quote
                      </button>
                    </div>
                    {/* </Link> */}
                  </div>
                ))
              )}
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
