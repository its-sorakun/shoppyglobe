import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import { useState } from 'react';

// Main App component
// Currently using a simple state to switch between list and detail views
// until React Router is installed and implemented.
function App() {
  const [selectedProductId, setSelectedProductId] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      
      <main>
        {selectedProductId ? (
          <ProductDetail 
            id={selectedProductId} 
            onBack={() => setSelectedProductId(null)} 
          />
        ) : (
          <ProductList onSelectProduct={(id) => setSelectedProductId(id)} />
        )}
      </main>
    </div>
  );
}

export default App;
