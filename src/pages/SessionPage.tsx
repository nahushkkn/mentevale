import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SessionPhase from '../components/SessionPhase';
import ParticipantGrid from '../components/ParticipantGrid';
import ProgressBar from '../components/ProgressBar';
import AIHost from '../components/AIHost';
import StoryArtifact from '../components/StoryArtifact';

// Session theme configuration
const SESSION_THEME = {
  title: "Bridges and Burdens",
  subtitle: "Exploring life's crossings and the weight we carry",
  description: "Today we explore the metaphorical bridges we cross and the burdens we bear as we navigate life's journey.",
  color: "from-blue-600 to-indigo-600"
};

// Artificial participants for testing
const ARTIFICIAL_PARTICIPANTS = [
  {
    id: 'ai-sarah',
    name: 'Sarah Chen',
    avatar: '/api/placeholder/100/100',
    isHost: false,
    isActive: false,
    personality: 'reflective',
    backstory: 'Marketing professional dealing with work-life balance',
    responses: [
      "I've been thinking about how we build walls to protect ourselves, but sometimes they keep out the very connections we need. Last year, I left my corporate job to freelance, and it felt like crossing a bridge I'd been afraid to even look at.",
      "The weight I carry is this constant questioning - am I enough? My bridge is learning to trust that my path doesn't have to look like everyone else's to be valid.",
      "There's something powerful about pausing in the middle of chaos to ask: what story am I telling myself about this moment? Sometimes that story needs rewriting."
    ]
  },
  {
    id: 'ai-marcus',
    name: 'Marcus Williams', 
    avatar: '/api/placeholder/100/100',
    isHost: false,
    isActive: false,
    personality: 'philosophical',
    backstory: 'Retired teacher with deep life experience',
    responses: [
      "In my 40 years of teaching, I learned that every student carries invisible bridges - some to their dreams, others away from their fears. The weight I've carried is the responsibility of guiding young minds without imposing my own limitations.",
      "Age has taught me that the heaviest burdens often become our greatest teachers, if we're willing to listen. My bridge now is between the wisdom I've gathered and the humility to keep learning.",
      "I think about my grandmother's hands and how they carried stories I'll never fully know, but somehow live within me. We're all bridge-keepers, helping others cross safely."
    ]
  },
  {
    id: 'ai-zoe',
    name: 'Zoe Park',
    avatar: '/api/placeholder/100/100', 
    isHost: false,
    isActive: false,
    personality: 'creative',
    backstory: 'Digital nomad and freelance designer',
    responses: [
      "Traveling has shown me that every city has bridges - some connect places, others connect moments in time. I carry my laptop like a bridge to anywhere, but sometimes I wonder if it's also keeping me from being fully present.",
      "There's a bridge in Prague where lovers leave locks, and I always wondered - are we trying to lock love in place, or lock out our fear of losing it? My burden is this restlessness, always seeking the next horizon.",
      "As a designer, I spend my days building visual bridges between ideas and reality. But the hardest bridge to design is the one between who I am when I'm alone and who I am with others."
    ]
  }
];

