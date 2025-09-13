import React, { useEffect, useRef } from 'react';
import { Heart, Users, Shield, Star, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';

const CommunityGuidelinesPage: React.FC = () => {
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

  const guidelines = [
    {
      title: "Listen with Your Heart",
      description: "Give your full attention to each storyteller. Practice deep, empathetic listening without planning your response.",
      icon: Heart,
      color: "from-red-400 to-pink-500"
    },
    {
      title: "Share Authentically",
      description: "Speak from your genuine experience. Vulnerability creates connection, but only share what feels comfortable.",
      icon: Star,
      color: "from-yellow-400 to-orange-500"
    },
    {
      title: "Respect Sacred Space",
      description: "What's shared in the circle stays in the circle. Honor the courage it takes to be vulnerable.",
      icon: Shield,
      color: "from-green-400 to-emerald-500"
    },
    {
      title: "Include Everyone",
      description: "Make space for all voices. If you've spoken, invite others to share. If you haven't, consider contributing.",
      icon: Users,
      color: "from-blue-400 to-indigo-500"
    }
  ];

  const expectations = [
    {
      category: "Communication",
      rules: [
        "Use \"I\" statements when sharing your experiences",
        "Avoid giving unsolicited advice or trying to \"fix\" others",
        "Ask permission before offering support or suggestions",
        "Keep responses focused on the current theme"
      ]
    },
    {
      category: "Behavior",
      rules: [
        "Join sessions on time and stay for the full duration when possible",
        "Mute yourself when not speaking to minimize distractions",
        "Keep your video on if comfortable, but it's optional",
        "Avoid multitasking during sessions - be fully present"
      ]
    },
    {
      category: "Respect",
      rules: [
        "Honor different perspectives and life experiences",
        "Refrain from judgment, criticism, or debate",
        "Use people's preferred names and pronouns",
        "Respect cultural, religious, and personal differences"
      ]
    }
  ];

  const unacceptableBehavior = [
    "Sharing others' stories outside the circle without permission",
    "Making disparaging comments about other participants",
    "Promoting products, services, or personal agendas",
    "Disrupting sessions with inappropriate content or behavior",
    "Recording sessions without explicit consent from all participants",
    "Using discriminatory language based on race, gender, religion, or other identities"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 right-20 w-24 h-24 bg-gradient-to-br from-blue-300/10 to-indigo-300/10 rounded-full blur-xl animate-gentle-float" />
        <div className="absolute bottom-96 left-10 w-32 h-32 bg-gradient-to-br from-purple-300/8 to-pink-300/8 rounded-full blur-xl animate-gentle-float delay-700" />
      </div>
      
      <div className="relative z-10 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div 
            ref={(el) => sectionRefs.current[0] = el}
            className="text-center mb-20 opacity-0"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full mb-8 animate-soft-glow">
              <Heart className="h-10 w-10 text-blue-500" />
            </div>
            
            <h1 className="heading-1 mb-6 text-shadow-soft">
              Community
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Guidelines
              </span>
            </h1>
            
            <p className="body-large max-w-3xl mx-auto text-center">
              These guidelines help us create safe, meaningful spaces where authentic 
              connection flourishes through the power of shared storytelling.
            </p>
          </div>

          {/* Core Principles */}
          <div 
            ref={(el) => sectionRefs.current[1] = el}
            className="mb-20 opacity-0 delay-200"
          >
            <h2 className="heading-2 text-center mb-12">Our Core Principles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {guidelines.map((guideline, index) => (
                <div key={index} className="card-warm group">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${guideline.color} rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <guideline.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="heading-3 mb-3">{guideline.title}</h3>
                      <p className="body-regular">{guideline.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Expectations */}
          <div 
            ref={(el) => sectionRefs.current[2] = el}
            className="mb-20 opacity-0 delay-300"
          >
            <h2 className="heading-2 text-center mb-12">What We Expect</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {expectations.map((category, index) => (
                <div key={index} className="card-warm">
                  <h3 className="heading-3 mb-6 text-blue-600">{category.category}</h3>
                  <ul className="space-y-3">
                    {category.rules.map((rule, ruleIndex) => (
                      <li key={ruleIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="body-regular">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Unacceptable Behavior */}
          <div 
            ref={(el) => sectionRefs.current[3] = el}
            className="mb-20 opacity-0 delay-400"
          >
            <div className="bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 rounded-3xl p-8 border border-orange-500/20">
              <div className="flex items-center justify-center mb-6">
                <AlertTriangle className="h-8 w-8 text-orange-500 mr-3" />
                <h2 className="heading-2 text-orange-700">What's Not Acceptable</h2>
              </div>
              
              <p className="body-large text-center mb-8 text-orange-800">
                To maintain our safe and supportive environment, these behaviors are not permitted:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {unacceptableBehavior.map((behavior, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-white/40 rounded-lg p-4">
                    <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0 mt-2.5" />
                    <span className="text-slate-700">{behavior}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reporting and Consequences */}
          <div 
            ref={(el) => sectionRefs.current[4] = el}
            className="mb-20 opacity-0 delay-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              <div className="card-warm">
                <div className="flex items-center mb-6">
                  <Shield className="h-6 w-6 text-blue-500 mr-3" />
                  <h3 className="heading-3">Reporting Concerns</h3>
                </div>
                <div className="space-y-4">
                  <p className="body-regular">
                    If you experience or witness behavior that violates our guidelines:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-sm">Report immediately via our in-session reporting feature</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-sm">Email us at support@mentehub.com with details</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-sm">All reports are confidential and taken seriously</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card-warm">
                <div className="flex items-center mb-6">
                  <AlertTriangle className="h-6 w-6 text-orange-500 mr-3" />
                  <h3 className="heading-3">Consequences</h3>
                </div>
                <div className="space-y-4">
                  <p className="body-regular">
                    Violations may result in:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0 mt-2.5" />
                      <span className="text-sm">Warning and guidance for minor infractions</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0 mt-2.5" />
                      <span className="text-sm">Temporary suspension from participating</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0 mt-2.5" />
                      <span className="text-sm">Permanent removal for serious violations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div 
            ref={(el) => sectionRefs.current[5] = el}
            className="text-center opacity-0 delay-600"
          >
            <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl p-8 border border-blue-500/20">
              <Sparkles className="h-8 w-8 text-blue-500 mx-auto mb-4" />
              <h2 className="heading-2 mb-4">Join Our Community</h2>
              <p className="body-large mb-8 text-slate-700">
                Ready to be part of a community built on respect, authenticity, and meaningful connection?
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/"
                  className="btn-primary inline-flex items-center justify-center space-x-2"
                >
                  <Heart className="h-5 w-5" />
                  <span>Join a Circle</span>
                </a>
                
                <a 
                  href="/contact"
                  className="btn-secondary inline-flex items-center justify-center space-x-2"
                >
                  <Users className="h-5 w-5" />
                  <span>Ask Questions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityGuidelinesPage;