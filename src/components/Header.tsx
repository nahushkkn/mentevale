import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <BookOpen className="h-8 w-8 text-amber-400 group-hover:text-amber-300 transition-colors" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white tracking-tight">Mentevale</span>
              <span className="text-xs text-amber-200/80 font-medium">Stories Shared Together</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-slate-300 hover:text-white transition-colors">About</Link>
            <Link to="/pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</Link>
            <Link to="/faq" className="text-slate-300 hover:text-white transition-colors">FAQ</Link>
            <Link to="/contact" className="text-slate-300 hover:text-white transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors">
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">Account</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;