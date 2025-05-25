import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
} from "../features/products/productSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { productList, isLoading, error } = useSelector((s) => s.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="text-center py-10 text-blue-600 animate-pulse">
        Đang tải danh sách sản phẩm...
      </div>
    );
  if (error)
    return <div className="text-center py-10 text-red-600"> Lỗi: {error}</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Danh sách sản phẩm</h1>
        <Link
          to="/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Thêm mới
        </Link>
      </div>

      {!productList.length ? (
        <p className="text-center text-gray-500">Không có sản phẩm nào.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6 ">
          {productList.map(({ id, name, price, description, stock }) => (
            <div
              key={id}
              className="flex flex-col border rounded p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{name}</h2>
              <p className="text-gray-600 text-sm">
                Giá: {price.toLocaleString()}đ
              </p>
              <p className="text-gray-500 mt-2 line-clamp-2">
                Mô tả: {description}
              </p>
              <p className="text-gray-500 mt-2 line-clamp-2">
                Hàng còn lại: {stock}
              </p>
              <div className="mt-auto flex  justify-between  ">
                <Link
                  to={`/product/${id}`}
                  className="bg-blue-400 hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Chi tiết
                </Link>
                <Link
                  to={`/edit/${id}`}
                  className="bg-yellow-400 hover:bg-yellow-700 px-4 py-2 rounded"
                >
                  Sửa
                </Link>
                <button
                  onClick={() =>
                    window.confirm("Bạn có chắc muốn xóa sản phẩm này?") &&
                    dispatch(deleteProduct(id))
                  }
                  className="bg-red-400 hover:bg-red-700 px-4 py-2 rounded"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
