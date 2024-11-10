import { BookOpen, LogIn, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../lib/store';

interface NavbarProps {
  onAuthClick: () => void;
}

export default function Navbar({ onAuthClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, setCurrentUser } = useStore();

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">TutorMatch</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-indigo-600">Find Tutors</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">Become a Tutor</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">Premium</a>
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Welcome, {currentUser.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 text-gray-600 hover:text-indigo-600">Find Tutors</a>
            <a href="#" className="block px-3 py-2 text-gray-600 hover:text-indigo-600">Become a Tutor</a>
            <a href="#" className="block px-3 py-2 text-gray-600 hover:text-indigo-600">Premium</a>
            {currentUser ? (
              <>
                <span className="block px-3 py-2 text-gray-600">Welcome, {currentUser.name}</span>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-indigo-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={onAuthClick}
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-indigo-600"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}