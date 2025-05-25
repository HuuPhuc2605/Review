import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  updateProduct,
} from "../features/products/productSlice";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    productList = [],
    isLoading,
    error,
  } = useSelector((state) => state.product);
  const product = productList.find((p) => String(p.id) === id) || {};

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productList.length) dispatch(fetchProducts());
  }, [productList.length, dispatch]);

  useEffect(() => {
    if (product.id)
      setFormData({
        name: product.name || "",
        price: product.price?.toString() || "",
        description: product.description || "",
        stock: product.stock?.toString() || "",
      });
  }, [product]);

  const handleChange = (e) =>
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, stock, description } = formData;
    if (!name.trim() || isNaN(+price) || isNaN(+stock))
      return setErrorMsg("Vui lòng nhập đúng dữ liệu!");
    setErrorMsg("");
    setLoading(true);
    try {
      await dispatch(
        updateProduct({
          id,
          name: name.trim(),
          price: +price,
          description: description.trim(),
          stock: +stock,
        })
      ).unwrap();
      navigate("/");
    } catch {
      setErrorMsg("Cập nhật thất bại");
    }
    setLoading(false);
  };

  if (isLoading && !productList.length)
    return <p className="p-10 text-center">⏳ Đang tải...</p>;
  if (error)
    return <p className="p-10 text-center text-red-600">Lỗi: {error}</p>;
  if (!product.id)
    return (
      <p className="p-10 text-center text-red-600">
        Không tìm thấy sản phẩm ID {id}
      </p>
    );

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Chỉnh sửa sản phẩm</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "price", "stock"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={
              field === "name"
                ? "Tên sản phẩm"
                : field === "price"
                ? "Giá sản phẩm"
                : "Số lượng tồn kho"
            }
            type={field === "name" ? "text" : "number"}
            value={formData[field]}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        ))}
        <textarea
          name="description"
          placeholder="Mô tả sản phẩm"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errorMsg && <p className="text-red-600">{errorMsg}</p>}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Quay lại
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:opacity-50"
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchProducts,
//   updateProduct,
// } from "../features/products/productSlice";

// const EditProduct = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const {
//     productList = [],
//     isLoading,
//     error,
//   } = useSelector((state) => state.product);
//   const product = productList.find((p) => String(p.id) === id) || {};

//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     description: "",
//   });
//   const [errorMsg, setErrorMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!productList.length) dispatch(fetchProducts());
//   }, [productList.length, dispatch]);

//   useEffect(() => {
//     if (product.id)
//       setFormData({
//         name: product.name || "",
//         price: product.price?.toString() || "",
//         description: product.description || "",
//       });
//   }, [product]);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     if (
//       !formData.name.trim() ||
//       !formData.price.trim() ||
//       isNaN(+formData.price)
//     )
//       return setErrorMsg("Nhập đúng dữ liệu!");

//     setLoading(true);
//     try {
//       await dispatch(
//         updateProduct({
//           id,
//           name: formData.name.trim(),
//           price: +formData.price,
//           description: formData.description.trim(),
//         })
//       ).unwrap();
//       navigate("/");
//     } catch {
//       setErrorMsg("Cập nhật thất bại");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (isLoading && !productList.length)
//     return <p className="p-10 text-center">⏳ Đang tải...</p>;
//   if (error)
//     return <p className="p-10 text-center text-red-600">Lỗi: {error}</p>;
//   if (!product.id)
//     return (
//       <p className="p-10 text-center text-red-600">
//         Không tìm thấy sản phẩm ID {id}
//       </p>
//     );

//   return (
//     <div className="max-w-lg mx-auto p-6">
//       <h2 className="text-xl font-semibold mb-4">Chỉnh sửa sản phẩm</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           name="name"
//           placeholder="Tên sản phẩm"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           name="price"
//           placeholder="Giá sản phẩm"
//           value={formData.price}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//           inputMode="decimal"
//           pattern="^\d*\.?\d*$"
//         />
//         <textarea
//           name="description"
//           placeholder="Mô tả sản phẩm"
//           value={formData.description}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         {errorMsg && <p className="text-red-600">{errorMsg}</p>}
//         <div className="flex justify-between items-center">
//           <button
//             type="button"
//             onClick={() => navigate("/")}
//             className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//           >
//             Quay lại
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:opacity-50"
//           >
//             {loading ? "Đang lưu..." : "Lưu thay đổi"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditProduct;
