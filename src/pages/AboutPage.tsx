import React, { useEffect, useRef } from 'react';
import { BookOpen, Users, Heart, Sparkles, Circle, Handshake, Compass } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';

const AboutPage: React.FC = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <ParticleBackground />
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 right-20 w-24 h-24 bg-gradient-to-br from-blue-300/10 to-indigo-300/10 rounded-full blur-xl animate-gentle-float" />
        <div className="absolute top-96 left-10 w-32 h-32 bg-gradient-to-br from-purple-300/8 to-pink-300/8 rounded-full blur-xl animate-gentle-float delay-700" />
        <div className="absolute bottom-96 right-1/4 w-20 h-20 bg-gradient-to-br from-cyan-300/8 to-blue-300/8 rounded-full blur-xl animate-gentle-float delay-500" />
      </div>
      
      <div className="relative z-10 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div 
            ref={(el) => sectionRefs.current[0] = el}
            className="text-center mb-20 opacity-0"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full mb-8 animate-soft-glow">
              <BookOpen className="h-10 w-10 text-blue-500" />
            </div>
            
            <h1 className="heading-1 mb-6 text-shadow-soft">
              The Story Behind
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                mentehub
              </span>
            </h1>
            
            <p className="body-large max-w-3xl mx-auto text-center">
              Building bridges through the ancient art of shared storytelling, 
              where every voice matters and every story creates connection.
            </p>
          </div>

          {/* Mission Section */}
          <div 
            ref={(el) => sectionRefs.current[1] = el}
            className="mb-20 opacity-0 delay-200"
          >
            <div className="card-warm max-w-4xl mx-auto">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400/20 to-pink-400/20 rounded-full flex items-center justify-center mr-4">
                  <Heart className="h-6 w-6 text-red-500" />
                </div>
                <h2 className="heading-2">Our Mission</h2>
              </div>
              
              <div className="story-text space-y-6">
                <p>
                  In a world increasingly connected yet emotionally distant, mentehub creates 
                  sacred spaces for authentic human connection. We believe that storytelling is 
                  humanity's oldest technology for building empathy, understanding, and community.
                </p>
                
                <p>
                  Through AI-guided circles, we're reviving this ancient practice for the modern world, 
                  where busy professionals, students, nomads, and wisdom keepers can pause, reflect, 
                  and share the stories that shape who we are.
                </p>
                
                <blockquote className="quote-text border-l-4 border-blue-400/50 pl-6 my-8">
                  "Every story shared is a bridge built between hearts, 
                  every circle a sanctuary where vulnerability becomes strength."
                </blockquote>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div 
            ref={(el) => sectionRefs.current[2] = el}
            className="mb-20 opacity-0 delay-300"
          >
            <h2 className="heading-2 text-center mb-12">What We Believe</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-warm group">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="heading-3 mb-3">Intimate Connection</h3>
                    <p className="body-regular">
                      Small circles of 3-5 participants create the perfect environment for vulnerable sharing 
                      and deep listening. Every voice matters, every story has value, and every person 
                      deserves to be truly heard.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-warm group">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="heading-3 mb-3">AI-Enhanced Wisdom</h3>
                    <p className="body-regular">
                      Our AI facilitator doesn't replace human connection—it enhances it. By weaving 
                      individual stories into collective narratives, it reveals patterns and wisdom 
                      that emerge naturally from shared experience.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-warm group">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Circle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="heading-3 mb-3">Sacred Space</h3>
                    <p className="body-regular">
                      Every circle begins with intention-setting and ends with blessing. We honor the 
                      courage it takes to share authentically and create containers where vulnerability 
                      is met with compassion.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-warm group">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Handshake className="h-6 w-6 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="heading-3 mb-3">Building Bridges</h3>
                    <p className="body-regular">
                      Stories connect us across differences of age, culture, and experience. Through 
                      sharing our journeys, we discover the universal threads that bind all human hearts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* The Journey Section */}
          <div 
            ref={(el) => sectionRefs.current[3] = el}
            className="mb-20 opacity-0 delay-400"
          >
            <div className="bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-blue-400/10 rounded-3xl p-8 border border-blue-400/20">
              <h2 className="heading-2 text-center mb-8">The Five-Phase Journey</h2>
              <p className="body-large text-center mb-10 text-blue-700">
                Each circle follows a sacred rhythm designed to create safety, inspire sharing, 
                and weave individual stories into collective wisdom.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
                {[
                  { 
                    name: 'Induction', 
                    time: '5 min', 
                    desc: 'Creating sacred space together',
                    icon: Compass,
                    color: 'from-purple-400 to-purple-500'
                  },
                  { 
                    name: 'Anchor', 
                    time: '5 min', 
                    desc: 'AI story sets the theme',
                    icon: BookOpen,
                    color: 'from-blue-400 to-blue-500'
                  },
                  { 
                    name: 'Reflection', 
                    time: '30 min', 
                    desc: 'Hearts open through sharing',
                    icon: Heart,
                    color: 'from-red-400 to-pink-500'
                  },
                  { 
                    name: 'Weaving', 
                    time: '15 min', 
                    desc: 'Stories become collective wisdom',
                    icon: Sparkles,
                    color: 'from-indigo-400 to-blue-500'
                  },
                  { 
                    name: 'Closure', 
                    time: '5 min', 
                    desc: 'Blessing and gratitude',
                    icon: Circle,
                    color: 'from-green-400 to-emerald-500'
                  },
                ].map((phase, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${phase.color} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                        <phase.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white text-slate-700 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <h4 className="heading-4 mb-1">{phase.name}</h4>
                    <p className="text-blue-600 text-sm font-medium mb-2">{phase.time}</p>
                    <p className="body-small text-slate-600">{phase.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div 
            ref={(el) => sectionRefs.current[4] = el}
            className="text-center opacity-0 delay-500"
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="heading-2 mb-6">Ready to Begin Your Journey?</h2>
              <p className="body-large mb-8 text-slate-600">
                Join thousands who have discovered the transformative power of shared storytelling. 
                Your story matters, and your voice is needed in our circles.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/"
                  className="btn-primary inline-flex items-center justify-center space-x-2"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Join a Circle</span>
                </a>
                
                <a 
                  href="/contact"
                  className="btn-secondary inline-flex items-center justify-center space-x-2"
                >
                  <Heart className="h-5 w-5" />
                  <span>Get in Touch</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;