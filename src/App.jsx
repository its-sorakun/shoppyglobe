// App.jsx: Main layout component. Provides the global application shell including the header and rendering outlet for child routes.
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main>
        {/* Suspense catches the promise thrown by React.lazy while the JS chunk is fetched over the network, providing a fallback UI during the loading phase. */}
        <Suspense fallback={<div className="p-8 text-center text-gray-600">Loading page...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
