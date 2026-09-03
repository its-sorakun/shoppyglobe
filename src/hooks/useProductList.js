// useProductList.js: Custom React hook for fetching and managing product data from the external API.
import { useState, useEffect } from 'react';

const useProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // An empty dependency array is intentionally passed to this effect so it only fires
    // once on mount. Omitting it would cause React to re-fire the fetch on every render, resulting in a continuous loop of API requests.
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        
        // Map the backend data structure to match what the frontend expects,
        // specifically translating the MongoDB _id string into the standard id field.
        const mappedProducts = data.map(p => ({
          ...p,
          id: p._id,
          title: p.name,
          thumbnail: 'https://placehold.co/150x150?text=No+Image'
        }));
        setProducts(mappedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useProductList;
