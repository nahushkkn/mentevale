import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, Clock, Sparkles, Mic, Video, Settings } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';

interface ThemeData {
  title: string;
  description: string;
  preview: string;
}

const WaitingRoom: React.FC = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([
    { id: '1', name: 'You', avatar: '/api/placeholder/40/40', isHost: true, ready: false },
  ]);
  const [theme, setTheme] = useState<ThemeData>({
    title: 'Loading...',
    description: 'Preparing your unique theme',
    preview: 'Your personalized theme is being crafted...'
  });
  const [timeUntilStart, setTimeUntilStart] = useState(120); // 2 minutes
  const [isReady, setIsReady] = useState(false);
  const [isLoadingTheme, setIsLoadingTheme] = useState(true);

  // Extract theme from sessionId
  const sessionTheme = sessionId?.split('-')[0] || 'wisdom';
  
  // Theme mapping for better context
  const THEME_CONTEXTS = {
    anxiety: 'anxiety and finding calm',
    burnout: 'burnout recovery and rekindling energy', 
    loneliness: 'loneliness and building connections',
    wisdom: 'life wisdom and shared experiences',
    wlb: 'work-life balance and personal fulfillment',
    transitions: 'life transitions and navigating change',
    creativity: 'creative blocks and unlocking imagination',
    relationships: 'relationships and meaningful connections'
  };

  useEffect(() => {
    // Generate dynamic theme using Anthropic API
    const generateTheme = async () => {
      try {
        const themeContext = THEME_CONTEXTS[sessionTheme as keyof typeof THEME_CONTEXTS] || 'meaningful conversations';
        const today = new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric' 
        });

        const response = await fetch('/api/haiku-generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: `Create a compelling theme for today's storytelling circle about ${themeContext}. Today is ${today}. 

            Please respond with exactly this JSON format:
            {
              "title": "An inspiring 2-4 word title for the theme",
              "description": "A brief inspiring description (max 10 words)",
              "preview": "A warm, inviting preview paragraph that sets the tone for sharing stories about ${themeContext}. Make it personal and relatable, around 2-3 sentences that would make someone feel safe to open up."
            }

            Make it feel fresh, relevant to today, and specifically tailored to ${themeContext}. Avoid generic phrases like 'explore the bridges' or 'shared journeys'.`,
            context: {
              currentPhase: 0,
              sessionTheme: sessionTheme,
              date: today
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          // Try to parse JSON from the response
          try {
            const themeData = JSON.parse(data.response);
            setTheme(themeData);
          } catch {
            // Fallback if JSON parsing fails
            const lines = data.response.split('\n').filter((line: string) => line.trim());
            setTheme({
              title: lines[0]?.replace(/['"]/g, '') || `${today.split(',')[0]} Reflections`,
              description: lines[1]?.replace(/['"]/g, '') || `Stories of ${themeContext}`,
              preview: lines.slice(2).join(' ').replace(/['"]/g, '') || `Today we gather to share our experiences with ${themeContext}. In this safe space, your story matters and your voice will be heard with compassion and understanding.`
            });
          }
        } else {
          throw new Error('Failed to generate theme');
        }
      } catch (error) {
        console.error('Error generating theme:', error);
        // Fallback theme
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        setTheme({
          title: `${today} Reflections`,
          description: `Stories of ${THEME_CONTEXTS[sessionTheme as keyof typeof THEME_CONTEXTS] || 'connection'}`,
          preview: `Welcome to today's circle. We're here to share our experiences and find connection through our stories. Whatever brought you here today, know that your voice matters and you're among friends who understand.`
        });
      } finally {
        setIsLoadingTheme(false);
      }
    };

    generateTheme();
  }, [sessionId, sessionTheme]);

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
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Welcome to Your Circle
            </h1>
            <p className="text-slate-300">
              Preparing for a meaningful storytelling experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Dynamic Theme Preview */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center mb-4">
                <Sparkles className="h-6 w-6 text-amber-400 mr-3" />
                <h2 className="text-xl font-semibold text-white">Today's Theme</h2>
                {isLoadingTheme && (
                  <div className="ml-2 w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-amber-400 mb-2">
                    {isLoadingTheme ? (
                      <div className="h-6 bg-slate-700/50 rounded animate-pulse"></div>
                    ) : (
                      theme.title
                    )}
                  </h3>
                  <p className="text-slate-300 text-sm mb-4">
                    {isLoadingTheme ? (
                      <div className="h-4 bg-slate-700/50 rounded animate-pulse"></div>
                    ) : (
                      theme.description
                    )}
                  </p>
                </div>
                
                <div className="bg-slate-700/50 rounded-lg p-4">
                  {isLoadingTheme ? (
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-600/50 rounded animate-pulse"></div>
                      <div className="h-4 bg-slate-600/50 rounded animate-pulse"></div>
                      <div className="h-4 bg-slate-600/50 rounded animate-pulse w-3/4"></div>
                    </div>
                  ) : (
                    <p className="text-slate-300 text-sm leading-relaxed italic">
                      "{theme.preview}"
                    </p>
                  )}
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
          <div className="text-center mt-6">
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