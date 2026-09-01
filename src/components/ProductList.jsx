import useProductList from '../hooks/useProductList';
import ProductItem from './ProductItem';

const ProductList = ({ onSelectProduct }) => {
  const { products, loading, error } = useProductList();

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Loading products...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductItem 
            key={product.id} 
            product={product} 
            onClick={() => onSelectProduct && onSelectProduct(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
