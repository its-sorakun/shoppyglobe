const CartItem = ({ item }) => {
  return (
    <div className="flex items-center justify-between border-b py-4">
      <div>
        <h3 className="font-semibold">Product Name Placeholder</h3>
        <p className="text-gray-600">$0.00</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center border rounded">
          <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200">-</button>
          <span className="px-3">1</span>
          <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200">+</button>
        </div>
        <button className="text-red-500 hover:text-red-700">Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
