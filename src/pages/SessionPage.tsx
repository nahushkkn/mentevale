import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Mic, MicOff, Video, VideoOff, Clock, Users, PhoneOff, MessageSquare, RotateCcw } from 'lucide-react';
import StoryArtifact from '../components/StoryArtifact';
import ScratchCard from '../components/ScratchCard';

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isHost: boolean;
  isActive: boolean;
  isMuted: boolean;
  hasVideo: boolean;
  isSpeaking: boolean;
  flashCards?: {
    current: number;
    cards: Array<{
      question: string;
      isRevealed: boolean;
      category: 'opener' | 'deep' | 'reflection';
    }>;
  };
}

interface FlashCard {
  id: string;
  question: string;
  category: 'opener' | 'deep' | 'reflection';
  used: boolean;
}

// Generate theme-specific prompts
const getThemePrompts = (theme: string): { [key: string]: string[] } => {
  const prompts: { [key: string]: { [key: string]: string[] } } = {
    anxiety: {
      opener: [
        "What's one small thing that brings you peace?",
        "When do you feel most at ease?",
        "Share a moment when you felt truly calm"
      ],
      deep: [
        "What would you tell someone experiencing anxiety for the first time?",
        "How has anxiety taught you something about yourself?",
        "What does courage look like when you're anxious?"
      ],
      reflection: [
        "What are you learning to accept about uncertainty?",
        "How do you show yourself compassion during difficult times?",
        "What strength have you discovered through your struggles?"
      ]
    },
    burnout: {
      opener: [
        "What activity makes you lose track of time?",
        "When did you last feel genuinely excited about something?",
        "What's one thing that always recharges you?"
      ],
      deep: [
        "What boundaries do you need to set for yourself?",
        "How do you distinguish between being tired and being burned out?",
        "What would you do if you knew you couldn't fail?"
      ],
      reflection: [
        "What does rest mean to you beyond just sleep?",
        "How are you learning to say no to protect your energy?",
        "What passion are you ready to rekindle?"
      ]
    },
    loneliness: {
      opener: [
        "Tell us about someone who truly 'gets' you",
        "What's your favorite way to connect with others?",
        "Share a moment when you felt deeply understood"
      ],
      deep: [
        "How do you differentiate between being alone and being lonely?",
        "What would you want people to know about loneliness?",
        "How do you reach out when connection feels difficult?"
      ],
      reflection: [
        "What have you learned about yourself in solitude?",
        "How do you nurture the relationship with yourself?",
        "What kind of connection are you seeking most right now?"
      ]
    },
    wisdom: {
      opener: [
        "What's the best advice you've ever received?",
        "Share a lesson you learned the hard way",
        "What would you tell your younger self?"
      ],
      deep: [
        "How do you know when someone is truly wise?",
        "What's something you believed that you no longer believe?",
        "How has failure taught you wisdom?"
      ],
      reflection: [
        "What wisdom are you still learning to accept?",
        "How do you balance confidence with humility?",
        "What do you hope to be remembered for?"
      ]
    },
    wlb: {
      opener: [
        "What does a perfect day look like for you?",
        "When do you feel most balanced?",
        "What's your favorite way to transition from work to personal time?"
      ],
      deep: [
        "What does success mean to you beyond career achievements?",
        "How do you handle guilt about setting boundaries?",
        "What trade-offs have you made, and how do you feel about them?"
      ],
      reflection: [
        "What are you learning to prioritize?",
        "How do you measure a life well-lived?",
        "What would change if you truly put yourself first?"
      ]
    },
    transitions: {
      opener: [
        "What's changing in your life right now?",
        "Share about a transition that surprised you",
        "What helps you navigate uncertainty?"
      ],
      deep: [
        "How do you let go of what no longer serves you?",
        "What identity are you growing into?",
        "What are you afraid to leave behind?"
      ],
      reflection: [
        "What have transitions taught you about yourself?",
        "How do you find stability during change?",
        "What new beginning are you most excited about?"
      ]
    }
  };

  return prompts[theme] || prompts.wisdom;
};

// Generate unique flash cards for each participant
const generateParticipantCards = (participants: Participant[], theme: string): Participant[] => {
  const themePrompts = getThemePrompts(theme);
  const categories: Array<'opener' | 'deep' | 'reflection'> = ['opener', 'deep', 'reflection'];
  
  return participants.map((participant, index) => {
    const cards = categories.map(category => {
      const prompts = themePrompts[category];
      const promptIndex = index % prompts.length;
      return {
        question: prompts[promptIndex],
        isRevealed: false,
        category
      };
    });

    return {
      ...participant,
      flashCards: {
        current: 0,
        cards
      }
    };
  });
};

// Create artificial participants
const createArtificialParticipants = (count: number): Participant[] => {
  const names = ['Sarah Chen', 'Marcus Williams', 'Zoe Park', 'Jordan Kim', 'Alex Rivera'];
  const participants: Participant[] = [];
  
  for (let i = 0; i < Math.min(count, 5); i++) {
    participants.push({
      id: `ai-${i}`,
      name: names[i],
      avatar: '',
      isHost: false,
      isActive: false,
      isMuted: i === 2,
      hasVideo: i !== 2,
      isSpeaking: false
    });
  }
  
  return participants;
};

// Session themes
const SESSION_THEMES = {
  'anxiety': 'Finding Calm',
  'burnout': 'Rekindling Energy', 
  'loneliness': 'Building Connection',
  'wisdom': 'Life Lessons',
  'wlb': 'Work-Life Balance',
  'transitions': 'Navigating Change',
  'default': 'Meaningful Conversations'
};

