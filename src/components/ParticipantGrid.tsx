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
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Volume2 className="h-5 w-5 text-amber-400 mr-2" />
        Circle Members
      </h3>
      
      <div className="space-y-4">
        {participants.map((participant) => (
          <div 
            key={participant.id}
            className={`relative p-4 rounded-xl border transition-all duration-300 ${
              participant.isActive
                ? 'border-amber-500/50 bg-amber-500/10 shadow-lg shadow-amber-500/20'
                : 'border-slate-600/50 bg-slate-700/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {participant.name.charAt(0)}
                    </span>
                  </div>
                  {participant.isActive && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800 animate-pulse" />
                  )}
                </div>
                
                <div>
                  <p className="text-white font-medium">{participant.name}</p>
                  {participant.isHost && (
                    <span className="text-amber-400 text-xs">You</span>
                  )}
                  {participant.isActive && (
                    <span className="text-green-400 text-xs">Speaking</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-1.5 bg-slate-600/50 rounded-full hover:bg-slate-500/50 transition-colors">
                  <Mic className="h-3 w-3 text-green-400" />
                </button>
                <button className="p-1.5 bg-slate-600/50 rounded-full hover:bg-slate-500/50 transition-colors">
                  <Video className="h-3 w-3 text-blue-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Your controls */}
      <div className="mt-6 pt-4 border-t border-slate-700/50">
        <div className="flex justify-center space-x-4">
          <button className="p-3 bg-slate-600 rounded-full hover:bg-slate-500 transition-colors">
            <Mic className="h-5 w-5 text-white" />
          </button>
          <button className="p-3 bg-slate-600 rounded-full hover:bg-slate-500 transition-colors">
            <Video className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantGrid;