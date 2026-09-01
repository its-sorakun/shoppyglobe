const Checkout = () => {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <form className="bg-white border rounded shadow p-6" onSubmit={(e) => { e.preventDefault(); alert('Order placed'); }}>
        <h3 className="text-lg font-semibold mb-4">User Details</h3>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input type="text" className="w-full border rounded p-2" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Address</label>
          <textarea className="w-full border rounded p-2" required></textarea>
        </div>
        
        <h3 className="text-lg font-semibold mb-4 mt-6">Order Summary</h3>
        <p className="text-gray-600 mb-6">Dummy summary info.</p>

        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded shadow hover:bg-green-700 transition">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
