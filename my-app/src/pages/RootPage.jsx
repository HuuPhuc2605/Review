import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./Home";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import ProductDetail from "./ProductDetail";
function RootPage() {
  return (
    <BrowserRouter>
      <div className="flex justify-between items-center p-4 bg-orange-200 h-32">
        <nav className="space-x-8">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? " bg-orange-500 text-xl font-bold py-2 px-4 rounded"
                : "text-gray-500  text-xl font-bold py-2 px-4 rounded"
            }
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/add"
            end
            className={({ isActive }) =>
              isActive
                ? " bg-orange-500 text-xl font-bold py-2 px-4 rounded"
                : "text-gray-500  text-xl font-bold py-2 px-4 rounded"
            }
          >
            Thêm sản phẩm
          </NavLink>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RootPage;
