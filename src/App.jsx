import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import { useState } from 'react';

function App() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [view, setView] = useState('home'); // 'home' | 'cart'

  const handleNav = (targetView) => {
    setView(targetView);
    if (targetView === 'home') setSelectedProductId(null);
  };

  const handleSelectProduct = (id) => {
    setSelectedProductId(id);
    setView('detail');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header onNav={handleNav} />
      
      <main>
        {view === 'cart' && <Cart />}
        {view === 'detail' && selectedProductId && (
          <ProductDetail 
            id={selectedProductId} 
            onBack={() => setView('home')} 
          />
        )}
        {view === 'home' && (
          <ProductList onSelectProduct={handleSelectProduct} />
        )}
      </main>
    </div>
  );
}

export default App;
