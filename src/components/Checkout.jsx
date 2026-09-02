// Checkout.jsx: Component handling the final checkout process. Displays the cart summary and processes the simulated order placement.
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems, clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (items.length === 0) return;

    setOrderPlaced(true);

    // The redirect is intentionally delayed here. Executing navigate() immediately causes the component 
    // to unmount instantly, preventing visual processing of the success toast before navigation occurs.
    setTimeout(() => {
      dispatch(clearCart());
      navigate('/');
    }, 2500);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto relative">
      {orderPlaced && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl font-bold z-50 flex items-center space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Order placed successfully! Redirecting...</span>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <form className="bg-white border rounded shadow p-6" onSubmit={handlePlaceOrder}>
        <h3 className="text-lg font-semibold mb-4">User Details</h3>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input type="text" className="w-full border rounded p-2 focus:ring focus:ring-blue-200" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Address</label>
          <textarea className="w-full border rounded p-2 focus:ring focus:ring-blue-200" rows="3" required></textarea>
        </div>

        <h3 className="text-lg font-semibold mb-4 mt-6 border-b pb-2">Order Summary</h3>
        {items.length === 0 ? (
          <p className="text-gray-500 mb-6 italic">No items in your cart.</p>
        ) : (
          <div className="mb-6 bg-gray-50 p-4 rounded border">
            <ul className="space-y-3 mb-4">
              {items.map(item => (
                <li key={item.id} className="flex justify-between text-gray-700">
                  <span>{item.title} (x{item.quantity})</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-bold text-lg border-t pt-3">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded shadow hover:bg-green-700 transition font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={items.length === 0}
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
