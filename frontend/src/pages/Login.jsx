import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import gif from "../assets/Search.gif";
import Select from "react-select";
import Flag from "react-world-flags";
import down from "../assets/download.png";

const countryOptions = [
  { value: "+1", label: "+1 United States", flag: "US" },
  { value: "+44", label: "+44 United Kingdom", flag: "GB" },
  { value: "+91", label: "+91 India", flag: "IN" },
  { value: "+977", label: "+977 Nepal", flag: "NP" },
  { value: "+971", label: "+971 United Arab Emirates", flag: "AE" },
];

const Login = () => {
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://your-backend-url/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email: contact, // Assuming phone number is linked to email in backend
          password: password,
        }),
      });

      const data = await response.text();
      if (response.ok) {
        alert("Login successful!");
        if (data.includes("admin_dashboard.php")) navigate("/admin-dashboard");
        else if (data.includes("seller_dashboard.php")) navigate("/seller-dashboard");
        else navigate("/user-dashboard");
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row h-screen p-4">
        {/* Left Column */}
        <div className="md:w-2/3 flex flex-col items-center justify-center bg-gray-50 space-y-4">
          <img src={gif} alt="Signup Illustration" className="w-[90%] md:w-[85%]" />
          <img src={down} alt="Signup Illustration" className="w-[90%] md:w-[85%] pt-16" />
        </div>

        {/* Right Column */}
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
            <div className="border rounded-md">
              <div className="flex items-center bg-white rounded-md overflow-hidden">
                <Select
                  value={selectedCountry}
                  onChange={setSelectedCountry}
                  options={countryOptions}
                  getOptionLabel={(e) => (
                    <div className="flex items-center space-x-2">
                      <Flag code={e.flag} style={{ width: 20, height: 15 }} />
                    </div>
                  )}
                  className="w-[20%]"
                  classNamePrefix="select-country"
                  menuPlacement="auto"
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    control: (base) => ({
                      ...base,
                      border: "none",
                      boxShadow: "none",
                      "&:hover": { border: "none" },
                    }),
                  }}
                />
                <input
                  type="tel"
                  placeholder="Contact number"
                  className="w-[60%] px-4 py-2 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </div>

            <div className="pb-5">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <hr className="pb-4" />
            <button type="submit" className="w-full text-black py-2 px-4 font-semibold rounded-md border border-gray-300">
              Log in
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
