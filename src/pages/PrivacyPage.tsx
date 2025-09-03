import React from 'react';
import { Shield, Lock, Eye, Database } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Shield className="h-16 w-16 text-amber-400 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-slate-300">
            Your stories are sacred. Here's how we protect them.
          </p>
          <p className="text-slate-400 mt-4">
            Last updated: January 2025
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <Lock className="h-6 w-6 text-green-400 mr-3" />
              Information We Collect
            </h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white">Account Information:</strong> Email address, name, and payment information for billing purposes.
              </p>
              <p>
                <strong className="text-white">Session Data:</strong> Stories and reflections shared during circles, used only to create your collective narrative artifacts.
              </p>
              <p>
                <strong className="text-white">Technical Data:</strong> Device information, browser type, and connection quality to ensure optimal session performance.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <Eye className="h-6 w-6 text-blue-400 mr-3" />
              How We Use Your Information
            </h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white">Story Weaving:</strong> Our AI processes shared stories in real-time to create collective narratives. These stories are not stored permanently unless you explicitly save your artifact.
              </p>
              <p>
                <strong className="text-white">Service Improvement:</strong> We analyze session patterns (not content) to improve our facilitation and matching algorithms.
              </p>
              <p>
                <strong className="text-white">Communication:</strong> We may send session reminders, platform updates, and community highlights (you can opt out anytime).
              </p>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <Database className="h-6 w-6 text-purple-400 mr-3" />
              Data Protection & Storage
            </h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white">Encryption:</strong> All data is encrypted in transit and at rest using industry-standard protocols.
              </p>
              <p>
                <strong className="text-white">Session Privacy:</strong> Live sessions use end-to-end encryption. Stories are processed for weaving but not permanently stored unless you save your artifact.
              </p>
              <p>
                <strong className="text-white">Data Retention:</strong> Account data is kept only as long as your account is active. Session artifacts are stored only if you choose to save them.
              </p>
              <p>
                <strong className="text-white">Your Rights:</strong> You can access, modify, or delete your data at any time. Contact us for data export or account deletion.
              </p>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Our Commitment to You
            </h2>
            <p className="text-slate-200 leading-relaxed text-lg">
              Your stories are deeply personal, and we treat them with the respect they deserve. 
              We will never sell your data, share it with third parties for marketing purposes, 
              or use your stories for any purpose beyond creating your circle experience. 
              Your trust is the foundation of our community.
            </p>
          </div>

          <div className="text-center">
            <p className="text-slate-400 mb-4">
              Questions about our privacy practices?
            </p>
            <a 
              href="/contact"
              className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 font-medium"
            >
              <span>Contact our privacy team</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;