import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b shadow-md">
      <div className="flex container mx-auto flex justify-between items-center py-4 px-6">
        
        {/* Left Side - Logo/Image */}
        <div className="flex items-center">
          <img src="your-logo-url.png" alt="Logo" className="h-10" />
        </div>
        
        {/* Right Side - Links */}
        <div>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/signup"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
