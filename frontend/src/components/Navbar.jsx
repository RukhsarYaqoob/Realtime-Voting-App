import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { voteApi } from "../features/votes/voteApi";
import { pollApi } from "../features/polls/pollApi"; 
import { useDispatch } from "react-redux";
import {
  Menu,
  X,
  Home,
  PlusCircle,
  BarChart3,
  Search,
  LogIn,
  UserPlus,
  LogOut,
  User,
  Vote
} from "lucide-react";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
  dispatch(voteApi.util.resetApiState());
  dispatch(pollApi.util.resetApiState());

  logout(); 
  setIsMenuOpen(false);
  navigate("/");
};

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    ...(isAuthenticated
      ? [
          { name: "Create Poll", href: "/create", icon: PlusCircle },
          { name: "Browse Polls", href: "/browse", icon: Search },
          { name: "Vote Polls", href: "/vote-polls", icon: Vote },
          { name: "Result", href: "/result", icon: BarChart3 },
        ]
      : []),
  ];

  return (
    <nav className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">  
          <div className="flex-shrink-0 flex items-center w-48">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Poll<span className="text-red-600">App</span>
              </span>
            </Link>
          </div>
          <div className="hidden md:flex flex-grow justify-center">
            <div className="flex space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <link.icon className="h-4 w-4 mr-2" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center justify-end space-x-3 w-48">
            {isAuthenticated ? (
              <>
                <div className="flex items-center text-sm text-gray-700">
                  <User className="h-4 w-4 mr-1" />
                  <span className="truncate max-w-[80px]">{user?.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <link.icon className="h-5 w-5 mr-3" />
                {link.name}
              </Link>
            ))}
            <div className="border-t pt-3 mt-3">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-sm text-gray-700 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Hello, {user?.username}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="h-5 w-5 mr-3" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700 mt-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus className="h-5 w-5 mr-3" />
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;