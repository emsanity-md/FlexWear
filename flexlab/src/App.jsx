import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import CartPage from "./pages/CartPage";
import About from "./pages/About";
import "./styles/main.css";

/*
 * There is no account system, so there are no account screens. Every route
 * renders inside the store shell, and the old /login and /register addresses
 * redirect home rather than 404ing on a link that used to work.
 */
function StoreLayout({ cartCount }) {
  return (
    <div className="flex min-h-screen flex-col bg-bone">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <ScrollToTop />

      <Header cartCount={cartCount} />

      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

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
        <Route element={<StoreLayout cartCount={cartCount} />}>
          <Route path="/" element={<Home addToCart={addToCart} />} />
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

          {/* Retired account screens. Kept as redirects so old links land somewhere useful. */}
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
