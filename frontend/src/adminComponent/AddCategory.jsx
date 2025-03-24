import React, { useEffect, useState } from "react";

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Fetch categories and subcategories from the API
    fetch(`${import.meta.env.VITE_API_URL}/addcategory.php`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          // Group subcategories under their respective categories
          const categoryMap = {};
          data.categories.forEach((item) => {
            if (!categoryMap[item.category_id]) {
              categoryMap[item.category_id] = {
                category_id: item.category_id,
                category_name: item.category_name,
                subcategories: [],
              };
            }
            if (item.subcategory_id) {
              categoryMap[item.category_id].subcategories.push({
                subcategory_id: item.subcategory_id,
                subcategory_name: item.subcategory_name,
              });
            }
          });

          setCategories(Object.values(categoryMap));
        } else {
          setError(data.message || "Failed to load categories");
        }
      })
      .catch((err) => setError(err.message || "An error occurred"))
      .finally(() => setLoading(false));
  }, []);

  const handleAddCategory = () => {
    const newCategory = {
      category_name: categoryName,
    };

    // Send the POST request to add a new category
    fetch(`${import.meta.env.VITE_API_URL}/addcategory.php`, {
      method: "POST",
      body: JSON.stringify(newCategory),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setCategories((prevCategories) => [
            ...prevCategories,
            {
              category_id: data.category_id, // Assuming backend returns category ID
              category_name: categoryName,
              subcategories: [],
            },
          ]);
          setCategoryName(""); // Clear input field after successful addition
        } else {
          setError(data.message || "Failed to add category");
        }
      })
      .catch((err) => setError(err.message || "An error occurred"));
  };

  const handleAddSubcategory = () => {
    if (!selectedCategory || !subcategoryName) {
      setError("Please select a category and enter a subcategory name");
      return;
    }

    const newSubcategory = {
      subcategory_name: subcategoryName,
      category_id: selectedCategory,
    };

    // Send the POST request to add a new subcategory
    fetch(`${import.meta.env.VITE_API_URL}/addsubcategory.php`, {
      method: "POST",
      body: JSON.stringify(newSubcategory),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          // Update the category by adding the new subcategory
          setCategories((prevCategories) =>
            prevCategories.map((category) =>
              category.category_id === selectedCategory
                ? {
                    ...category,
                    subcategories: [
                      ...category.subcategories,
                      {
                        subcategory_id: data.subcategory_id, // Assuming backend returns subcategory ID
                        subcategory_name: subcategoryName,
                      },
                    ],
                  }
                : category
            )
          );
          setSubcategoryName(""); // Clear subcategory field after successful addition
        } else {
          setError(data.message || "Failed to add subcategory");
        }
      })
      .catch((err) => setError(err.message || "An error occurred"));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Categories and Subcategories</h2>

      {/* Add New Category Form */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </div>

      {/* Add New Subcategory Form */}
      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded mr-2"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.category_name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Subcategory Name"
          value={subcategoryName}
          onChange={(e) => setSubcategoryName(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleAddSubcategory}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Subcategory
        </button>
      </div>

      {/* Categories List */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Category List</h3>
        <ul className="list-none">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.category_id} className="border-b py-2">
                <div className="font-bold">{category.category_name}</div>
                <div className="ml-4 text-gray-500">
                  {(category.subcategories || []).length > 0 ? (
                    category.subcategories.map((subcategory) => (
                      <div key={subcategory.subcategory_id} className="pl-4">
                        - {subcategory.subcategory_name}
                      </div>
                    ))
                  ) : (
                    <span className="text-sm italic">No subcategories</span>
                  )}
                </div>
              </li>
            ))
          ) : (
            <li>No categories found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AddCategory;
