import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
