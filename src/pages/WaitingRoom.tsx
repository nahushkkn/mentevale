import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, Clock, Sparkles, Mic, Video, Settings } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';

const WaitingRoom: React.FC = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([
    { id: '1', name: 'You', avatar: '/api/placeholder/40/40', isHost: true, ready: false },
  ]);
  const [theme, setTheme] = useState({
    title: 'Monday Reflections',
    description: 'Stories of resilience and new beginnings',
    preview: 'Today we explore the bridges we cross in our daily lives - both literal and metaphorical. What burdens do we carry, and what hopes do we nurture as we move forward?'
  });
  const [timeUntilStart, setTimeUntilStart] = useState(120); // 2 minutes
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate participants joining
    const timer = setTimeout(() => {
      setParticipants(prev => [
        ...prev,
        { id: '2', name: 'Sarah M.', avatar: '/api/placeholder/40/40', isHost: false, ready: true },
        { id: '3', name: 'Alex R.', avatar: '/api/placeholder/40/40', isHost: false, ready: true },
      ]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilStart(prev => {
        if (prev <= 1) {
          navigate(`/session/${sessionId}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionId, navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Welcome to Your Circle
            </h1>
            <p className="text-slate-300 text-lg">
              Preparing for a meaningful storytelling experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Theme Preview */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center mb-4">
                <Sparkles className="h-6 w-6 text-amber-400 mr-3" />
                <h2 className="text-xl font-semibold text-white">Today's Theme</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-amber-400 mb-2">{theme.title}</h3>
                  <p className="text-slate-300 text-sm mb-4">{theme.description}</p>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <p className="text-slate-300 text-sm leading-relaxed italic">
                    "{theme.preview}"
                  </p>
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-amber-400 mr-3" />
                  <h2 className="text-xl font-semibold text-white">Circle Members</h2>
                </div>
                <span className="text-slate-400 text-sm">{participants.length}/5</span>
              </div>
              
              <div className="space-y-3 mb-6">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {participant.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{participant.name}</p>
                        {participant.isHost && (
                          <span className="text-amber-400 text-xs">You</span>
                        )}
                      </div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      participant.ready ? 'bg-green-400' : 'bg-yellow-400'
                    }`} />
                  </div>
                ))}
                
                {/* Empty slots */}
                {Array.from({ length: 5 - participants.length }).map((_, index) => (
                  <div key={`empty-${index}`} className="flex items-center p-3 bg-slate-700/20 rounded-lg border-2 border-dashed border-slate-600">
                    <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                      <span className="text-slate-400 text-xs">?</span>
                    </div>
                    <span className="ml-3 text-slate-400">Waiting for participant...</span>
                  </div>
                ))}
              </div>

              {/* Audio/Video Controls */}
              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <button className="p-2 bg-slate-600 rounded-full hover:bg-slate-500 transition-colors">
                    <Mic className="h-4 w-4 text-white" />
                  </button>
                  <button className="p-2 bg-slate-600 rounded-full hover:bg-slate-500 transition-colors">
                    <Video className="h-4 w-4 text-white" />
                  </button>
                  <button className="p-2 bg-slate-600 rounded-full hover:bg-slate-500 transition-colors">
                    <Settings className="h-4 w-4 text-white" />
                  </button>
                </div>
                
                <button
                  onClick={() => setIsReady(!isReady)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isReady
                      ? 'bg-green-500 text-white'
                      : 'bg-amber-500 text-white hover:bg-amber-400'
                  }`}
                >
                  {isReady ? 'Ready!' : 'Mark Ready'}
                </button>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="text-center mt-8">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 inline-block">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-amber-400 mr-2" />
                <span className="text-slate-300">Circle begins in</span>
              </div>
              <div className="text-3xl font-bold text-white">
                {formatTime(timeUntilStart)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;