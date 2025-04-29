import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
export default function Product() {
    const baseUrl = process.env.REACT_APP_API_URL
  const email = localStorage.getItem("email");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleAddToQuote = async (productId) => {
    console.log(productId);
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "Please login first",
          timer: 2000,
          showConfirmButton: false,
        });
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        const response = await axios.get(
          `${baseUrl}/api/category/product/${slug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
    fetchData();
  }, [slug, navigate]);
  return (
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        {/* Navbar Brand */}
        <Link className="navbar-brand ps-3" to="/category">
          <h1>VERA</h1>
        </Link>

        {/* Sidebar Toggle */}
        <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle">
          <i className="fas fa-bars"></i>
        </button>

        {/* Navbar Search */}
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div className="input-group"></div>
        </form>

        {/* Navbar */}
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fas fa-user fa-fw"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li>
                <Link className="dropdown-item" to="/checkout">{" "}{email}</Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/checkout">
                  Checkout
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/Logout">
                  Logout
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <div id="layoutSidenav">
        {/* <div id="layoutSidenav_nav">
        </div> */}

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
