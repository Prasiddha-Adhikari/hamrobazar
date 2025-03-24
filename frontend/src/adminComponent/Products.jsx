import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products.php`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data.status === "success") {
          setProducts(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch products");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteProduct = (productId) => {
    fetch(`${import.meta.env.VITE_API_URL}/products.php?id=${productId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete product");
        }
        return res.json();
      })
      .then((data) => {
        if (data.status === "success") {
          setProducts(products.filter((product) => product.product_id !== productId));
        } else {
          throw new Error(data.message || "Failed to delete product");
        }
      })
      .catch((err) => setError(err.message));
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleSaveEdit = () => {
    fetch(`${import.meta.env.VITE_API_URL}/products.php`, {
      method: "POST",
      body: JSON.stringify(editingProduct),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setProducts(products.map((p) => (p.product_id === editingProduct.product_id ? editingProduct : p)));
          setEditingProduct(null);
        } else {
          throw new Error(data.message || "Failed to update product");
        }
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Products List */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Product List</h3>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.product_id} className="border p-4 rounded shadow relative">
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.product_name}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                )}
                <h3 className="font-bold">{product.product_name}</h3>
                <p>{product.description}</p>
                <p className="text-green-600 font-semibold">Price: ${product.price}</p>

                <div className="flex mt-2 gap-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.product_id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found</p>
        )}
      </div>

      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
            <input
              type="text"
              placeholder="Product Name"
              value={editingProduct.product_name}
              onChange={(e) => setEditingProduct({ ...editingProduct, product_name: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Description"
              value={editingProduct.description}
              onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <input
              type="number"
              placeholder="Price"
              value={editingProduct.price}
              onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={editingProduct.image_url}
              onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 text-white px-3 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-500 text-white px-3 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
