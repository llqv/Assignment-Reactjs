import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useAppDispatch } from "./app/hook";
import ProductAdd from "./admin/product/product-add";
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutWebsite from "./layouts/LayoutWebsite";
import Login from "./components/auths/login";
import Detailproduct from "./components/home/product/detailproduct";
import ProductList from "./components/home/product/product-list";
import Product from "./admin/product/product";
import ProductEdit from "./admin/product/product-edit";
import LayoutAuth from "./layouts/LayoutAuth";
import Register from "./components/auths/register";
function App() {
  const dispatch = useAppDispatch();
  // const isLogin = useAppSelector((state) => state.auth.isLogin);

  return (
    <div className="App">
      {/* state isLogin {isLogin ? "Đã login" : "Chưa login"} */}
      {/* <button onClick={() => dispatch(login())}>Change state</button> */}
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route index element={<ProductList />} />
          <Route path="products" element={<ProductList />} />
          <Route path="product/:id/detail" element={<Detailproduct />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<h1>Dashboard</h1>} />
          <Route path="products" element={<Product />} />
          <Route path="products/add" element={<ProductAdd />} />
          <Route path="products/:id/edit" element={<ProductEdit />} />
        </Route>
        <Route path="/auth" element={<LayoutAuth />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
