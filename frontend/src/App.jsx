import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SubCategory from "./components/SubCategory";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import OldLogin from "./pages/OldLogin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Using Layout to Wrap Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:categoryName" element={<SubCategory />} />
          {/* Not Found Page */}
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/oldlogin" element={<OldLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