const SessionPage: React.FC = () => {
  const { sessionId } = useParams();
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  const [sessionStarted, setSessionStarted] = useState(false);
  const [showArtifact, setShowArtifact] = useState(false);
  const [sessionTranscript, setSessionTranscript] = useState<Array<{
    speaker: string;
    message: string;
    timestamp: number;
  }>>([]);

  // Voice recognition
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Extract theme from sessionId
  const sessionTheme = sessionId?.split('-')[0] || 'default';
  const themeTitle = SESSION_THEMES[sessionTheme as keyof typeof SESSION_THEMES] || SESSION_THEMES.default;

  // Determine participant count (3-6 based on session theme)
  const getParticipantCount = () => {
    const counts: { [key: string]: number } = {
      'anxiety': 4,
      'burnout': 5,
      'loneliness': 6,
      'wisdom': 3,
      'wlb': 5,
      'transitions': 4
    };
    return counts[sessionTheme] || 4;
  };

  const [participants, setParticipants] = useState<Participant[]>(() => {
    const participantCount = getParticipantCount();
    const artificialParticipants = createArtificialParticipants(participantCount - 1);
    
    const allParticipants = [
      { 
        id: 'user', 
        name: 'You', 
        avatar: '', 
        isHost: true, 
        isActive: false, 
        isMuted: false, 
        hasVideo: true, 
        isSpeaking: false 
      },
      ...artificialParticipants
    ];

    return generateParticipantCards(allParticipants, sessionTheme);
  });

  useEffect(() => {
    const updateTimer = () => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = Math.max(1800 - elapsed, 0);
      setTimeRemaining(remaining);
      
      if (remaining > 0) {
        requestAnimationFrame(updateTimer);
      } else {
        setShowArtifact(true);
      }
    };
    
    updateTimer();
    initializeSpeechRecognition();

    // Start session after 3 seconds
    setTimeout(() => {
      setSessionStarted(true);
    }, 3000);

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const initializeSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        
        setSessionTranscript(prev => [...prev, {
          speaker: 'You',
          message: transcript.trim(),
          timestamp: Date.now()
        }]);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  };

  const revealCard = (participantId: string) => {
    if (participantId !== 'user') return;
    
    setParticipants(prev => prev.map(p => {
      if (p.id === participantId && p.flashCards) {
        const updatedCards = [...p.flashCards.cards];
        updatedCards[p.flashCards.current] = {
          ...updatedCards[p.flashCards.current],
          isRevealed: true
        };
        return {
          ...p,
          flashCards: {
            ...p.flashCards,
            cards: updatedCards
          }
        };
      }
      return p;
    }));
  };

  const nextCard = (participantId: string) => {
    if (participantId !== 'user') return;
    
    setParticipants(prev => prev.map(p => {
      if (p.id === participantId && p.flashCards && p.flashCards.current < 2) {
        return {
          ...p,
          flashCards: {
            ...p.flashCards,
            current: p.flashCards.current + 1
          }
        };
      }
      return p;
    }));
  };

  const toggleMic = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }

    setParticipants(prev => prev.map(p => 
      p.id === 'user' ? { ...p, isMuted: isListening } : p
    ));
  };

  const toggleVideo = () => {
    setParticipants(prev => prev.map(p => 
      p.id === 'user' ? { ...p, hasVideo: !p.hasVideo } : p
    ));
  };

  const endSession = () => {
    setShowArtifact(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate participant activity
  useEffect(() => {
    if (!sessionStarted) return;

    const interval = setInterval(() => {
      const activeParticipants = participants.filter(p => !p.isHost);
      const randomParticipant = activeParticipants[Math.floor(Math.random() * activeParticipants.length)];
      
      if (randomParticipant) {
        setParticipants(prev => prev.map(p => 
          p.id === randomParticipant.id 
            ? { ...p, isSpeaking: true }
            : { ...p, isSpeaking: false }
        ));

        setTimeout(() => {
          setParticipants(prev => prev.map(p => ({ ...p, isSpeaking: false })));
        }, Math.random() * 5000 + 3000);
      }
    }, 15000 + Math.random() * 10000);

    return () => clearInterval(interval);
  }, [participants, sessionStarted]);

  // Auto-advance other participants' cards periodically
  useEffect(() => {
    if (!sessionStarted) return;

    const interval = setInterval(() => {
      setParticipants(prev => prev.map(p => {
        if (p.id !== 'user' && p.flashCards && p.flashCards.current < 2) {
          // Randomly advance non-user participants' cards
          if (Math.random() < 0.3) { // 30% chance every interval
            const updatedCards = [...p.flashCards.cards];
            updatedCards[p.flashCards.current] = {
              ...updatedCards[p.flashCards.current],
              isRevealed: true
            };
            
            return {
              ...p,
              flashCards: {
                current: p.flashCards.current + 1,
                cards: updatedCards
              }
            };
          }
        }
        return p;
      }));
    }, 20000); // Every 20 seconds

    return () => clearInterval(interval);
  }, [sessionStarted]);

  if (showArtifact) {
    return <StoryArtifact sessionId={sessionId || ''} participants={participants} />;
  }

  const currentUser = participants.find(p => p.id === 'user');
  const currentCard = currentUser?.flashCards?.cards[currentUser.flashCards.current];

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col overflow-hidden">
      
      {/* Top Bar */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-slate-800">{themeTitle}</h1>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Users className="h-4 w-4" />
              <span>{participants.length} participants</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-blue-700 font-mono font-semibold">{formatTime(timeRemaining)}</span>
            </div>
            <button 
              onClick={endSession}
              className="text-slate-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
              title="End Session"
            >
              <PhoneOff className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Session Area - Circle Layout */}
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="relative w-full max-w-6xl h-full">
          
          {/* Circular Layout */}
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Center Flash Card for Current User */}
            {sessionStarted && currentCard && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-lg w-full mx-4">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Your Current Question</h3>
                    <div className="text-sm text-slate-600">
                      Card {(currentUser?.flashCards?.current || 0) + 1} of {currentUser?.flashCards?.cards.length || 3}
                    </div>
                  </div>
                  
                  <ScratchCard
                    question={currentCard.question}
                    category={currentCard.category}
                    isRevealed={currentCard.isRevealed}
                    canScratch={true}
                    onReveal={() => revealCard('user')}
                    participantName="You"
                  />
                  
                  {currentCard.isRevealed && (currentUser?.flashCards?.current || 0) < 2 && (
                    <div className="mt-4 text-center">
                      <button
                        onClick={() => nextCard('user')}
                        className="inline-flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <RotateCcw className="h-4 w-4" />
                        <span>Next Question</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Participants arranged in circle */}
            {participants.map((participant, index) => {
              // Skip user as they're in the center
              if (participant.id === 'user') return null;
              
              // Calculate position in circle
              const angle = (index * 360) / (participants.length - 1);
              const radius = 280;
              const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
              const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
              
              return (
                <div
                  key={participant.id}
                  className="absolute"
                  style={{
                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`
                  }}
                >
                  {/* Video Window */}
                  <div className={`w-32 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    participant.isSpeaking ? 'border-green-400 shadow-lg shadow-green-400/20 scale-105' : 'border-slate-200'
                  }`}>
                    {participant.hasVideo ? (
                      <div className={`w-full h-full bg-gradient-to-br flex items-center justify-center ${
                        participant.id === 'ai-0' ? 'from-pink-400 to-rose-500' :
                        participant.id === 'ai-1' ? 'from-green-400 to-emerald-500' :
                        participant.id === 'ai-2' ? 'from-purple-400 to-violet-500' :
                        participant.id === 'ai-3' ? 'from-yellow-400 to-orange-500' :
                        'from-teal-400 to-cyan-500'
                      }`}>
                        <span className="text-white text-lg font-bold">
                          {participant.name.charAt(0)}
                        </span>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-slate-600 flex items-center justify-center">
                        <VideoOff className="h-4 w-4 text-slate-400" />
                      </div>
                    )}
                    
                    {participant.isSpeaking && (
                      <div className="absolute inset-0 border-2 border-green-400 rounded-lg animate-pulse" />
                    )}
                  </div>
                  
                  {/* Participant Info */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black/60 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {participant.name}
                  </div>
                  
                  {/* Mute indicator */}
                  {participant.isMuted && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full">
                      <MicOff className="h-2 w-2" />
                    </div>
                  )}

                  {/* Flash Card */}
                  {sessionStarted && participant.flashCards && (
                    <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-40">
                      <ScratchCard
                        question={participant.flashCards.cards[participant.flashCards.current].question}
                        category={participant.flashCards.cards[participant.flashCards.current].category}
                        isRevealed={participant.flashCards.cards[participant.flashCards.current].isRevealed}
                        canScratch={false}
                        onReveal={() => {}}
                        participantName={participant.name}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-slate-200/50 p-4">
        <div className="flex justify-center space-x-4">
          <button 
            onClick={toggleMic}
            className={`p-3 text-white rounded-full transition-colors ${
              isListening ? 'bg-green-500 hover:bg-green-600' : 
              currentUser?.isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {currentUser?.isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
          <button 
            onClick={toggleVideo}
            className={`p-3 text-white rounded-full transition-colors ${
              currentUser?.hasVideo ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {currentUser?.hasVideo ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </button>
        </div>
        
        {isListening && (
          <div className="mt-3 text-center">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Listening...</span>
            </div>
          </div>
        )}
      </div>

      {/* Live Transcript - Fixed Position */}
      {sessionTranscript.length > 0 && (
        <div className="fixed bottom-4 right-4 w-80 max-h-64 bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 overflow-y-auto shadow-lg z-20">
          <div className="flex items-center space-x-2 mb-3">
            <MessageSquare className="h-4 w-4 text-blue-500" />
            <h4 className="font-medium text-slate-800 text-sm">Live Transcript</h4>
          </div>
          
          <div className="space-y-2">
            {sessionTranscript.slice(-10).map((entry, index) => (
              <div key={index} className="text-xs">
                <span className="font-medium text-slate-700">{entry.speaker}:</span>
                <p className="text-slate-600 mt-1">{entry.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionPage;