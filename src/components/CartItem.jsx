// CartItem.jsx: Component rendering a single row within the shopping cart. Handles dispatching quantity updates and removals for its specific item.
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { updateQuantity, removeFromCart } from '../redux/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleDecrease = () => {
    // This conditional guards against rapid double-clicks firing the dispatch before React can re-render and disable the button, preventing invalid negative quantities from reaching the Redux store.
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleIncrease = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center gap-4">
        <img src={item.thumbnail} alt={item.title} loading="lazy" className="w-16 h-16 object-cover rounded" />
        <div>
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-gray-600">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center border rounded">
          <button 
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="px-3">{item.quantity}</span>
          <button 
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
        <button 
          className="text-red-500 hover:text-red-700"
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
