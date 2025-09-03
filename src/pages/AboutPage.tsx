import React from 'react';
import { BookOpen, Users, Heart, Sparkles } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';

const AboutPage: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      
      <div className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <BookOpen className="h-16 w-16 text-amber-400 mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              The Story Behind Mentevale
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Building bridges through the ancient art of shared storytelling
            </p>
          </div>

          <div className="space-y-12">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Heart className="h-6 w-6 text-red-400 mr-3" />
                Our Mission
              </h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                In a world increasingly connected yet emotionally distant, Mentevale creates sacred spaces 
                for authentic human connection. We believe that storytelling is humanity's oldest technology 
                for building empathy, understanding, and community. Through AI-guided circles, we're reviving 
                this ancient practice for the modern world.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                <Users className="h-10 w-10 text-amber-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">Intimate Connection</h3>
                <p className="text-slate-300 leading-relaxed">
                  Small circles of 3-5 participants create the perfect environment for vulnerable sharing 
                  and deep listening. Every voice matters, every story has value.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                <Sparkles className="h-10 w-10 text-amber-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">AI-Guided Wisdom</h3>
                <p className="text-slate-300 leading-relaxed">
                  Our AI facilitator doesn't replace human connection—it enhances it. By weaving 
                  individual stories into collective narratives, it reveals patterns and wisdom 
                  that emerge naturally from shared experience.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-8 border border-amber-500/30">
              <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                The Five-Phase Journey
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                {[
                  { name: 'Induction', time: '5 min', desc: 'Sacred space creation' },
                  { name: 'Anchor', time: '5 min', desc: 'AI story & prompt' },
                  { name: 'Reflection', time: '30 min', desc: 'Personal sharing' },
                  { name: 'Weaving', time: '15 min', desc: 'Collective narrative' },
                  { name: 'Closure', time: '5 min', desc: 'Blessing & departure' },
                ].map((phase, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold mb-2 mx-auto">
                      {index + 1}
                    </div>
                    <h4 className="text-white font-medium mb-1">{phase.name}</h4>
                    <p className="text-amber-200 text-sm font-medium mb-1">{phase.time}</p>
                    <p className="text-slate-300 text-xs">{phase.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-slate-300 mb-8">
                Join thousands who have discovered the power of shared storytelling
              </p>
              <a 
                href="/"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-amber-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105"
              >
                <BookOpen className="h-5 w-5" />
                <span>Join a Circle</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;