import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Mail, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <BookOpen className="h-8 w-8 text-amber-400" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white tracking-tight">Mentevale</span>
                <span className="text-xs text-amber-200/80 font-medium">Stories Shared Together</span>
              </div>
            </Link>
            <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
              Creating meaningful connections through the ancient art of storytelling. 
              Join our circles and discover the power of shared narratives.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/faq" className="text-slate-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700/50 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2025 Mentevale. Made with <Heart className="inline h-4 w-4 text-red-400" /> for storytellers.
          </p>
          <p className="text-slate-400 text-sm mt-2 sm:mt-0">
            Building bridges through shared stories
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;