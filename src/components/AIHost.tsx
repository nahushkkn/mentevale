import React from 'react';
import { Sparkles, BookOpen } from 'lucide-react';

interface AIHostProps {
  currentPhase: number;
  phases: Array<{
    name: string;
    duration: number;
    description: string;
  }>;
}

const AIHost: React.FC<AIHostProps> = ({ currentPhase, phases }) => {
  const getHostMessage = () => {
    switch (currentPhase) {
      case 0:
        return "Welcome, storytellers. I'm here to guide our journey together. Let's create a space of trust and openness where every voice matters.";
      case 1:
        return "Listen closely to this tale of bridges and burdens. Let it stir your own memories and prepare your heart for sharing.";
      case 2:
        return "This is our sacred time for sharing. Speak from your heart, and know that your story matters deeply to this circle.";
      case 3:
        return "I'm weaving the threads of your stories into something beautiful - a tapestry that captures the wisdom you've shared together.";
      case 4:
        return "Our circle draws to a close, but the connections made here continue. Carry these shared stories with you on your journey.";
      default:
        return "Welcome to Mentevale.";
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-white font-semibold">AI Guide</h3>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
          
          <p className="text-slate-200 leading-relaxed">
            {getHostMessage()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIHost;