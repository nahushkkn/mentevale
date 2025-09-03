import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Sparkles, ArrowRight, Play, Calendar, Heart, Zap, Star } from 'lucide-react';
import SessionScheduler from '../components/SessionScheduler';
import ParticleBackground from '../components/ParticleBackground';

const LandingPage: React.FC = () => {
  const [showScheduler, setShowScheduler] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    { text: "I found my voice again through these circles", author: "Sarah, Marketing Director" },
    { text: "The connections I've made here feel deeper than years of networking", author: "Alex, Digital Nomad" },
    { text: "Finally, a space where my story matters", author: "Jordan, University Student" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <ParticleBackground />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-sm animate-float" />
        <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-sm animate-float-delayed" />
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-sm animate-float-slow" />
      </div>
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            {/* Animated heading */}
            <div className="mb-6 relative">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-2 leading-tight">
                <span className="inline-block animate-fade-in-up">Stories</span>{' '}
                <span className="inline-block animate-fade-in-up animation-delay-200">Shared</span>
              </h1>
              <div className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 animate-fade-in-up animation-delay-400">
                  Together
                </span>
              </div>
              
              {/* Subtle brand tagline */}
              <p className="text-amber-200/60 text-sm font-light tracking-wider mt-2 animate-fade-in animation-delay-600">
                Where Hearts Connect Through Stories
              </p>
            </div>
            
            <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-800">
              Join intimate storytelling circles where AI guides meaningful conversations, 
              weaving personal experiences into shared narratives that connect us all.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up animation-delay-1000">
            <button 
              onClick={() => setShowScheduler(true)}
              className="group bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-amber-400 hover:to-orange-400 transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <Calendar className="h-5 w-5 relative z-10 group-hover:animate-pulse" />
              <span className="relative z-10">Join a Circle</span>
              <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <Link 
              to="/about" 
              className="group border border-slate-600 text-slate-300 px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-800 hover:text-white transition-all duration-500 flex items-center space-x-2 hover:border-slate-500"
            >
              <Play className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Learn More</span>
            </Link>
          </div>
          
          {/* Testimonial Carousel */}
          <div className="mb-16 animate-fade-in animation-delay-1200">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5" />
              <div className="relative z-10">
                <Star className="h-6 w-6 text-amber-400 mx-auto mb-3" />
                <p className="text-lg text-white italic mb-4 transition-all duration-500">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <p className="text-amber-300 text-sm">
                  — {testimonials[currentTestimonial].author}
                </p>
              </div>
            </div>
          </div>
          
          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade-in-up animation-delay-1400">
            <div className="group bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-amber-500/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <Clock className="h-12 w-12 text-amber-400 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-white mb-3">60-Minute Journeys</h3>
                <p className="text-slate-400 leading-relaxed">
                  Thoughtfully structured sessions that take you through induction, storytelling, 
                  reflection, and collective weaving of shared narratives.
                </p>
              </div>
            </div>
            
            <div className="group bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-amber-500/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <Users className="h-12 w-12 text-amber-400 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-white mb-3">Intimate Circles</h3>
                <p className="text-slate-400 leading-relaxed">
                  Small groups of 3-5 participants create safe spaces for authentic sharing 
                  and deep connection through personal stories.
                </p>
              </div>
            </div>
            
            <div className="group bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-amber-500/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <Sparkles className="h-12 w-12 text-amber-400 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold text-white mb-3">AI-Guided Weaving</h3>
                <p className="text-slate-400 leading-relaxed">
                  Our AI narrator facilitates conversations and weaves individual stories 
                  into beautiful collective narratives that participants can keep forever.
                </p>
              </div>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="mt-20 animate-fade-in animation-delay-1600">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: '1000+', label: 'Stories Shared', icon: Heart },
                { number: '500+', label: 'Circle Members', icon: Users },
                { number: '95%', label: 'Feel More Connected', icon: Zap },
                { number: '4.9/5', label: 'Average Rating', icon: Star }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-amber-500/30 transition-all duration-300">
                    <stat.icon className="h-8 w-8 text-amber-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Session Scheduler Modal */}
      {showScheduler && (
        <SessionScheduler onClose={() => setShowScheduler(false)} />
      )}
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-float-slow {
          animation: float 4s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-1200 { animation-delay: 1.2s; }
        .animation-delay-1400 { animation-delay: 1.4s; }
        .animation-delay-1600 { animation-delay: 1.6s; }
      `}</style>
    </div>
  );
};

export default LandingPage;