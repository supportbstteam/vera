
import logo from './logo.svg'; // Optional if not using
import './App.css';
import './Login.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Category from './Category';
import Product from './Product';
import Logout from './Logout';
import Checkout from './Checkout';
import SendQuote from './SendQuote';
import NotFound from './NotFound';
import ProductDetails from './ProductDetails';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*"           element={<NotFound />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:slug" element={<Product />} />
        <Route path="category/product/:slug" element={<Product />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/sendquote" element={<SendQuote />} />
        <Route path="/category/:slug/:slug" element={<ProductDetails />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}
export default App;

