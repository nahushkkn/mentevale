import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Sparkles, ArrowRight, Play, Calendar } from 'lucide-react';
import SessionScheduler from '../components/SessionScheduler';
import ParticleBackground from '../components/ParticleBackground';

const LandingPage: React.FC = () => {
  const [showScheduler, setShowScheduler] = useState(false);

  return (
    <div className="relative overflow-hidden">
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Stories Shared
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
                Together
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join intimate storytelling circles where AI guides meaningful conversations, 
              weaving personal experiences into shared narratives that connect us all.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button 
              onClick={() => setShowScheduler(true)}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-amber-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <Calendar className="h-5 w-5" />
              <span>Join a Circle</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <Link 
              to="/about" 
              className="border border-slate-600 text-slate-300 px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-800 hover:text-white transition-all duration-300 flex items-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>Learn More</span>
            </Link>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-amber-500/30 transition-all duration-300">
              <Clock className="h-12 w-12 text-amber-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-3">60-Minute Journeys</h3>
              <p className="text-slate-400 leading-relaxed">
                Thoughtfully structured sessions that take you through induction, storytelling, 
                reflection, and collective weaving of shared narratives.
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-amber-500/30 transition-all duration-300">
              <Users className="h-12 w-12 text-amber-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-3">Intimate Circles</h3>
              <p className="text-slate-400 leading-relaxed">
                Small groups of 3-5 participants create safe spaces for authentic sharing 
                and deep connection through personal stories.
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-amber-500/30 transition-all duration-300">
              <Sparkles className="h-12 w-12 text-amber-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-3">AI-Guided Weaving</h3>
              <p className="text-slate-400 leading-relaxed">
                Our AI narrator facilitates conversations and weaves individual stories 
                into beautiful collective narratives that participants can keep forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Session Scheduler Modal */}
      {showScheduler && (
        <SessionScheduler onClose={() => setShowScheduler(false)} />
      )}
    </div>
  );
};

export default LandingPage;