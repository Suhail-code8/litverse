import React, { useContext, useState } from "react";
import { AdmContext } from "./AdmContext";
import axios from "axios";
import AdminNav from "./AdminNav";

export default function AdmProducts() {
  const { productList, setProductList} = useContext(AdmContext);
  const API = import.meta.env.VITE_API_URL || "https://litverse-db.onrender.com";

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("add");
  const [newProduct, setNewProduct] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
    category: "",
    image: "",
    description: "",
    pages: "",
    language: "",
    rating: "",
  });

  const filteredProducts = productList.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const getData = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const addProduct = () => {
    const newEntry = {
      ...newProduct,
      id:
        productList.length > 0 ? productList[productList.length - 1].id + 1 : 1,
      price: newProduct.price,
      stock: newProduct.stock || 0,
      pages: newProduct.pages || 0,
      rating: newProduct.rating || 0,
      reviews: [],
    };
    setProductList([...productList, newEntry]);
    setNewProduct({
      title: "",
      author: "",
      price: "",
      stock: "",
      category: "",
      image: "",
      description: "",
      pages: "",
      language: "",
      rating: "",
    });
    axios.post(`${API}/books`, newEntry);
    setShowModal(false);
  };

  function editProduct() {
    const newList = productList.map((p) =>
      p.id === newProduct.id ? newProduct : p
    );
    setProductList(newList);
    axios.put(`${API}/books/${newProduct.id}`, newProduct);
    setShowModal(false);
    setType("add");
    setNewProduct({
      title: "",
      author: "",
      price: "",
      stock: "",
      category: "",
      image: "",
      description: "",
      pages: "",
      language: "",
      rating: "",
    });
  }

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedList = productList.filter((p) => p.id !== id);
      setProductList(updatedList);
      axios.delete(`${API}/books/${id}`);
    }
  };

  return (
    <div className="flex">
      <AdminNav />
      <div className="flex-1 lg:ml-52 p-4 sm:p-6 max-w-6xl mx-auto space-y-6  min-h-screen mt-8  ">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Products
            </h1>
            <p className="text-gray-500 text-sm">
              Manage all products in store
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700"
          >
            + Add Product
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex justify-end">
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 w-full sm:w-64 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Listing products */}
        <div className="bg-white border rounded-lg overflow-hidden shadow bg-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">#</th>
                  <th className="px-4 py-2 text-left font-medium">Product</th>
                  <th className="px-4 py-2 text-left font-medium">Price</th>
                  <th className="px-4 py-2 text-left font-medium">Stock</th>
                  <th className="px-4 py-2 text-left font-medium">Category</th>
                  <th className="px-4 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, i) => (
                  <tr
                    key={product.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2 flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-10 h-10 rounded object-cover border"
                      />
                      <span className="font-medium">{product.title}</span>
                    </td>
                    <td className="px-4 py-2 font-semibold text-gray-800">
                      ${product.price}
                    </td>
                    <td className="px-4 py-2">{product.stock}</td>
                    <td className="px-4 py-2 text-gray-600">
                      {product.category}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setNewProduct(product);
                          setType("edit");
                          setShowModal(true);
                        }}
                        className="px-3 py-1 text-xs rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="ml-2 px-3 py-1 text-xs rounded bg-red-100 text-red-700 hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No products found
            </div>
          )}
        </div>

        {/* Modal for adding or editing products */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 px-2">
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-md backdrop-saturate-150"
              onClick={() => {
                setShowModal(false);
                setNewProduct({
                  title: "",
                  author: "",
                  price: "",
                  stock: "",
                  category: "",
                  image: "",
                  description: "",
                  pages: "",
                  language: "",
                  rating: "",
                });
              }}
            ></div>

            <div className="relative bg-white rounded-lg p-6 w-full max-w-md shadow-lg max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">
                {type === "edit" ? "Edit Product" : "Add Product"}
              </h2>

              <div className="space-y-3">
                {[
                  "title",
                  "author",
                  "price",
                  "stock",
                  "category",
                  "image",
                  "description",
                  "pages",
                  "language",
                  "rating",
                ].map((field) =>
                  field === "description" ? (
                    <textarea
                      key={field}
                      name={field}
                      placeholder="Description"
                      value={newProduct[field]}
                      onChange={getData}
                      className="w-full px-3 py-2 border rounded"
                    />
                  ) : (
                    <input
                      key={field}
                      type={
                        ["price", "stock", "pages", "rating"].includes(field)
                          ? "number"
                          : "text"
                      }
                      name={field}
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      value={newProduct[field]}
                      onChange={getData}
                      className="w-full px-3 py-2 border rounded"
                    />
                  )
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-end mt-4 gap-2">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setNewProduct({
                      title: "",
                      author: "",
                      price: "",
                      stock: "",
                      category: "",
                      image: "",
                      description: "",
                      pages: "",
                      language: "",
                      rating: "",
                    });
                  }}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    if (type === "edit") {
                      editProduct();
                    } else {
                      addProduct();
                    }
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full sm:w-auto"
                >
                  {type === "edit" ? "Edit" : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
