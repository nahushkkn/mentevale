import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, User, Menu, X, Heart } from 'lucide-react';
import SignInModal from './SignInModal'; // Import the SignInModal component

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false); // Add state for SignIn modal

  return (
    <>
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-blue-500/25">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                  mentehub
                </span>
                <span className="text-xs text-blue-500/70 font-medium -mt-1">
                  Where Hearts Connect
                </span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/about" 
                className="text-slate-600 hover:text-slate-800 transition-all duration-300 font-medium relative group"
              >
                About
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:w-full transition-all duration-300" />
              </Link>
              <Link 
                to="/faq" 
                className="text-slate-600 hover:text-slate-800 transition-all duration-300 font-medium relative group"
              >
                FAQ
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:w-full transition-all duration-300" />
              </Link>
              <Link 
                to="/community-guidelines" 
                className="text-slate-600 hover:text-slate-800 transition-all duration-300 font-medium relative group"
              >
                Guidelines
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:w-full transition-all duration-300" />
              </Link>
              <Link 
                to="/contact" 
                className="text-slate-600 hover:text-slate-800 transition-all duration-300 font-medium relative group"
              >
                Contact
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:w-full transition-all duration-300" />
              </Link>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              
              {/* Login Button (Desktop) - Now opens modal */}
              <button 
                onClick={() => setIsSignInOpen(true)}
                className="hidden sm:flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-all duration-300 bg-slate-100/50 hover:bg-slate-200/50 px-4 py-2 rounded-full border border-slate-200/50 hover:border-slate-300 group"
              >
                <User className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Sign In</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-slate-800 transition-colors duration-300 hover:bg-slate-100/50 rounded-lg"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-slate-200/50 py-4 animate-fade-in-up">
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/about" 
                  className="text-slate-600 hover:text-slate-800 transition-colors duration-300 font-medium px-4 py-2 hover:bg-slate-100/50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/faq" 
                  className="text-slate-600 hover:text-slate-800 transition-colors duration-300 font-medium px-4 py-2 hover:bg-slate-100/50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link 
                  to="/community-guidelines" 
                  className="text-slate-600 hover:text-slate-800 transition-colors duration-300 font-medium px-4 py-2 hover:bg-slate-100/50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Guidelines
                </Link>
                <Link 
                  to="/contact" 
                  className="text-slate-600 hover:text-slate-800 transition-colors duration-300 font-medium px-4 py-2 hover:bg-slate-100/50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                
                <div className="border-t border-slate-200/50 pt-4">
                  <button 
                    onClick={() => {
                      setIsSignInOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors duration-300 font-medium px-4 py-2 hover:bg-slate-100/50 rounded-lg w-full"
                  >
                    <User className="h-4 w-4" />
                    <span>Sign In</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Subtle bottom glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
      </header>

      {/* SignIn Modal */}
      <SignInModal 
        isOpen={isSignInOpen} 
        onClose={() => setIsSignInOpen(false)} 
      />
    </>
  );
};

export default Header;