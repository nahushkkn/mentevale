import React, { useState } from 'react';
import { MessageCircle, Mic, Send } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isHost: boolean;
  isActive: boolean;
}

interface SessionPhaseProps {
  phase: {
    name: string;
    duration: number;
    description: string;
  };
  phaseIndex: number;
  participants: Participant[];
  sessionTranscript?: Array<{
    speaker: string;
    message: string;
    timestamp: number;
    phase: string;
  }>;
}

const SessionPhase: React.FC<SessionPhaseProps> = ({ 
  phase, 
  phaseIndex, 
  participants, 
  sessionTranscript = [] 
}) => {
  const [reflection, setReflection] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmitReflection = () => {
    if (reflection.trim()) {
      console.log('Submitting reflection:', reflection);
      setReflection('');
    }
  };

  const renderPhaseContent = () => {
    switch (phaseIndex) {
      case 0: // Induction
        return (
          <div className="text-center space-y-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50">
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Welcome to the Circle</h3>
              <p className="text-slate-600 leading-relaxed">
                Take a moment to settle in. Feel the presence of your fellow storytellers. 
                Together, we'll explore today's theme: <span className="text-blue-600 font-medium">Bridges and Burdens</span>
              </p>
            </div>
          </div>
        );

      case 1: // Anchor Story
        return (
          <div className="space-y-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">The Bridge Keeper's Tale</h3>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed mb-4">
                  There once was a keeper of an ancient bridge, worn smooth by countless footsteps. 
                  Each morning, she watched travelers cross carrying burdens of many kinds - some visible, 
                  others hidden deep within their hearts...
                </p>
                <p className="text-slate-600 leading-relaxed">
                  As the sun rose, she noticed that those who paused to share their stories with 
                  fellow travelers walked lighter on the other side. The bridge, it seemed, 
                  had a special magic - not in its stones, but in the connections it fostered.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
              <h4 className="text-lg font-medium text-blue-700 mb-3">Reflection Prompt</h4>
              <p className="text-slate-700">
                What bridges do you cross in your life? What burdens do you carry, and what hopes lighten your steps?
              </p>
            </div>
          </div>
        );

      case 2: // Circle Reflection
        return (
          <div className="space-y-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-slate-800">Sharing Circle</h3>
                {participants.find(p => p.isActive) && (
                  <span className="text-blue-600 text-sm font-medium">
                    {participants.find(p => p.isActive)?.name} is sharing
                  </span>
                )}
              </div>
              
              {/* Recent shares from transcript */}
              {sessionTranscript.length > 0 && (
                <div className="bg-slate-100/50 rounded-lg p-4 mb-4 max-h-32 overflow-y-auto">
                  {sessionTranscript
                    .filter(t => t.speaker !== 'AI Guide')
                    .slice(-2)
                    .map((entry, index) => (
                      <div key={index} className="mb-3 last:mb-0">
                        <div className="text-slate-700 text-sm font-medium mb-1">
                          {entry.speaker}:
                        </div>
                        <p className="text-slate-600 text-sm italic leading-relaxed">
                          "{entry.message}"
                        </p>
                      </div>
                    ))
                  }
                </div>
              )}

              <div className="space-y-3">
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Share your story when it's your turn..."
                  className="w-full p-4 bg-slate-100/50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-500 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
                
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      isRecording 
                        ? 'bg-red-500 text-white' 
                        : 'bg-slate-300 text-slate-700 hover:bg-slate-400'
                    }`}
                  >
                    <Mic className="h-4 w-4" />
                    <span>{isRecording ? 'Recording...' : 'Voice'}</span>
                  </button>
                  
                  <button
                    onClick={handleSubmitReflection}
                    disabled={!reflection.trim()}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 3: // Weaving
        return (
          <div className="space-y-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50">
              <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center">
                Weaving Your Stories Together
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg p-6 border border-blue-500/30">
                  <p className="text-slate-700 leading-relaxed italic">
                    {sessionTranscript.find(t => t.speaker === 'AI Guide' && t.phase === 'Weaving')?.message ||
                    "In this circle, we discovered bridges of many kinds. Each story resonated with courage, transformation, and hope. The AI is weaving your collective narrative..."}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 text-blue-600 text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                    <span>AI is weaving your collective story...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4: // Closure
        return (
          <div className="text-center space-y-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50">
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">Circle's End</h3>
              
              <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg p-6 mb-6">
                <p className="text-slate-700 text-lg italic leading-relaxed">
                  "Stories shared return to us<br />
                  Bridges crossed, together<br />
                  Hearts lighter now"
                </p>
              </div>
              
              <p className="text-slate-600 leading-relaxed">
                Thank you for sharing your stories with such openness and courage. 
                May the connections made here continue to enrich your journey.
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Session Complete</h3>
            <p className="text-slate-600">Your storytelling journey has ended. Thank you for participating!</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {renderPhaseContent()}
    </div>
  );
};

export default SessionPhase;