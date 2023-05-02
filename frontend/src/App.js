import { Container } from "react-bootstrap";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ProductDes from "./pages/ProductDes";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import UserList from "./pages/UserList";
import UserEdit from "./pages/UserEdit";
import ProductList from "./pages/ProductList";
import ProductEdit from "./pages/ProductEdit";
import OrderList from "./pages/OrderList";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" Component={Home} exact />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/profile" Component={Profile} />
            <Route path="/shipping" Component={Shipping} />
            <Route path="/payment" Component={Payment} />
            <Route path="/admin/userlist" Component={UserList} />
            <Route path="/admin/user/:id/edit" Component={UserEdit} />
            <Route path="/admin/productlist" Component={ProductList} />
            <Route path='/admin/orderlist' Component={OrderList} />
            <Route path="/admin/productlist/:id/edit" Component={ProductEdit} />
            <Route path="/place_order" Component={PlaceOrder} />
            <Route path="/order/:id" Component={Order} />
            <Route path="/product/:id" Component={ProductDes} />
            <Route path="/cart/:id?" Component={Cart} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
