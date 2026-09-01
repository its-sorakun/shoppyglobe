const ProductItem = ({ product, onClick }) => {
  return (
    <div 
      className="bg-white border rounded shadow p-4 flex flex-col justify-between cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <div>
        <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover rounded mb-4" />
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-gray-600 mb-2">${product.price}</p>
      </div>
      <button 
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        onClick={(e) => {
          e.stopPropagation(); // prevent triggering the product click
          console.log('Add to cart logic will go here');
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
