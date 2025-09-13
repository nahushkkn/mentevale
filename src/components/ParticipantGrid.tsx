import React from 'react';
import { Mic, MicOff, Video, VideoOff, Volume2 } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isHost: boolean;
  isActive: boolean;
}

interface ParticipantGridProps {
  participants: Participant[];
}

const ParticipantGrid: React.FC<ParticipantGridProps> = ({ participants }) => {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
        <Volume2 className="h-5 w-5 text-blue-500 mr-2" />
        Circle Members
      </h3>
      
      <div className="space-y-4">
        {participants.map((participant) => (
          <div 
            key={participant.id}
            className={`relative p-4 rounded-xl border transition-all duration-300 ${
              participant.isActive
                ? 'border-blue-400/50 bg-blue-400/10 shadow-lg shadow-blue-400/20'
                : 'border-slate-200/50 bg-slate-100/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {participant.name.charAt(0)}
                    </span>
                  </div>
                  {participant.isActive && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                  )}
                </div>
                
                <div>
                  <p className="text-slate-800 font-medium">{participant.name}</p>
                  {participant.isHost && (
                    <span className="text-blue-600 text-xs">You</span>
                  )}
                  {participant.isActive && (
                    <span className="text-green-600 text-xs">Speaking</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-1.5 bg-slate-200/50 rounded-full hover:bg-slate-300/50 transition-colors">
                  <Mic className="h-3 w-3 text-green-600" />
                </button>
                <button className="p-1.5 bg-slate-200/50 rounded-full hover:bg-slate-300/50 transition-colors">
                  <Video className="h-3 w-3 text-blue-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Your controls */}
      <div className="mt-6 pt-4 border-t border-slate-200/50">
        <div className="flex justify-center space-x-4">
          <button className="p-3 bg-slate-300 rounded-full hover:bg-slate-400 transition-colors">
            <Mic className="h-5 w-5 text-slate-700" />
          </button>
          <button className="p-3 bg-slate-300 rounded-full hover:bg-slate-400 transition-colors">
            <Video className="h-5 w-5 text-slate-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantGrid;