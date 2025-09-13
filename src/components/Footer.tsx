import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Mail, Twitter, Facebook, Instagram, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100/80 backdrop-blur-sm border-t border-slate-200/50 relative">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-slate-800 tracking-tight">mentehub</span>
                <span className="text-xs text-blue-600/80 font-medium -mt-1">Where Hearts Connect</span>
              </div>
            </Link>
            
            <p className="text-slate-600 mb-6 max-w-md leading-relaxed">
              Creating meaningful connections through the ancient art of storytelling. 
              Join our circles and discover the transformative power of shared narratives.
            </p>
            
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span className="text-slate-700 text-sm italic">
                Every story shared builds a bridge between hearts
              </span>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="group w-10 h-10 bg-slate-200/50 hover:bg-blue-500/10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-slate-200/50 hover:border-blue-500/50"
              >
                <Twitter className="h-4 w-4 text-slate-500 group-hover:text-blue-500 transition-colors duration-300" />
              </a>
              <a 
                href="#" 
                className="group w-10 h-10 bg-slate-200/50 hover:bg-blue-500/10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-slate-200/50 hover:border-blue-500/50"
              >
                <Facebook className="h-4 w-4 text-slate-500 group-hover:text-blue-500 transition-colors duration-300" />
              </a>
              <a 
                href="#" 
                className="group w-10 h-10 bg-slate-200/50 hover:bg-blue-500/10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-slate-200/50 hover:border-blue-500/50"
              >
                <Instagram className="h-4 w-4 text-slate-500 group-hover:text-blue-500 transition-colors duration-300" />
              </a>
            </div>
          </div>
          
          {/* Platform Links */}
          <div>
            <h3 className="text-slate-800 font-semibold mb-6 relative">
              Platform
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" />
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about" 
                  className="text-slate-600 hover:text-slate-800 transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-slate-600 hover:text-slate-800 transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-slate-600 hover:text-slate-800 transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                >
                  Get In Touch
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-slate-600 hover:text-slate-800 transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                >
                  Community Guidelines
                </a>
              </li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h3 className="text-slate-800 font-semibold mb-6 relative">
              Support
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" />
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/privacy" 
                  className="text-slate-600 hover:text-slate-800 transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-slate-600 hover:text-slate-800 transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:hello@mentehub.com" 
                  className="text-slate-600 hover:text-slate-800 transition-all duration-300 text-sm hover:translate-x-1 inline-block flex items-center space-x-2"
                >
                  <Mail className="h-3 w-3" />
                  <span>Help Center</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-slate-200/50 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-slate-600 text-sm flex items-center space-x-2">
              <span>© 2025 mentehub. Made with</span>
              <Heart className="inline h-4 w-4 text-red-500 animate-pulse" />
              <span>for storytellers everywhere.</span>
            </p>
            
            <div className="flex items-center space-x-6 text-slate-500 text-sm">
              <span className="italic">Building bridges through shared stories</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </div>
          </div>
          
          {/* Inspirational Quote */}
          <div className="mt-6 pt-6 border-t border-slate-200/50 text-center">
            <p className="text-slate-500 text-sm italic">
              "In the end, we will remember not the words of our enemies, but the stories of our friends."
            </p>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/3 to-indigo-400/3 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-40 w-60 h-60 bg-gradient-to-br from-purple-400/3 to-pink-400/3 rounded-full blur-3xl" />
      </div>
    </footer>
  );
};

export default Footer;