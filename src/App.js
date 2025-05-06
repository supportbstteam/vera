
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
import SupplierDashboard from './SupplierDashboard';
import CustomerDashboard from './CustomerDashboard';
import CustomerQuote from './CustomerQuote';
import CustomerViewQuote from './CustomerViewQuote';
import NotFound from './NotFound';
import ProductDetails from './ProductDetails';
import SupplierQuote from './SupplierQuote';
import SupplierQuoteSent from './SupplierQuoteSent';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from './ProtectedRoute';
function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route path="*"           element={<NotFound />} />
    //     <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
    //     <Route path="/supplier/quote/:id" element={<SupplierQuote />} />
    //     <Route path="/supplier/quote/sent/:id" element={<SupplierQuoteSent />} />
    //     <Route path="/customer/dashboard" element={<CustomerDashboard />} />
    //     <Route path="/customer/quote/:id" element={<CustomerQuote />} />
    //     <Route path="/customer/quote/view/:slug" element={<CustomerViewQuote />} />
    //     <Route path="/category" element={<Category />} />
    //     <Route path="/category/:slug" element={<Product />} />
    //     <Route path="category/product/:slug" element={<Product />} />
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/checkout" element={<Checkout />} />
    //     <Route path="/sendquote" element={<SendQuote />} />
    //     <Route path="/category/:slug/:slug" element={<ProductDetails />} />
    //     <Route path="/logout" element={<Logout />} />
    //   </Routes>
    // </Router>
    <Router>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="*" element={<NotFound />} />

    {/* Supplier Routes */}
    <Route path="/supplier/dashboard" element={
      <ProtectedRoute allowedRoles={['supplier']}>
        <SupplierDashboard />
      </ProtectedRoute>
    } />
    <Route path="/supplier/quote/:id" element={
      <ProtectedRoute allowedRoles={['supplier']}>
        <SupplierQuote />
      </ProtectedRoute>
    } />
    <Route path="/supplier/quote/sent/:id" element={
      <ProtectedRoute allowedRoles={['supplier']}>
        <SupplierQuoteSent />
      </ProtectedRoute>
    } />

    {/* Customer Routes */}
    <Route path="/customer/dashboard" element={
      <ProtectedRoute allowedRoles={['customer']}>
        <CustomerDashboard />
      </ProtectedRoute>
    } />
    <Route path="/customer/quote/:id" element={
      <ProtectedRoute allowedRoles={['customer']}>
        <CustomerQuote />
      </ProtectedRoute>
    } />
    <Route path="/customer/quote/view/:slug" element={
      <ProtectedRoute allowedRoles={['customer']}>
        <CustomerViewQuote />
      </ProtectedRoute>
    } />


    <Route path="/category" element={
        <ProtectedRoute allowedRoles={['customer']}>
        <Category />
        </ProtectedRoute>
    }/>
    <Route path="/category/:slug" element={
         <ProtectedRoute allowedRoles={['customer']}>
        <Product />
        </ProtectedRoute>
} />
    <Route path="category/product/:slug" element={
         <ProtectedRoute allowedRoles={['customer']}>
        <Product />
        </ProtectedRoute>
} />

    <Route path="/checkout" element={
         <ProtectedRoute allowedRoles={['customer']}>
        <Checkout />
        </ProtectedRoute>
} />
    <Route path="/sendquote" element={
        <ProtectedRoute allowedRoles={['customer']}>
        <SendQuote />
        </ProtectedRoute>
    } />
    <Route path="/category/:slug/:slug" element={
         <ProtectedRoute allowedRoles={['customer']}>
        <ProductDetails />
        </ProtectedRoute>
} />
    <Route path="/logout" element={<Logout />} />
    <Route path="/register" element={<Register />} />
  </Routes>
</Router>
  );
}
export default App;

