import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Clock, ArrowRight, Calendar, Sparkles, Star, MessageCircle, Shield, Zap } from 'lucide-react';
import SessionScheduler from '../components/SessionScheduler';

const LandingPage: React.FC = () => {
  const [showScheduler, setShowScheduler] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const themes = [
    { 
      id: 'anxiety', 
      name: 'Anxiety', 
      icon: '🌅', 
      color: 'from-blue-400 to-cyan-400',
      description: 'Finding calm in the storm',
      participants: 12
    },
    { 
      id: 'burnout', 
      name: 'Burnout', 
      icon: '🔥', 
      color: 'from-orange-400 to-red-400',
      description: 'Rekindling your inner flame',
      participants: 8
    },
    { 
      id: 'loneliness', 
      name: 'Loneliness', 
      icon: '🤗', 
      color: 'from-purple-400 to-pink-400',
      description: 'You are not alone',
      participants: 15
    },
    { 
      id: 'wisdom', 
      name: 'Wisdom', 
      icon: '🌳', 
      color: 'from-green-400 to-emerald-400',
      description: 'Sharing life lessons',
      participants: 6
    },
    { 
      id: 'wlb', 
      name: 'Work-Life Balance', 
      icon: '⚖️', 
      color: 'from-indigo-400 to-purple-400',
      description: 'Finding your equilibrium',
      participants: 11
    },
    { 
      id: 'transitions', 
      name: 'Life Transitions', 
      icon: '🌉', 
      color: 'from-teal-400 to-blue-400',
      description: 'Navigating change together',
      participants: 9
    },
    { 
      id: 'creativity', 
      name: 'Creative Blocks', 
      icon: '🎨', 
      color: 'from-pink-400 to-rose-400',
      description: 'Unlocking imagination',
      participants: 7
    },
    { 
      id: 'relationships', 
      name: 'Relationships', 
      icon: '💫', 
      color: 'from-yellow-400 to-orange-400',
      description: 'Connecting hearts and minds',
      participants: 13
    }
  ];

  const testimonials = [
    { text: "I found my voice again through these circles", author: "Sarah, Marketing Director", theme: "Burnout" },
    { text: "The connections here feel deeper than years of networking", author: "Alex, Digital Nomad", theme: "Loneliness" },
    { text: "Finally, a space where my story matters", author: "Jordan, University Student", theme: "Anxiety" }
  ];

  const features = [
    {
      icon: MessageCircle,
      title: 'Interactive Flash Cards',
      description: 'Unique conversation starters revealed just for you'
    },
    {
      icon: Shield,
      title: 'Safe & Supportive',
      description: 'Small circles with authentic, judgment-free sharing'
    },
    {
      icon: Zap,
      title: '30-Minute Sessions',
      description: 'Meaningful connections in just half an hour'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    setShowScheduler(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      
      {/* Gentle floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Welcome Message */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-6 shadow-lg">
              <Heart className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              Welcome to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mt-2">
                mentehub
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join intimate storytelling circles where your experiences matter. 
              Choose a theme that speaks to your heart and connect with others on similar journeys.
            </p>

            {/* Primary CTA */}
            <div className="mb-16">
              <button 
                onClick={() => setShowScheduler(true)}
                className="group bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-10 py-5 rounded-full font-semibold text-xl hover:from-blue-400 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center space-x-4 mx-auto relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <Calendar className="h-6 w-6 relative z-10" />
                <span className="relative z-10">Find Your Circle</span>
                <ArrowRight className="h-6 w-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <p className="text-slate-500 text-lg mt-6">
                ✨ Free during beta • No commitments • Just authentic connection
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-3 text-lg">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Theme Selection Grid */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-slate-700 mb-8 text-center">
              What's on your mind today?
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  className="group relative bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-slate-200/50 hover:border-slate-300/50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${theme.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <span className="text-2xl">{theme.icon}</span>
                  </div>
                  
                  <h3 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">{theme.name}</h3>
                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">{theme.description}</p>
                  
                  <div className="flex items-center justify-center space-x-1 text-xs text-slate-500">
                    <Users className="h-3 w-3" />
                    <span>{theme.participants} this week</span>
                  </div>
                  
                  {/* Hover indicator */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-3xl mx-auto">
            {[
              { number: '1000+', label: 'Stories Shared', icon: Heart },
              { number: '500+', label: 'Circle Members', icon: Users },
              { number: '30min', label: 'Per Circle', icon: Clock },
              { number: '4.9/5', label: 'Average Rating', icon: Star }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50">
                <stat.icon className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-slate-800">{stat.number}</div>
                <div className="text-slate-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mb-12">
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-slate-200/30">
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 italic mb-4 leading-relaxed text-lg">
                "{testimonials[currentTestimonial].text}"
              </p>
              <div className="text-base">
                <p className="text-blue-600 font-medium">{testimonials[currentTestimonial].author}</p>
                <p className="text-slate-500">{testimonials[currentTestimonial].theme} Circle</p>
              </div>
            </div>
          </div>

          {/* Secondary CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">
              Ready to share your story?
            </h3>
            <p className="text-slate-600 mb-6 max-w-xl mx-auto">
              Join thousands who have found connection, healing, and growth through authentic storytelling.
            </p>
            <button 
              onClick={() => setShowScheduler(true)}
              className="group bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-indigo-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3 mx-auto relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <Sparkles className="h-5 w-5 relative z-10" />
              <span className="relative z-10">Start Your Journey</span>
              <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Session Scheduler Modal */}
      {showScheduler && (
        <SessionScheduler 
          onClose={() => setShowScheduler(false)} 
          selectedTheme={selectedTheme}
        />
      )}
    </div>
  );
};

export default LandingPage;