import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";
import Message from "./components/Message";
import ProductDetail from "./screens/ProductDetail";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Admin from "./screens/Admin";
import Cart from "./screens/Cart";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {

  
  return (

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
              <Route path="*" element={<Message variant="warning">There's nothing here!</Message>} />
            </Routes>
          </Container>
        </main>

        <Footer />
      </Router>

  );
};

export default App;
