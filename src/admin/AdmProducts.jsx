import React, { useContext, useState } from "react";
import { AdmContext } from "./AdmContext";
import api from "../api/axios";
import AdminNav from "./AdminNav";
import { toast } from "sonner";

export default function AdmProducts() {
  const { productList, setProductList, fetchAdmData } = useContext(AdmContext);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("add");
  const [newProduct, setNewProduct] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
    category: "",
    image: null,
    description: "",
    pages: "",
    language: "",
    rating: "",
    isActive: true,
  });

  const filteredProducts = productList.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const getData = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  const addProduct = async () => {
    try {
      const formData = new FormData();

      formData.append("title", newProduct.title);
      formData.append("author", newProduct.author);
      formData.append("price", Number(newProduct.price));
      formData.append("stock", Number(newProduct.stock) || 0);
      formData.append("category", newProduct.category);
      formData.append("description", newProduct.description);
      formData.append("pages", Number(newProduct.pages) || 0);
      formData.append("language", newProduct.language);
      formData.append("rating", Number(newProduct.rating) || 0);

      if (newProduct.image) {
        formData.append("image", newProduct.image);
      }

      await api.post("/api/books", formData);

      toast.success("Product added successfully!");
      await fetchAdmData();
      setShowModal(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add product");
    }
  };

  const editProduct = async () => {
    try {
      const formData = new FormData();

      formData.append("title", newProduct.title);
      formData.append("author", newProduct.author);
      formData.append("price", Number(newProduct.price));
      formData.append("stock", Number(newProduct.stock) || 0);
      formData.append("category", newProduct.category);
      formData.append("description", newProduct.description);
      formData.append("pages", Number(newProduct.pages) || 0);
      formData.append("language", newProduct.language);
      formData.append("rating", Number(newProduct.rating) || 0);
      formData.append("isActive", newProduct.isActive);

      if (newProduct.image instanceof File) {
        formData.append("image", newProduct.image);
      }

      const url = `/api/books/${newProduct._id}`;
      await api.put(url, formData);

      toast.success("Product updated successfully!");
      await fetchAdmData();
      setShowModal(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update product");
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/api/books/${id}/delete`);
        const updatedList = productList.filter(
          (p) => p._id === id || p.id === id
        );
        setProductList(updatedList);
        try {
          await fetchAdmData();
        } catch (e) {
          console.warn("AdmProducts: fetchAdmData after delete failed", e);
        }
        toast.success("Product deleted successfully!");
      } catch (err) {
        const msg = err?.response?.data?.message || "Failed to delete product";
        toast.error(msg);
        console.error("Delete product error:", err);
      }
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
            onClick={() => {
              setType("add");
              setShowModal(true);
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
                    key={product._id || product.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2 flex items-center gap-3">
                      <img
                        src={product.image?.url}
                        alt={product.title}
                        className="w-10 h-10 rounded object-cover border"
                      />

                      <span className="font-medium">{product.title}</span>
                    </td>
                    <td className="px-4 py-2 font-semibold text-gray-800">
                      ₹{product.price}
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
                        onClick={() => deleteProduct(product._id || product.id)}
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
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-md"
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
                  isActive: true,
                });
              }}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold text-gray-800 mb-5">
                {type === "edit" ? "Edit Product" : "Add Product"}
              </h2>

              {/* Form fields */}
              <div className="space-y-3">
                {[
                  "title",
                  "author",
                  "price",
                  "stock",
                  "category",
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
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
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
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  )
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>

              {/* isActive toggle (EDIT ONLY) */}
              {type === "edit" && (
                <div className="mt-4 pt-3 border-t">
                  <label className="flex items-center justify-between text-sm text-gray-700">
                    <span className="font-medium">Product Status</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {newProduct.isActive ? "Active" : "Inactive"}
                      </span>
                      <input
                        type="checkbox"
                        checked={newProduct.isActive}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            isActive: e.target.checked,
                          })
                        }
                        className="accent-green-600 w-4 h-4"
                      />
                    </div>
                  </label>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-end mt-6 gap-2">
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
                      isActive: true,
                    });
                  }}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm w-full sm:w-auto"
                >
                  Cancel
                </button>

                <button
                  onClick={type === "edit" ? editProduct : addProduct}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm w-full sm:w-auto"
                >
                  {type === "edit" ? "Update Product" : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
