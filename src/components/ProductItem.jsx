import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white border rounded shadow p-4 flex flex-col justify-between cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div>
        <img src={product.thumbnail} alt={product.title} loading="lazy" className="w-full h-48 object-cover rounded mb-4" />
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-gray-600 mb-2">${product.price}</p>
      </div>
      <button 
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        onClick={(e) => {
          e.stopPropagation(); // prevent triggering the product click
          dispatch(addToCart(product));
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
