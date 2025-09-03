import React from 'react';
import { Check, Sparkles, Users, Infinity } from 'lucide-react';

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Choose Your Storytelling Journey
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Start with free circles, then continue with flexible pricing that fits your lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Trial */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <div className="text-center mb-6">
              <Sparkles className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Free Trial</h3>
              <p className="text-slate-400">Discover the magic</p>
            </div>
            
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-white">8</span>
              <span className="text-slate-400 ml-2">free circles</span>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-slate-300">
                <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Access to all storytelling themes
              </li>
              <li className="flex items-center text-slate-300">
                <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Full 60-minute guided sessions
              </li>
              <li className="flex items-center text-slate-300">
                <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Download story artifacts
              </li>
              <li className="flex items-center text-slate-300">
                <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                No commitment required
              </li>
            </ul>

            <button className="w-full bg-slate-600 text-white py-3 rounded-lg font-semibold hover:bg-slate-500 transition-colors">
              Get Started Free
            </button>
          </div>

          {/* Per Session */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <div className="text-center mb-6">
              <Users className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Per Circle</h3>
              <p className="text-slate-400">Pay as you participate</p>
            </div>
            
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-white">$5</span>
              <span className="text-slate-400 ml-2">per session</span>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-slate-300">
                <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Perfect for occasional participation
              </li>
              <li className="flex items-center text-slate-300">
                <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                No monthly commitment
              </li>
              <li className="flex items-center text-slate-300">
                <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                All premium features included
              </li>
              <li className="flex items-center text-slate-300">
                <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Secure payment processing
              </li>
            </ul>

            <button className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors">
              Pay Per Circle
            </button>
          </div>

          {/* Monthly Unlimited */}
          <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/50 relative">
            <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Most Popular
            </div>
            
            <div className="text-center mb-6">
              <Infinity className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Unlimited</h3>
              <p className="text-slate-400">For dedicated storytellers</p>
            </div>
            
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-white">$15</span>
              <span className="text-slate-400 ml-2">per month</span>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-slate-300">
                <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Unlimited storytelling circles
              </li>
              <li className="flex items-center text-slate-300">
                <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Priority booking for popular times
              </li>
              <li className="flex items-center text-slate-300">
                <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Story collection and archive
              </li>
              <li className="flex items-center text-slate-300">
                <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Cancel anytime
              </li>
            </ul>

            <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-amber-400 hover:to-orange-400 transition-all transform hover:scale-105">
              Start Unlimited
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">
            All plans include secure payment processing via Stripe and PayPal
          </p>
          <p className="text-slate-500 text-sm">
            Questions about pricing? <a href="/contact" className="text-amber-400 hover:text-amber-300">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;