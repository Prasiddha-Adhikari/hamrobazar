import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import gif from "../assets/Search.gif";
import Select from "react-select";
import down from "../assets/download.png";

const countryOptions = [
  { value: "+1", label: "🇺🇸", flag: "US" },
  { value: "+44", label: "🇬🇧", flag: "GB" },
  { value: "+91", label: "🇮🇳", flag: "IN" },
  { value: "+977", label: "🇳🇵", flag: "NP" },
  { value: "+971", label: "🇦🇪", flag: "AE" },
];

const Login = () => {
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[3]); // Default to Nepal (+977)
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!contact || !password) {
      setError("Contact and password are required");
      setLoading(false);
      return;
    }

    const fullContact = selectedCountry.value + contact;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "login",
          contact: fullContact,
          password: password,
        }),
      });

      const text = await response.text();
      console.log("Raw response from server:", text);

      if (!text) throw new Error("Empty response from server");

      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        console.error("JSON parse error:", jsonError);
        setError("Invalid server response. Please try again later.");
        setLoading(false);
        return;
      }

      if (data.status === "success") {
        alert("Login successful!");
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("User role:", data.user.role);

        // Check user role and navigate
        if (data.user.role === "admin") {
          console.log("Navigating to /admin");
          navigate("/admin", { replace: true });
        } else if (data.user.role === "vendor") {
          console.log("Navigating to /vendor");
          navigate("/vendor", { replace: true });
        } else if (data.user.role === "customer") {
          console.log("Navigating to /customer");
          navigate("/customer", { replace: true });
        } else {
          console.log("Unknown role, staying on login page.");
          setError("Invalid user role.");
        }
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row h-screen p-4">
        {/* Left Side - Image Section */}
        <div className="md:w-2/3 flex flex-col items-center justify-center bg-gray-50 space-y-4">
          <img src={gif} alt="Login Illustration" className="w-[90%] md:w-[85%]" />
          <img src={down} alt="Download Illustration" className="w-[90%] md:w-[85%] pt-16" />
        </div>

        {/* Right Side - Login Form */}
        <div className="md:w-[40%] flex flex-col pt-12 pl-10 bg-gray-50">
          <div className="bg-gray-200 p-8 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700">
              For Existing Users <br /> Verify email{" "}
              <Link to="/oldlogin" className="text-black hover:underline">
                Here
              </Link>
            </h3>
          </div>

          <h2 className="text-2xl font-semibold my-6">Login</h2>
          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">
            {/* Country & Contact Input */}
            <div className="border rounded-md p-2 flex items-center">
              <Select
                value={selectedCountry}
                onChange={setSelectedCountry}
                options={countryOptions}
                className="w-[35%]"
              />
              <input
                type="text"
                placeholder="Contact"
                className="w-full px-4 py-2 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <hr className="pb-4" />

            {/* Login Button */}
            <button
              type="submit"
              className="w-full text-black py-2 px-4 font-semibold rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>

            <p className="text-sm font-medium hover:underline">
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
          </form>

          <p className="mt-4 text-black font-semibold text-sm border-t py-12">
            Don't have an account?{" "}
            <Link to="/signup" className="text-black hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
