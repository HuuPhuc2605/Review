import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchID, updateP } from "../features/products/productSlice";
import { useParams, useNavigate } from "react-router-dom"; // useParams và useNavigate được sử dụng để lấy ID sản phẩm từ URL và điều hướng đến các trang khác

const EditProduct = () => {
  const { id } = useParams(); // useParams được sử dụng để trích xuất ID sản phẩm từ URL
  const disp = useDispatch();
  const nav = useNavigate(); // useNavigate được sử dụng để điều hướng đến các trang khác
  const { selectedP, loading, error } = useSelector((state) => state.productL);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    disp(fetchID(id));
  }, [disp, id]);
  useEffect(() => {
    if (selectedP) {
      setForm({
        name: selectedP.name,
        description: selectedP.description,
        price: selectedP.price,
      });
    }
  }, [selectedP]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await disp(updateP({ ...form, id }));
    if (updateP.fulfilled.match(result)) {
      alert("Cập nhật sản phẩm thành công");
      nav("/");
    }
  };
  if (loading) return <div>Loading....</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 flex flex-col items-center"
    >
      <h2 className="font-bold text-3xl mb-4 text-yellow-600">
        Chỉnh sửa sản phẩm
      </h2>
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
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Cập nhật
      </button>
    </form>
  );
};
export default EditProduct;

//
//
//
//
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const EditProduct = () => {
//   const { id } = useParams();
//   const nav = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch sản phẩm theo id
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`http://localhost:3001/products/${id}`);
//         if (!res.ok) throw new Error("Không tìm thấy sản phẩm");
//         const data = await res.json();
//         setForm({
//           name: data.name,
//           description: data.description,
//           price: data.price,
//         });
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`http://localhost:3001/products/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form),
//       });
//       if (!res.ok) throw new Error("Cập nhật thất bại");
//       alert("Cập nhật sản phẩm thành công!");
//       nav("/");
//     } catch (err) {
//       alert(` ${err.message}`);
//     }
//   };

//   if (loading) return <div className="text-center">Đang tải sản phẩm...</div>;
//   if (error)
//     return <div className="text-center text-red-500">Lỗi: {error}</div>;

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-4 p-4 max-w-xl mx-auto flex flex-col items-center"
//     >
//       <h2 className="font-bold text-3xl mb-4 text-yellow-600">
//         Chỉnh sửa sản phẩm
//       </h2>

//       <input
//         type="text"
//         name="name"
//         placeholder="Nhập tên sản phẩm..."
//         value={form.name}
//         onChange={handleChange}
//         className="border rounded px-4 py-2 w-full"
//       />

//       <input
//         type="text"
//         name="price"
//         placeholder="Nhập giá sản phẩm..."
//         value={form.price}
//         onChange={handleChange}
//         className="border rounded px-4 py-2 w-full"
//       />

//       <input
//         type="text"
//         name="description"
//         placeholder="Nhập mô tả sản phẩm..."
//         value={form.description}
//         onChange={handleChange}
//         className="border rounded px-4 py-2 w-full"
//       />

//       <button
//         type="submit"
//         className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded font-semibold"
//       >
//         Cập nhật
//       </button>
//     </form>
//   );
// };

// export default EditProduct;
