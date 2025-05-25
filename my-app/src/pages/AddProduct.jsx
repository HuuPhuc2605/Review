import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addP } from "../features/products/productSlice";
import { useDispatch } from "react-redux";
import useFetch from "../hooks/useFetch";
const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
  });
  const nav = useNavigate();
  const dispatch = useDispatch();
  const {
    data: productList,
    loading,
    error,
  } = useFetch("http://localhost:3001/products");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(addP(form));
    if (addP.fulfilled.match(result)) {
      alert("Thêm sản phẩm thành công");
      nav("/");
    }
  };
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-center">
        {" "}
        Thêm sản phẩm mới
      </h2>
      {loading && <p>Đang tải...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {productList && (
        <p className="text-gray-600 mb-4 text-center">
          Tổng số sản phẩm hiện có: {productList.length}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col items-center"
      >
        <input
          type="text"
          name="name"
          placeholder="Nhập tên sản phẩm..."
          value={form.name}
          onChange={handleChange}
          className="border rounded px-4 py-2 w-90"
        />
        <input
          type="text"
          name="price"
          placeholder="Nhập giá sản phẩm..."
          value={form.price}
          onChange={handleChange}
          className="border rounded px-4 py-2 w-90"
        />
        <input
          type="text"
          name="description"
          placeholder="Nhập mô tả sản phẩm..."
          value={form.description}
          onChange={handleChange}
          className="border rounded px-4 py-2 w-90"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Thêm
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

//
//
//
//
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AddProduct = () => {
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//   });
//   const nav = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:3001/products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form),
//       });

//       if (res.ok) {
//         alert("Thêm sản phẩm thành công!");
//         nav("/");
//       } else {
//         alert("Lỗi khi thêm sản phẩm.");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       alert("Có lỗi xảy ra khi thêm sản phẩm.");
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h2 className="text-3xl font-bold mb-4 text-center">Thêm sản phẩm mới</h2>
//       <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
//         <input
//           type="text"
//           name="name"
//           placeholder="Tên sản phẩm"
//           value={form.name}
//           onChange={handleChange}
//           className="border px-4 py-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           name="description"
//           placeholder="Mô tả sản phẩm"
//           value={form.description}
//           onChange={handleChange}
//           className="border px-4 py-2 rounded"
//           required
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Giá sản phẩm"
//           value={form.price}
//           onChange={handleChange}
//           className="border px-4 py-2 rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Thêm
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
