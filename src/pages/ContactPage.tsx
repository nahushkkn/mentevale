import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, MapPin, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Mail className="h-16 w-16 text-amber-400 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-300">
            We'd love to hear from you. Reach out with questions, feedback, or just to say hello.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-semibold text-white mb-6">Send us a message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Question</option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing & Payments</option>
                  <option value="feedback">Feedback & Suggestions</option>
                  <option value="partnership">Partnership Inquiry</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 resize-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Tell us how we can help..."
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-amber-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-2xl font-semibold text-white mb-6">Other ways to reach us</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MessageSquare className="h-6 w-6 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium mb-1">Community Support</h3>
                    <p className="text-slate-400">support@mentevale.com</p>
                    <p className="text-slate-500 text-sm">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium mb-1">Phone Support</h3>
                    <p className="text-slate-400">+1 (555) 123-4567</p>
                    <p className="text-slate-500 text-sm">Monday - Friday, 9 AM - 5 PM EST</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium mb-1">Headquarters</h3>
                    <p className="text-slate-400">San Francisco, CA</p>
                    <p className="text-slate-500 text-sm">Building community worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-amber-500/20 rounded-2xl p-8 border border-purple-500/30">
              <h3 className="text-xl font-semibold text-white mb-4">
                Join Our Community
              </h3>
              <p className="text-slate-200 mb-6 leading-relaxed">
                Follow us for storytelling tips, community highlights, and updates about new features and themes.
              </p>
              
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;