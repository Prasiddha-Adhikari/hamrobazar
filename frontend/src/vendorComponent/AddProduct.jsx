import React, { useState, useEffect } from 'react';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/categories.php`);
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (err) {
        setError('Failed to load categories.');
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setProduct((prev) => ({
      ...prev,
      category: selectedCategory,
      subcategory: '',
    }));

    if (!selectedCategory) {
      setSubcategories([]);
      return;
    }

    setLoadingSubcategories(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/subcategories.php?category_id=${selectedCategory}`);
      const data = await response.json();
      setSubcategories(data.subcategories || []);
    } catch {
      setError('Failed to load subcategories.');
    } finally {
      setLoadingSubcategories(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setProduct((prev) => ({
        ...prev,
        image: file,
      }));
    } else {
      setError('Please upload a valid image file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Check if user is logged in
    const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

      if (!storedUser || !storedUser.username || !storedUser.phone_number) {
        setError("User not logged in. Please log in.");
        console.log("User data not found:", storedUser);
        return;
      }
      
      setProduct((prevState) => ({
        ...prevState,
        phone_number: storedUser.phone_number,  // Pass the contact number to your form
      }));
      

    // Validate product fields
    if (!product.name || !product.description || !product.price || !product.category || !product.subcategory || !product.image) {
      setError('Please fill in all fields.');
      return;
    }

    // Prepare form data for submission
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("subcategory", product.subcategory);
    formData.append("image", product.image);
    formData.append("username", storedUser.username);
    formData.append("phone_number", storedUser.phone_number);

    setLoadingSubmit(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/addproducts.php`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const result = await response.json();
      if (result.success) {
        setSuccess(result.success);
        setProduct({
          name: '',
          description: '',
          price: '',
          category: '',
          subcategory: '',
          image: null,
        });
      } else {
        setError(result.error || 'Unknown error occurred.');
      }
    } catch {
      setError('An unexpected error occurred.');
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleCategoryChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Category</option>
            {loadingCategories ? (
              <option>Loading categories...</option>
            ) : (
              categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.category_name}
                </option>
              ))
            )}
          </select>
        </div>

        {product.category && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Subcategory</label>
            <select
              name="subcategory"
              value={product.subcategory}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Subcategory</option>
              {loadingSubcategories ? (
                <option>Loading subcategories...</option>
              ) : (
                subcategories.map((sub) => (
                  <option key={sub.subcategory_id} value={sub.subcategory_id}>
                    {sub.subcategory_name}
                  </option>
                ))
              )}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          disabled={loadingSubmit}
        >
          {loadingSubmit ? 'Submitting...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
