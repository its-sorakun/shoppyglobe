import useProductList from '../hooks/useProductList';
import ProductItem from './ProductItem';
import { useSelector } from 'react-redux';
import { selectSearchTerm } from '../redux/searchSlice';

const ProductList = ({ onSelectProduct }) => {
  const { products, loading, error } = useProductList();
  const searchTerm = useSelector(selectSearchTerm);

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Loading products...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Our Products</h2>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No products found for "{searchTerm}"</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductItem 
              key={product.id} 
              product={product} 
              onClick={() => onSelectProduct && onSelectProduct(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
