import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import gif from "../assets/Search.gif";
import down from "../assets/download.png";
import Select from "react-select";
import Flag from "react-world-flags";

const countryOptions = [
  { value: "+1", label: "+1 United States", flag: "US" },
  { value: "+44", label: "+44 United Kingdom", flag: "GB" },
  { value: "+91", label: "+91 India", flag: "IN" },
  { value: "+977", label: "+977 Nepal", flag: "NP" },
  { value: "+971", label: "+971 UAE", flag: "AE" },
];

const Signup = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "", // It can be phone or email, depending on user input
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      alert("Please accept the Terms & Conditions.");
      return;
    }

    const { fullName, contact, password } = formData;

    // If the contact is a phone number, append country code
    const phoneNumberWithCountryCode = selectedCountry.value + contact;

    try {
      // Check if contact is a valid phone number or email and send the appropriate data
      const response = await fetch(`${import.meta.env.VITE_API_URL}/signup.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "signup", // Send the action
          fullName,
          contact: contact.includes('@') ? contact : phoneNumberWithCountryCode, // Check if contact is an email
          password,
          countryCode: selectedCountry.value, // Send country code if needed for phone number
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("User registered successfully!");
        window.location.href = "/login"; // Redirect to login page after successful signup
      } else {
        alert(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row h-screen p-4">
        {/* Left Column */}
        <div className="md:w-2/3 flex flex-col items-center justify-center bg-gray-50 space-y-4">
          <img src={gif} alt="Signup Illustration" className="w-[90%] md:w-[85%]" />
          <img src={down} alt="Download Illustration" className="w-[90%] md:w-[85%] pt-16" />
        </div>

        {/* Right Column */}
        <div className="md:w-[40%] flex flex-col pt-12 pl-10 bg-gray-50">
          <div className="bg-gray-200 p-8 rounded-md">
            <h3 className="text-lg font-semibold text-gray-700">
              Make a Deal. <br /> Welcome to Hamrobazar
            </h3>
          </div>

          <h2 className="text-2xl font-semibold my-6">Sign Up</h2>
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
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
                      "&:hover": {
                        border: "none",
                      },
                    }),
                  }}
                />
                <input
                  type="tel"
                  id="phone"
                  name="contact"
                  placeholder="Phone number or Email"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-[60%] px-4 py-2 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <hr className="pb-4" />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-400">
                I hereby accept all the{" "}
                <Link to="/terms" className="text-black hover:underline">
                  Terms & Conditions
                </Link>{" "}
                of Hamrobazar.
              </span>
            </label>
            <button
              type="submit"
              disabled={!isChecked}
              className={`w-full py-2 px-4 font-semibold rounded-md ${
                isChecked ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-black text-base border-t py-8">
            Already have an account?{" "}
            <Link to="/login" className="text-black hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