const SessionPage: React.FC = () => {
  const { sessionId } = useParams();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(3600);
  const [participants, setParticipants] = useState([
    { id: 'user', name: 'You', avatar: '/api/placeholder/100/100', isHost: true, isActive: false },
    ...ARTIFICIAL_PARTICIPANTS
  ]);
  const [showArtifact, setShowArtifact] = useState(false);
  const [isTestingAPI, setIsTestingAPI] = useState(false);
  const [apiResponses, setApiResponses] = useState<string[]>([]);
  const [sessionTranscript, setSessionTranscript] = useState<Array<{
    speaker: string;
    message: string;
    timestamp: number;
    phase: string;
  }>>([]);
  const [currentAIMessage, setCurrentAIMessage] = useState('');

  const phases = [
    { name: 'Induction', duration: 300, description: 'Creating sacred space together' },
    { name: 'Anchor Story', duration: 300, description: 'Setting the thematic foundation' },
    { name: 'Circle Reflection', duration: 1800, description: 'Authentic story sharing' },
    { name: 'Weaving', duration: 900, description: 'Connecting shared wisdom' },
    { name: 'Closure', duration: 300, description: 'Blessing and gratitude' },
  ];

// Updated callAnthropicAPI function with better prompts
// Replace the existing function in your SessionPage.tsx

const callAnthropicAPI = async (prompt: string, context: any = {}) => {
  setIsTestingAPI(true);
  
  try {
    const response = await fetch('http://localhost:3001/api/haiku-generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        context: {
          phase: phases[currentPhase].name,
          participants: participants.length,
          sessionId: sessionId,
          currentPhase,
          ...context
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Backend API call failed: ${response.status} - ${errorData.error}`);
    }

    const data = await response.json();
    const aiResponse = data.response;
    
    setApiResponses(prev => [...prev, aiResponse]);
    setCurrentAIMessage(aiResponse);
    
    // Add to transcript
    setSessionTranscript(prev => [...prev, {
      speaker: 'AI Guide',
      message: aiResponse,
      timestamp: Date.now(),
      phase: phases[currentPhase].name
    }]);

    console.log('✅ Backend API Response:', aiResponse);
    return aiResponse;
  } catch (error) {
    console.error('❌ Backend API Error:', error);
    const fallbackResponse = generateFallbackResponse(prompt, currentPhase);
    setApiResponses(prev => [...prev, fallbackResponse]);
    setCurrentAIMessage(fallbackResponse);
    return fallbackResponse;
  } finally {
    setIsTestingAPI(false);
  }
};

  // Generate fallback responses when API is unavailable
  const generateFallbackResponse = (prompt: string, phase: number): string => {
    const fallbackResponses = {
      0: "Welcome, storytellers. I'm honored to hold space for your stories today. Let's breathe together and create a circle of trust where every voice matters.",
      1: "Today we explore bridges and burdens - those crossing points in life where we carry what matters most. Listen to this tale and let it awaken your own memories...",
      2: "I hear the courage in your sharing. Each story reveals how we navigate life's transitions. What bridges are calling to you today?",
      3: "From your voices, a beautiful pattern emerges. We are all bridge-builders, carrying burdens that become lighter when shared. Let me weave these threads together...",
      4: "As our circle closes, know that your stories have touched each heart here. May these connections continue to light your path forward. Thank you for this gift of authentic sharing."
    };
    
    return fallbackResponses[phase] || "Thank you for bringing your authentic voice to our circle today.";
  };

  // Simulate artificial participant responses
  const simulateParticipantResponse = (participantId: string) => {
    const participant = ARTIFICIAL_PARTICIPANTS.find(p => p.id === participantId);
    if (!participant) return;

    const responseIndex = Math.floor(Math.random() * participant.responses.length);
    const response = participant.responses[responseIndex];

    setSessionTranscript(prev => [...prev, {
      speaker: participant.name,
      message: response,
      timestamp: Date.now(),
      phase: phases[currentPhase].name
    }]);

    // Mark participant as active temporarily
    setParticipants(prev => prev.map(p => 
      p.id === participantId 
        ? { ...p, isActive: true }
        : { ...p, isActive: false }
    ));

    // Clear active state after 10 seconds
    setTimeout(() => {
      setParticipants(prev => prev.map(p => ({ ...p, isActive: false })));
    }, 10000);

    console.log(`🎭 ${participant.name} shared:`, response);
  };

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setShowArtifact(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-advance phases based on time
  useEffect(() => {
    const totalDuration = 3600;
    const elapsed = totalDuration - timeRemaining;
    let cumulativeTime = 0;
    
    for (let i = 0; i < phases.length; i++) {
      cumulativeTime += phases[i].duration;
      if (elapsed < cumulativeTime) {
        if (currentPhase !== i) {
          setCurrentPhase(i);
        }
        break;
      }
    }
  }, [timeRemaining, phases, currentPhase]);

  // Trigger API calls at phase transitions
  useEffect(() => {
  const triggerPhaseAPI = async () => {
    let prompt = '';
    
    switch (currentPhase) {
      case 0: // Induction
        prompt = "Provide a welcoming introduction to the storytelling circle. Focus on creating psychological safety and explaining today's theme of 'Bridges and Burdens.' Speak as an AI facilitator - do not use physical descriptions, gestures, or human-like actions. Keep it warm but clearly digital.";
        break;
      case 1: // Anchor Story
        prompt = "Share a thoughtful story about bridges and burdens that will inspire personal reflection. The story should be evocative but not overly dramatic. Present it as an AI narrator sharing wisdom, not as a human storyteller with physical presence.";
        break;
      case 2: // Circle Reflection
        if (sessionTranscript.length > 1) {
          const recentShares = sessionTranscript
            .filter(t => t.speaker !== 'AI Guide')
            .slice(-2)
            .map(t => `${t.speaker}: "${t.message}"`)
            .join('\n');
          prompt = `Acknowledge these participant shares with wisdom and insight. Provide thoughtful reflection on common themes. Speak as an AI guide processing and connecting their stories - avoid human mannerisms:\n\n${recentShares}`;
        } else {
          prompt = "Encourage participants to share their personal experiences with bridges and burdens. Create an inviting atmosphere for authentic storytelling. Speak as a supportive AI facilitator without physical gestures or human-like behaviors.";
        }
        break;
      case 3: // Weaving
        const allShares = sessionTranscript
          .filter(t => t.speaker !== 'AI Guide' && t.phase === 'Circle Reflection')
          .map(t => `${t.speaker}: "${t.message}"`)
          .join('\n\n');
        prompt = `Weave these individual stories into a collective narrative. Identify universal themes and wisdom that emerged. Present this as AI-generated insight connecting human experiences - no physical actions or human roleplay:\n\n${allShares}`;
        break;
      case 4: // Closure
        prompt = "Provide a meaningful closing reflection that honors the stories shared. Offer wisdom about the connections made and journeys explored. Conclude as an AI guide completing the session - warm but clearly digital in nature.";
        break;
    }

    if (prompt) {
      await callAnthropicAPI(prompt, { 
        transcript: sessionTranscript,
        currentPhase,
        sessionId 
      });
    }
  };

  if (currentPhase < phases.length) {
    const timer = setTimeout(() => {
      triggerPhaseAPI();
    }, 1000);
    
    return () => clearTimeout(timer);
  }
}, [currentPhase]);

  // Simulate participant shares during reflection phase
  useEffect(() => {
    if (currentPhase === 2) { // Circle Reflection phase
      const shareInterval = setInterval(() => {
        const availableParticipants = ARTIFICIAL_PARTICIPANTS.filter(p => {
          // Check if this participant hasn't shared in this phase yet
          const hasSharedInCurrentPhase = sessionTranscript.some(t => 
            t.speaker === p.name && t.phase === 'Circle Reflection'
          );
          return !hasSharedInCurrentPhase;
        });
        
        if (availableParticipants.length > 0) {
          const randomParticipant = availableParticipants[Math.floor(Math.random() * availableParticipants.length)];
          setTimeout(() => {
            simulateParticipantResponse(randomParticipant.id);
          }, Math.random() * 5000); // Random delay 0-5 seconds
        }
      }, 20000); // Every 20 seconds

      return () => clearInterval(shareInterval);
    }
  }, [currentPhase, sessionTranscript]);

  // Manual testing functions
  const handleManualAPITest = () => {
    callAnthropicAPI("Generate a test response for the current phase", { test: true });
  };

  const handleManualParticipantShare = (participantId: string) => {
    simulateParticipantResponse(participantId);
  };

  const handleAdvancePhase = () => {
    setCurrentPhase(prev => Math.min(prev + 1, phases.length - 1));
  };

  if (showArtifact) {
    return <StoryArtifact sessionId={sessionId || ''} participants={participants} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* Progress Bar */}
      <ProgressBar 
        currentPhase={currentPhase}
        phases={phases}
        timeRemaining={timeRemaining}
        totalDuration={3600}
      />

      {/* Session Theme Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-slate-200/50 py-6 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className={`text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${SESSION_THEME.color} mb-2`}>
              {SESSION_THEME.title}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base font-medium mb-1">
              {SESSION_THEME.subtitle}
            </p>
            <p className="text-slate-500 text-xs sm:text-sm max-w-2xl mx-auto">
              {SESSION_THEME.description}
            </p>
            
            {/* Current Phase Indicator - Smaller */}
            <div className="mt-3 inline-flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-blue-700 text-xs font-medium">
                Phase {currentPhase + 1}: {phases[currentPhase]?.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* API Testing Dashboard - Condensed */}
      <div className="bg-white/50 border-b border-slate-200/30 p-3">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="text-xs">
                <span className="text-slate-600">API Calls:</span>
                <span className="text-blue-600 font-semibold ml-1">{apiResponses.length}</span>
              </div>
              <div className="text-xs">
                <span className="text-slate-600">Shares:</span>
                <span className="text-green-600 font-semibold ml-1">
                  {sessionTranscript.filter(t => t.speaker !== 'AI Guide').length}
                </span>
              </div>
              {isTestingAPI && (
                <div className="flex items-center space-x-2 text-blue-600 text-xs">
                  <div className="w-3 h-3 border border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              )}
            </div>
            
            {/* Manual Testing Controls - Smaller */}
            <div className="flex space-x-2">
              <button
                onClick={handleManualAPITest}
                className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
              >
                Test API
              </button>
              <button
                onClick={() => handleManualParticipantShare('ai-sarah')}
                className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors"
              >
                Sarah
              </button>
              <button
                onClick={() => handleManualParticipantShare('ai-marcus')}
                className="px-2 py-1 bg-purple-500 text-white rounded text-xs hover:bg-purple-600 transition-colors"
              >
                Marcus
              </button>
              {/* Removed "Skip to Next Phase" button as requested */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Session Content - Fixed Height with Scrolling */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex gap-6 p-6 max-h-full">
          
          {/* Left Side: AI Host & Session Content - Scrollable */}
          <div className="flex-1 space-y-6 overflow-y-auto pr-2" style={{ maxHeight: 'calc(100vh - 300px)' }}>
            <AIHost 
              currentPhase={currentPhase} 
              phases={phases}
              currentMessage={currentAIMessage}
              isLoading={isTestingAPI}
            />
            <SessionPhase 
              phase={phases[currentPhase]}
              phaseIndex={currentPhase}
              participants={participants}
              sessionTranscript={sessionTranscript}
            />
          </div>

          {/* Right Side: Participant Grid & Transcript - Fixed Height */}
          <div className="w-80 space-y-6 flex flex-col" style={{ maxHeight: 'calc(100vh - 300px)' }}>
            <ParticipantGrid participants={participants} />
            
            {/* Live Session Transcript - Scrollable */}
            <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200 overflow-hidden flex flex-col">
              <h3 className="text-lg font-semibold text-slate-800 mb-3 flex-shrink-0">Live Transcript</h3>
              <div className="flex-1 overflow-y-auto">
                {sessionTranscript.length === 0 ? (
                  <p className="text-slate-500 italic text-sm">Circle conversation will appear here...</p>
                ) : (
                  <div className="space-y-3">
                    {sessionTranscript.map((entry, index) => (
                      <div key={index} className="border-l-4 border-blue-300 pl-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-slate-800 text-sm">{entry.speaker}</span>
                          <span className="text-xs text-slate-500">
                            {new Date(entry.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed">{entry.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionPage;