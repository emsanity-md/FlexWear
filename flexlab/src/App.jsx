import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import "./styles/main.css";

export default function App() {
  /*
   * Cart state lives here for the session only. It is intentionally never
   * persisted — see the note in Cart.jsx about refreshing.
   */
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth screens render their own chrome */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Store shell */}
        <Route
          path="/*"
          element={
            <div className="flex min-h-screen flex-col bg-bone">
              <Header cartCount={cartCount} />
              <main className="flex-1">
                <Routes>
                  <Route
                    path="/"
                    element={<Home addToCart={addToCart} />}
                  />
                  <Route
                    path="/products"
                    element={<ProductList addToCart={addToCart} />}
                  />
                  <Route
                    path="/cart"
                    element={
                      <CartPage
                        cart={cart}
                        updateQuantity={updateQuantity}
                        removeFromCart={removeFromCart}
                      />
                    }
                  />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<Home addToCart={addToCart} />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}