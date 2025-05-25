import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((s) => s.product);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
  });

  const {
    data: allProducts,
    loading: loadingList,
    error: fetchError,
  } = useFetch("http://localhost:3001/products");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        addProduct({ ...form, price: +form.price, stock: +form.stock })
      ).unwrap();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Thêm sản phẩm mới</h2>
      {loadingList && (
        <p className="text-gray-500">Đang tải danh sách sản phẩm...</p>
      )}
      {fetchError && <p className="text-red-500">{fetchError}</p>}
      {allProducts && (
        <p className="text-sm text-gray-600 mb-2">
          Có tổng cộng {allProducts.length} sản phẩm hiện tại.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "price", "stock"].map((n) => (
          <input
            key={n}
            type={n === "name" ? "text" : "number"}
            name={n}
            placeholder={
              n === "name"
                ? "Tên sản phẩm"
                : n === "price"
                ? "Giá"
                : "Số lượng tồn kho"
            }
            value={form[n]}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        ))}
        <textarea
          name="description"
          placeholder="Mô tả sản phẩm"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {isLoading ? "Đang thêm..." : "Thêm sản phẩm"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addProduct } from "../features/products/productSlice";
// import { useNavigate } from "react-router-dom";
// import useFetch from "../hooks/useFetch";
// const AddProduct = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { isLoading, error } = useSelector((s) => s.product);
//   const [f, setF] = useState({
//     name: "",
//     price: "",
//     description: "",
//     stock: "",
//   });

//   // Hiển thị thông tin fetch từ useFetch

//   const {
//     data: allProducts,
//     loading: loadingList,
//     error: fetchError,
//   } = useFetch("http://localhost:3001/products");

//   const handleChange = (e) =>
//     setF((f) => ({ ...f, [e.target.name]: e.target.value }));
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(addProduct({ ...f, price: +f.price })).unwrap();
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">➕ Thêm sản phẩm mới</h2>

//       {/*  Hiển thị thông tin fetch từ useFetch */}
//       {loadingList && (
//         <p className="text-gray-500">Đang tải danh sách sản phẩm...</p>
//       )}
//       {fetchError && <p className="text-red-500">{fetchError}</p>}
//       {allProducts && (
//         <p className="text-sm text-gray-600 mb-2">
//           Có tổng cộng {allProducts.length} sản phẩm hiện tại.
//         </p>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {["name", "price"].map((n) => (
//           <input
//             key={n}
//             type={n === "price" ? "number" : "text"}
//             name={n}
//             placeholder={n === "price" ? "Giá" : "Tên sản phẩm"}
//             value={f[n]}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         ))}
//         <textarea
//           name="description"
//           placeholder="Mô tả sản phẩm"
//           value={f.description}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//         {error && <p className="text-red-500">{error}</p>}
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         >
//           {isLoading ? "Đang thêm..." : "Thêm sản phẩm"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
