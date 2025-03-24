import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaEye, FaSave, FaCommentAlt, FaPhoneAlt } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL + "/products.php";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${API_URL}?id=${productId}`);
        const data = await response.json();

        if (data.status === "success") {
          setProduct(data.data[0]);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchSimilarProducts = async () => {
      try {
        const response = await fetch(`${API_URL}?similarTo=${productId}`);
        const data = await response.json();
        if (data.status === "success") {
          setSimilarProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    };

    const incrementViews = async () => {
      try {
        await fetch(`${API_URL}/updateViews.php?id=${productId}`);
      } catch (error) {
        console.error("Error updating views:", error);
      }
    };

    fetchProductDetails();
    fetchSimilarProducts();
    incrementViews();
  }, [productId]);

  const handleToggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const getTruncatedDescription = (description) => {
    const maxLength = 300; // Adjust this value based on how much text you want to show initially
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  const isDescriptionLong = product && product.description && product.description.length > 300;

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-6">Error: {error}</div>;
  if (!product) return <div className="text-center p-6">Product not found.</div>;

  const truncatedDescription = product.description
    ? getTruncatedDescription(product.description)
    : "";

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Column - Product Images and Info */}
      <div>
        <img
          src={product.image_url || "fallback_image_url"}
          alt={product.product_name}
          className="w-full h-64 object-cover rounded-md"
        />
        <div className="flex space-x-2 mt-4">
          {[product.image_url, product.image_url2, product.image_url3].map((img, index) => (
            img ? (
              <div key={index} className="text-center">
                <img src={img} alt={`Thumbnail ${index}`} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex items-center justify-center mt-2 text-gray-500 text-sm">
                  <FaEye className="mr-1" /> {product.views || 0} Views
                </div>
              </div>
            ) : null
          ))}
        </div>
        <p className="text-lg font-semibold mt-4">${product.price}</p>
        <div className="text-sm text-gray-600 mt-2">
          <p>Username: {product.username || "N/A"}</p>
          <p><FaPhoneAlt className="inline-block" /> {product.contact || "N/A"}</p>
        </div>
        <div className="mt-6 flex space-x-4">
          <button className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-md">
            <FaSave className="mr-2" /> Save
          </button>
          <button className="flex items-center bg-gray-300 text-gray-700 py-2 px-4 rounded-md">
            <FaCommentAlt className="mr-2" /> Chat Now
          </button>
        </div>
        <p className="mt-6 text-sm text-gray-600">
          <strong>Note:</strong> We recommend you to physically inspect the product/Service before making payment. Avoid paying fees or advance payment to sellers. <a href="#more-details" className="text-blue-600">Click here for more details.</a>
        </p>
      </div>

      {/* Middle Column - Product Details with Tabs */}
      <div className="col-span-1">
        <h1 className="text-3xl font-bold">{product.product_name || "No product name available"}</h1>

        <div className="flex space-x-6 mt-4 border-b pb-2">
          {["description", "comments", "location"].map((tab) => (
            <button
              key={tab}
              className={`pb-2 text-lg font-semibold ${
                activeTab === tab ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {activeTab === "description" && (
            <div className="text-gray-700">
              <p>{showFullDescription ? product.description : truncatedDescription}</p>
              {isDescriptionLong && (
                <button
                  onClick={handleToggleDescription}
                  className="text-blue-600 mt-2"
                >
                  {showFullDescription ? "Show less" : "Show more"}
                </button>
              )}
              <p>AD ID: {product.ad_id || "N/A"}</p>
              <p>Location: {product.location || "N/A"}</p>
              <p>Delivery: {product.delivery || "N/A"}</p>
              <p>Negotiable: {product.negotiable ? "Yes" : "No"}</p>
              <p>Ads Posted: {product.ads_posted || "N/A"}</p>
              <p>Ads Expiry: {product.ads_expiry || "N/A"}</p>
            </div>
          )}
          {activeTab === "comments" && <p className="text-gray-600">No comments yet.</p>}
          {activeTab === "location" && <p className="text-gray-500">Location: {product.location || "N/A"}</p>}
        </div>
      </div>

      {/* Right Column - Similar Products */}
      <div>
        <h2 className="text-xl font-bold mb-4">Similar Products</h2>
        {similarProducts.length > 0 ? (
          <ul>
            {similarProducts.map((item) => (
              <li key={item.id} className="mb-4 border-b pb-4 flex items-center">
                <img
                  src={item.image_url || "fallback_image_url"}
                  alt={item.product_name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <p className="font-semibold">{item.product_name}</p>
                  <p className="text-sm text-gray-600">${item.price}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No similar products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
