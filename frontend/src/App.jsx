import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contex/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";


import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SubCategory from "./components/SubCategory";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import OldLogin from "./pages/OldLogin";

// Admin Components
import AdminDashboard from "./adminComponent/AdminDashboard";
import ManageVendor from "./adminComponent/ManageVendor";
import ManageUsers from "./adminComponent/ManageUsers";
import AddCategory from "./adminComponent/AddCategory";
import Products from "./adminComponent/Products";

// Vendor Components
import VendorDashboard from "./vendorComponent/VendorDashboard";
import AddProduct from "./vendorComponent/AddProduct";
import ProductDetails from "./components/ProductDetail";

// Customer Components
import CustomerDashboard from "./customerComponent/CustomerDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider> {/* ✅ Move AuthProvider inside BrowserRouter */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/:categoryName" element={<SubCategory />} />
          </Route>

          <Route path="/product/:productId" element={<ProductDetails />} />

          {/* Not Found Page */}
          <Route path="*" element={<NotFound />} />

          {/* Auth Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/oldlogin" element={<OldLogin />} />

          {/* Admin Routes - Protected */}
          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/vendors" element={<ManageVendor />} />
            <Route path="/admin/categories" element={<AddCategory />} />
            <Route path="/admin/products" element={<Products />} />
          </Route>

          {/* Vendor Routes - Protected */}
          <Route element={<ProtectedRoute role="vendor" />}>
            <Route path="/vendor" element={<VendorDashboard />} />
            <Route path="/vendor/add-product" element={<AddProduct />} />
          </Route>

          {/* Customer Routes - Protected */}
          <Route element={<ProtectedRoute role="customer" />}>
            <Route path="/customer" element={<CustomerDashboard />} />
            <Route path="/customer/add-product" element={<AddProduct />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
