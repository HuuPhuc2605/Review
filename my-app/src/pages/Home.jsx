import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchP, deleteP } from "../features/products/productSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const disp = useDispatch();
  // const [searchTerm, setSearchTerm] = useState("");

  const { productL, loading, error } = useSelector((state) => state.productL);
  useEffect(() => {
    disp(fetchP());
  }, [disp]);
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      disp(deleteP(id));
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  // const filteredProducts = productL.filter((product) =>
  //   product.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  return (
    <div className="mx-auto p-16">
      <div className="flex justify-between items-center mb-6">
        {/* <input
          type="text"
          placeholder="Tìm sản phẩm theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded w-1/2 mr-4"
        /> */}
        <h1 className="text-2xl font-bold mb-6"> Danh sách sản phẩm</h1>

        <Link to={"/add"} className="bg-blue-500 rounded px-4 py-2  ">
          + Thêm sản phẩm
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-8 ">
        {/* {filteredProducts.map((product) => ( */}
        {productL.map((product) => (
          <div
            key={product.id}
            className=" bg-orange-50 flex flex-col justify-between border rounded-lg p-4 shadow-lg shodow-gray-500"
          >
            <h2 className="text-lg font-semibold mb1">{product.name} </h2>
            <p className="text-gray-800 mb2">Mô tả: {product.description}</p>
            <p className="text-gray-800 mb2">Giá: {product.price}</p>

            <div className="flex flex-row justify-between">
              <Link
                to={`/product/${product.id}`}
                className="bg-blue-500 rounded px-4 py-2 mt-8 w-22"
              >
                Chi tiết
              </Link>
              <Link
                to={`/edit/${product.id}`}
                className="bg-yellow-500 rounded px-4 py-2 mt-8 w-26"
              >
                Chỉnh sửa
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-4 mt-8 py-2 rounded"
              >
                Xoá
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

//
//
//
//
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:3001/products")
//       .then((res) => {
//         if (!res.ok) throw new Error("Lỗi khi tải sản phẩm");
//         return res.json();
//       })
//       .then((data) => setProducts(data))
//       .catch((err) => setError(err.message))
//       .finally(() => setLoading(false));
//   }, []);

//   const handleDelete = (id) => {
//     if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm?")) {
//       fetch(`http://localhost:3001/products/${id}`, {
//         method: "DELETE",
//       })
//         .then(() => setProducts(products.filter((p) => p.id !== id)))
//         .catch((err) => alert("Xoá thất bại: " + err.message));
//     }
//   };

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Lỗi: {error}</p>;

//   return (
//     <div className="mx-auto p-16">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>
//         <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded">
//           + Thêm sản phẩm
//         </Link>
//       </div>

//       <input
//         type="text"
//         placeholder="Tìm theo tên..."
//         className="border px-4 py-2 mb-6 w-full"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       <div className="grid grid-cols-3 gap-8">
//         {filteredProducts.map((product) => (
//           <div
//             key={product.id}
//             className="bg-orange-50 p-4 rounded shadow-md flex flex-col justify-between"
//           >
//             <h2 className="text-lg font-semibold">{product.name}</h2>
//             <p>Mô tả: {product.description}</p>
//             <p>Giá: {product.price}</p>
//             <div className="flex justify-between mt-4">
//               <Link
//                 to={`/product/${product.id}`}
//                 className="bg-blue-500 text-white px-3 py-1 rounded"
//               >
//                 Chi tiết
//               </Link>
//               <Link
//                 to={`/edit/${product.id}`}
//                 className="bg-yellow-500 text-white px-3 py-1 rounded"
//               >
//                 Chỉnh sửa
//               </Link>
//               <button
//                 onClick={() => handleDelete(product.id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Xoá
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
