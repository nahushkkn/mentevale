import React from 'react';
import { FileText, Users, CreditCard, AlertTriangle } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <FileText className="h-16 w-16 text-amber-400 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-slate-300">
            Guidelines for our storytelling community
          </p>
          <p className="text-slate-400 mt-4">
            Last updated: January 2025
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <Users className="h-6 w-6 text-blue-400 mr-3" />
              Community Guidelines
            </h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white">Respect and Kindness:</strong> Treat all participants with dignity and respect. Listen actively and respond with empathy.
              </p>
              <p>
                <strong className="text-white">Confidentiality:</strong> What's shared in the circle stays in the circle. Do not share others' stories outside the session without explicit permission.
              </p>
              <p>
                <strong className="text-white">Authentic Sharing:</strong> Share genuine experiences and reflections. Fictional stories should be clearly identified as such.
              </p>
              <p>
                <strong className="text-white">Inclusive Space:</strong> We welcome storytellers of all backgrounds, beliefs, and experiences. Discriminatory language or behavior is not tolerated.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <CreditCard className="h-6 w-6 text-green-400 mr-3" />
              Payment & Billing
            </h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white">Free Trial:</strong> Your first 8 circles are completely free with no payment information required.
              </p>
              <p>
                <strong className="text-white">Per-Session Billing:</strong> $5 per session, charged immediately upon booking. Refunds available if cancelled 2+ hours before session start.
              </p>
              <p>
                <strong className="text-white">Monthly Subscriptions:</strong> $15/month for unlimited circles, billed monthly. Cancel anytime with no penalties.
              </p>
              <p>
                <strong className="text-white">Payment Processing:</strong> Secure payments via Stripe and PayPal. We never store your payment information on our servers.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Platform Usage
            </h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                By using Mentevale, you agree to participate in good faith, respect other community members, 
                and use our platform only for its intended purpose of storytelling and connection.
              </p>
              <p>
                You retain ownership of your stories and experiences. By participating, you grant Mentevale 
                limited rights to facilitate session experiences and create collective narrative artifacts.
              </p>
              <p>
                We reserve the right to remove users who violate community guidelines or engage in 
                disruptive behavior that harms the experience for others.
              </p>
            </div>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <AlertTriangle className="h-6 w-6 text-orange-400 mr-3" />
              Important Disclaimers
            </h2>
            <div className="space-y-4 text-slate-200 leading-relaxed">
              <p>
                Mentevale provides storytelling experiences for connection and reflection, not therapy 
                or medical treatment. If you're dealing with serious mental health concerns, 
                please consult qualified professionals.
              </p>
              <p>
                While we strive to create safe spaces, we cannot guarantee all participants will 
                behave appropriately. Report any concerning behavior immediately to our support team.
              </p>
              <p>
                Technical issues may occasionally disrupt sessions. We provide reasonable 
                technical support and will offer makeup sessions when possible.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-slate-400 mb-4">
              Questions about these terms?
            </p>
            <a 
              href="/contact"
              className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 font-medium"
            >
              <span>Get in touch</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;