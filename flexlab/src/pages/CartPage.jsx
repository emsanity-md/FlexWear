import Cart from "../components/Cart";

export default function CartPage({ cart, updateQuantity, removeFromCart }) {
  return (
    <Cart
      cart={cart}
      updateQuantity={updateQuantity}
      removeFromCart={removeFromCart}
    />
  );
}