import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

// For now, this expects an 'id' prop to fetch data.
// Later, this will use route parameters (e.g., useParams() from react-router-dom)
const ProductDetail = ({ id, onBack }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Only fetch if we have an ID (helpful for our current manual routing)
    if (!id) return;

    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading product details...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  if (!product) return <div className="p-8 text-center">Product not found</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="mb-4 text-blue-600 hover:underline"
      >
        &larr; Back to Products
      </button>
      <div className="bg-white border rounded shadow p-6 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img src={product.thumbnail} alt={product.title} className="w-full object-cover rounded bg-gray-100" />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
          <p className="text-gray-500 mb-4">{product.category} | {product.brand}</p>
          <p className="text-gray-800 mb-6">{product.description}</p>
          <p className="text-2xl font-semibold mb-6">${product.price}</p>
          <button 
            className="bg-blue-600 text-white py-3 px-6 rounded shadow hover:bg-blue-700 transition"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
