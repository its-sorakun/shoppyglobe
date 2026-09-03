// Header.jsx: Global navigation component. Contains the application branding, the active cart item count, and the search input for filtering products.
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearchTerm, selectSearchTerm } from '../redux/searchSlice';
import { selectCartTotalItems } from '../redux/cartSlice';
import { selectAuth, logout } from '../redux/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const cartTotal = useSelector(selectCartTotalItems);
  const { isAuthenticated } = useSelector(selectAuth);

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md flex flex-wrap gap-4 justify-between items-center">
      <Link to="/" className="text-2xl font-bold whitespace-nowrap">ShoppyGlobe</Link>
      
      <div className="flex-1 max-w-xl mx-4">
        {/* Tying a controlled input directly to the Redux dispatch means every keystroke 
            synchronously updates global state. This architecture allows the ProductList to filter items in real-time as typing occurs. */}
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          className="w-full px-4 py-2 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <nav>
        <ul className="flex space-x-6 items-center">
          <li>
            <Link to="/" className="hover:text-blue-200">Home</Link>
          </li>
          <li>
            <Link to="/cart" className="flex items-center hover:text-blue-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              Cart
              {cartTotal > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartTotal}
                </span>
              )}
            </Link>
          </li>
          
          {isAuthenticated ? (
            <li>
              <button 
                onClick={() => dispatch(logout())} 
                className="hover:text-blue-200 focus:outline-none"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-blue-200">Login</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-blue-200">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
