import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productList = [], isLoading, error } = useSelector((s) => s.product);
  const product = productList.find((p) => String(p.id) === id);

  useEffect(() => {
    if (!productList.length) dispatch(fetchProducts());
  }, [productList.length, dispatch]);

  if (isLoading) return <p className="text-center py-10">Đang tải...</p>;
  if (error || !product)
    return (
      <p className="text-red-500 py-10">{error || "Không tìm thấy sản phẩm"}</p>
    );

  return (
    <div className="  text-xl">
      <h1 className="text-3xl text-blue-600 mb-32 font-bold">
        Thông tin chi tiết sản phẩm
      </h1>
      <h2 className="text-2xl font-bold mb-4"> {product.name}</h2>
      <p className="text-xl text-gray-700 mb-2">
        Giá: {product.price.toLocaleString()}đ
      </p>
      <p className="text-gray-600">Mô tả: {product.description}</p>
      <p className="text-gray-600">Hàng tồn kho: {product.stock}</p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Quay lại
      </button>
    </div>
  );
};

export default ProductDetail;
