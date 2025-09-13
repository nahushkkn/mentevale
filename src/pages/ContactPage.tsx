import React, { useState, useRef, useEffect } from 'react';
import { Mail, MessageSquare, Phone, MapPin, Send, Heart, Sparkles, Users, Coffee } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setIsSubmitting(false);
    console.log('Contact form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center max-w-2xl mx-auto animate-scale-in">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-soft-glow">
            <Heart className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="heading-1 mb-6">Thank You!</h1>
          <p className="body-large mb-8">
            Your message has been received with gratitude. We'll get back to you within 24 hours 
            to continue this conversation about storytelling and connection.
          </p>
          <a href="/" className="btn-primary">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-32 h-32 bg-gradient-to-br from-blue-300/8 to-indigo-300/8 rounded-full blur-xl animate-gentle-float" />
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-purple-300/8 to-pink-300/8 rounded-full blur-xl animate-gentle-float delay-700" />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-gradient-to-br from-cyan-300/6 to-blue-300/6 rounded-full blur-xl animate-gentle-float delay-300" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Section */}
        <div 
          ref={(el) => sectionRefs.current[0] = el}
          className="text-center mb-16 opacity-0"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full mb-8 animate-soft-glow">
            <Mail className="h-10 w-10 text-blue-500" />
          </div>
          
          <h1 className="heading-1 mb-6 text-shadow-soft">
            Let's Start a
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Conversation
            </span>
          </h1>
          
          <p className="body-large max-w-3xl mx-auto">
            Every great story begins with a simple hello. We'd love to hear from you—whether you have 
            questions, feedback, or just want to share what's on your heart.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div 
            ref={(el) => sectionRefs.current[1] = el}
            className="opacity-0 delay-200"
          >
            <div className="card-warm">
              <div className="flex items-center mb-6">
                <MessageSquare className="h-6 w-6 text-blue-500 mr-3" />
                <h2 className="heading-2">Share Your Thoughts</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="spacing-comfortable">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-4 bg-white/50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="What should we call you?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-4 bg-white/50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                    What's on your mind?
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-4 bg-white/50 border border-slate-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  >
                    <option value="">Choose a topic...</option>
                    <option value="general">Just saying hello</option>
                    <option value="circles">Questions about circles</option>
                    <option value="technical">Technical support</option>
                    <option value="feedback">Feedback & suggestions</option>
                    <option value="partnership">Partnership inquiry</option>
                    <option value="story">I have a story to share</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full p-4 bg-white/50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-500 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Tell us your story... We're listening with open hearts."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-400 hover:to-indigo-500 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2 relative overflow-hidden group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending your message...</span>
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      <Send className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="relative z-10">Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            
            {/* Ways to Connect */}
            <div 
              ref={(el) => sectionRefs.current[2] = el}
              className="opacity-0 delay-300"
            >
              <div className="card-warm">
                <div className="flex items-center mb-6">
                  <Coffee className="h-6 w-6 text-blue-500 mr-3" />
                  <h2 className="heading-2">Ways to Connect</h2>
                </div>
                
                <div className="spacing-comfortable">
                  <div className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <MessageSquare className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="heading-4 mb-1">Community Support</h3>
                      <p className="body-regular text-blue-600 mb-1">hello@mentehub.com</p>
                      <p className="body-small">We respond with care within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Phone className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="heading-4 mb-1">Warm Conversations</h3>
                      <p className="body-regular text-blue-600 mb-1">+1 (555) 123-4567</p>
                      <p className="body-small">Monday - Friday, 9 AM - 5 PM EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="heading-4 mb-1">Our Heart</h3>
                      <p className="body-regular text-blue-600 mb-1">San Francisco, CA</p>
                      <p className="body-small">Building community worldwide</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Invitation */}
            <div 
              ref={(el) => sectionRefs.current[3] = el}
              className="opacity-0 delay-400"
            >
              <div className="bg-gradient-to-br from-blue-500/15 via-indigo-500/15 to-blue-500/15 rounded-2xl p-8 border border-blue-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <Users className="h-6 w-6 text-blue-500 mr-3" />
                    <h3 className="heading-3">Join Our Story</h3>
                  </div>
                  
                  <p className="body-regular text-blue-700 mb-6 leading-relaxed">
                    Follow along as we build something beautiful together. Get storytelling tips, 
                    community highlights, and updates about new themes and features.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href="#" 
                      className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-slate-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                    >
                      <span>Twitter</span>
                    </a>
                    <a 
                      href="#" 
                      className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-slate-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                    >
                      <span>LinkedIn</span>
                    </a>
                    <a 
                      href="#" 
                      className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-slate-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                    >
                      <span>Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Touch */}
            <div 
              ref={(el) => sectionRefs.current[4] = el}
              className="opacity-0 delay-500"
            >
              <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="heading-4">A Personal Note</h4>
                  </div>
                </div>
                
                <p className="body-small text-slate-600 italic leading-relaxed">
                  "Behind every message is a human story. Behind every question is genuine curiosity. 
                  We read every word with attention and respond with the same care we bring to our circles."
                </p>
                
                <p className="body-small text-blue-600 mt-3 font-medium">
                  — The mentehub Team
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div 
          ref={(el) => sectionRefs.current[5] = el}
          className="text-center mt-20 opacity-0 delay-600"
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="heading-2 mb-4">
              Ready to Experience a Circle?
            </h2>
            <p className="body-regular text-slate-600 mb-6">
              The best way to understand mentehub is to join us. Your first circle is always free.
            </p>
            <a 
              href="/"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Sparkles className="h-5 w-5" />
              <span>Join a Circle</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;