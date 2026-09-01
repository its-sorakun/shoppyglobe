import { useSelector } from 'react-redux';
import { selectCartItems } from '../redux/cartSlice';
import CartItem from './CartItem';

const Cart = () => {
  const items = useSelector(selectCartItems);
  const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      <div className="bg-white border rounded shadow p-6">
        {items.length === 0 ? (
          <p className="text-gray-600 text-center py-8">Your cart is empty.</p>
        ) : (
          <>
            <div className="mb-4">
              {items.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className="flex justify-between items-center mt-6 pt-6 border-t">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-xl font-bold">${totalAmount.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
