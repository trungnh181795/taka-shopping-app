import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";

import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";
import Message from "./components/Message";
import ProductDetail from "./screens/ProductDetail";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Admin from "./screens/Admin";
import Cart from "./screens/Cart";
import Order from "./screens/Order";
import User, { UserPassword, UserProfile, UserPurchase } from "./screens/User";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const GoToTop = () => {
  const routePath = useLocation();
  const onTop = () => {
    window.scrollTo(0, 0);
  }
  useEffect(() => {
    onTop()
  }, [routePath]);

  return null;
}

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }

  }, [windowWidth])

  return (
    <>
      {windowWidth >= 768 ? (
        <Router>
          <Header />

          <main style={{minHeight: '80vh', backgroundColor: '#f2f3f4'}}>
            <Container>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/user/" element={<User />}>
                  <Route path="profile" element={<UserProfile />} />
                  <Route path="change-password" element={<UserPassword />} />
                  <Route path="purchases" element={<UserPurchase />} />
                </Route>
                <Route path="/order" element={<Order />} />
                <Route path="*" element={<Message variant="warning">There's nothing here!</Message>} />
              </Routes>
            </Container>
          </main>

          <Footer />
          <GoToTop />
        </Router>
      ) : (
        <Message variant="warning">Please use our Mobile App for best experience!</Message>
      )}
    </>
  );
};

export default App;
