import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchID } from "../features/products/productSlice";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams(); // useParams được sử dụng để trích xuất ID sản phẩm từ URL
  const disp = useDispatch();
  const nav = useNavigate(); // useNavigate được sử dụng để điều hướng đến các trang khác
  const { selectedP, loading, error } = useSelector((state) => state.productL);

  useEffect(() => {
    disp(fetchID(id));
  }, [disp, id]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!selectedP) {
    return <div>Không tìm thấy sản phẩm</div>;
  }
  return (
    <div className="mx-auto p-16">
      <h2 className="text-3xl font-bold text-blue-600 mb-8">
        Thông tin chi tiết sản phẩm{" "}
      </h2>
      <div className="space-y-4 text-xl border w-96 rounded-lg p-4 shadow-lg shadow-gray-500">
        <h2 className="text-lg font-semibold mb1">{selectedP.name} </h2>
        <p className="text-gray-800 mb2">Mô tả: {selectedP.description}</p>
        <p className="text-gray-800 mb2">Giá: {selectedP.price}</p>

        <button
          onClick={() => nav("/")}
          className="bg-blue-500 rounded px-4 py-2 mt-8"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;

//
//
//
//
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const nav = useNavigate();

//   const [selectedP, setSelectedP] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`http://localhost:3001/products/${id}`);
//         if (!res.ok) throw new Error("Không tìm thấy sản phẩm");
//         const data = await res.json();
//         setSelectedP(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   if (loading) return <div>Đang tải sản phẩm...</div>;
//   if (error) return <div className="text-red-500">Lỗi: {error}</div>;
//   if (!selectedP) return <div>Không tìm thấy sản phẩm</div>;

//   return (
//     <div className="mx-auto p-16">
//       <h2 className="text-3xl font-bold text-blue-600 mb-8">
//         Thông tin chi tiết sản phẩm
//       </h2>
//       <div className="space-y-4 text-xl border w-96 rounded-lg p-4 shadow-lg shadow-gray-500">
//         <h2 className="text-lg font-semibold mb-1">{selectedP.name}</h2>
//         <p className="text-gray-800 mb-2">Mô tả: {selectedP.description}</p>
//         <p className="text-gray-800 mb-2">Giá: {selectedP.price}</p>
//         <button
//           onClick={() => nav("/")}
//           className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 mt-8"
//         >
//           Quay lại
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;
