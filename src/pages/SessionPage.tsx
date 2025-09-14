import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Mic, MicOff, Video, VideoOff, RotateCcw, Plus, X, Clock, Users, PhoneOff, MessageSquare } from 'lucide-react';
import StoryArtifact from '../components/StoryArtifact';

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isHost: boolean;
  isActive: boolean;
  isMuted: boolean;
  hasVideo: boolean;
  isSpeaking: boolean;
}

interface FlashCard {
  id: string;
  question: string;
  category: 'opener' | 'deep' | 'fun' | 'reflection';
  used: boolean;
}

// Artificial participants for testing
const ARTIFICIAL_PARTICIPANTS: Participant[] = [
  { id: 'ai-sarah', name: 'Sarah Chen', avatar: '', isHost: false, isActive: false, isMuted: false, hasVideo: true, isSpeaking: false },
  { id: 'ai-marcus', name: 'Marcus Williams', avatar: '', isHost: false, isActive: false, isMuted: false, hasVideo: true, isSpeaking: false },
  { id: 'ai-zoe', name: 'Zoe Park', avatar: '', isHost: false, isActive: false, isMuted: true, hasVideo: false, isSpeaking: false },
];

// Session themes from the scheduler
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
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 'user', name: 'You', avatar: '', isHost: true, isActive: false, isMuted: false, hasVideo: true, isSpeaking: false },
    ...ARTIFICIAL_PARTICIPANTS
  ]);
  
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flashCards, setFlashCards] = useState<FlashCard[]>([]);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [showCardSelector, setShowCardSelector] = useState(false);
  const [showArtifact, setShowArtifact] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const [sessionTranscript, setSessionTranscript] = useState<Array<{
    speaker: string;
    message: string;
    timestamp: number;
  }>>([]);

  // Voice recognition for transcription
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Timer that continues when switching tabs
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Extract theme from sessionId
  const sessionTheme = sessionId?.split('-')[0] || 'default';
  const themeTitle = SESSION_THEMES[sessionTheme as keyof typeof SESSION_THEMES] || SESSION_THEMES.default;

  useEffect(() => {
    // Use actual time tracking instead of interval to prevent pausing when switching tabs
    const updateTimer = () => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = Math.max(1800 - elapsed, 0);
      setTimeRemaining(remaining);
      
      if (remaining > 0) {
        requestAnimationFrame(updateTimer);
      } else {
        // Session ended
        setShowArtifact(true);
      }
    };
    
    updateTimer();
    generateInitialCards();
    initializeSpeechRecognition();

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
        
        // Add to session transcript
        setSessionTranscript(prev => [...prev, {
          speaker: 'You',
          message: transcript.trim(),
          timestamp: Date.now()
        }]);

        // Add to conversation history for AI context
        setConversationHistory(prev => [...prev, transcript.trim()]);
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

  const generateInitialCards = async () => {
    setIsLoadingCards(true);
    
    try {
      // Call Anthropic API for conversation starters
      const response = await fetch('http://localhost:3001/api/haiku-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Generate 8 conversation starter questions for a 30-minute storytelling circle about "${themeTitle}". 
          
          Make them:
          - Simple, direct questions (not metaphorical)
          - Easy to understand and relate to
          - Encouraging personal sharing
          - Mix of light and deeper topics
          - Relevant to the theme
          
          Format as simple questions, no explanations or numbering. Examples:
          - "What's a challenge you've overcome recently?"
          - "Share a moment when someone surprised you"
          - "What's something you're looking forward to?"`,
          context: { sessionId, type: 'flash_cards', theme: sessionTheme }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const questions = parseQuestionsFromAI(data.response);
        setFlashCards(questions);
      } else {
        throw new Error('API call failed');
      }
    } catch (error) {
      console.error('Failed to generate cards:', error);
      // Fallback cards based on theme
      setFlashCards(getFallbackCards(sessionTheme));
    } finally {
      setIsLoadingCards(false);
    }
  };

  const getFallbackCards = (theme: string): FlashCard[] => {
    const baseCards = [
      { id: '1', question: 'What brought you here today?', category: 'opener' as const, used: false },
      { id: '2', question: 'Share something good that happened this week', category: 'opener' as const, used: false },
      { id: '3', question: 'What\'s a challenge you\'ve been thinking about?', category: 'deep' as const, used: false },
      { id: '4', question: 'Describe a person who influenced you', category: 'deep' as const, used: false },
      { id: '5', question: 'What\'s your favorite way to unwind?', category: 'fun' as const, used: false },
      { id: '6', question: 'Share a lesson you learned the hard way', category: 'reflection' as const, used: false },
      { id: '7', question: 'What are you grateful for right now?', category: 'reflection' as const, used: false },
      { id: '8', question: 'What would you tell your younger self?', category: 'reflection' as const, used: false },
    ];

    // Theme-specific modifications
    if (theme === 'anxiety') {
      baseCards[2].question = 'What helps you feel calm when things get overwhelming?';
      baseCards[7].question = 'Share a moment when you felt truly peaceful';
    } else if (theme === 'burnout') {
      baseCards[3].question = 'When do you feel most energized?';
      baseCards[5].question = 'What\'s one thing that always recharges you?';
    } else if (theme === 'loneliness') {
      baseCards[1].question = 'Tell us about someone who made you feel understood';
      baseCards[4].question = 'What makes you feel connected to others?';
    }

    return baseCards;
  };

  const parseQuestionsFromAI = (response: string): FlashCard[] => {
    const lines = response.split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.toLowerCase().includes('format') && line.includes('?'));
    
    return lines.slice(0, 8).map((line, index) => ({
      id: `ai-${index}`,
      question: line.replace(/^[-•*\d.]+\s*/, '').replace(/['"]/g, '').trim(),
      category: index < 2 ? 'opener' : index < 4 ? 'fun' : index < 6 ? 'deep' : 'reflection' as const,
      used: false
    }));
  };

  const generateNewCards = async () => {
    if (conversationHistory.length === 0) return;
    
    setIsLoadingCards(true);
    const recentTopics = conversationHistory.slice(-3).join(', ');
    
    try {
      const response = await fetch('http://localhost:3001/api/haiku-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Based on this conversation: "${recentTopics}", generate 3 follow-up questions that:
          - Build on what's been shared
          - Encourage deeper connection
          - Are simple and direct
          - Help participants relate to each other`,
          context: { sessionId, type: 'follow_up_cards', conversation: recentTopics }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const newQuestions = parseQuestionsFromAI(data.response);
        setFlashCards(prev => [...prev, ...newQuestions]);
      }
    } catch (error) {
      console.error('Failed to generate follow-up cards:', error);
    } finally {
      setIsLoadingCards(false);
    }
  };

  const nextCard = () => {
    if (currentCardIndex < flashCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      markCardAsUsed(flashCards[currentCardIndex].id);
    } else if (!isLoadingCards) {
      // Generate new cards when we run out
      generateNewCards();
    }
  };

  const markCardAsUsed = (cardId: string) => {
    setFlashCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, used: true } : card
    ));
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
    const interval = setInterval(() => {
      const randomParticipant = ARTIFICIAL_PARTICIPANTS[Math.floor(Math.random() * ARTIFICIAL_PARTICIPANTS.length)];
      
      setParticipants(prev => prev.map(p => 
        p.id === randomParticipant.id 
          ? { ...p, isSpeaking: true }
          : { ...p, isSpeaking: false }
      ));

      // Stop speaking after 3-8 seconds
      setTimeout(() => {
        setParticipants(prev => prev.map(p => ({ ...p, isSpeaking: false })));
      }, Math.random() * 5000 + 3000);
    }, 15000 + Math.random() * 10000); // Every 15-25 seconds

    return () => clearInterval(interval);
  }, []);

  const currentCard = flashCards[currentCardIndex];

  if (showArtifact) {
    return <StoryArtifact sessionId={sessionId || ''} participants={participants} />;
  }

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

      {/* Main Session Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar - Participants */}
        <div className="w-80 bg-white/60 backdrop-blur-sm border-r border-slate-200/50 p-6 flex flex-col">
          <h3 className="font-semibold text-slate-800 mb-4">Circle Members</h3>
          
          <div className="space-y-4 flex-1">
            {participants.map((participant) => (
              <div key={participant.id} className="relative group">
                <div className={`aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  participant.isSpeaking ? 'border-green-400 shadow-lg shadow-green-400/20 scale-105' : 
                  participant.isActive ? 'border-blue-400 shadow-lg shadow-blue-400/20' : 
                  'border-slate-200'
                }`}>
                  {participant.hasVideo ? (
                    <div className={`w-full h-full bg-gradient-to-br flex items-center justify-center ${
                      participant.id === 'user' ? 'from-blue-400 to-indigo-500' :
                      participant.id === 'ai-sarah' ? 'from-pink-400 to-rose-500' :
                      participant.id === 'ai-marcus' ? 'from-green-400 to-emerald-500' :
                      'from-purple-400 to-violet-500'
                    }`}>
                      <span className="text-white text-2xl font-bold">
                        {participant.name.charAt(0)}
                      </span>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-slate-600 flex items-center justify-center">
                      <VideoOff className="h-8 w-8 text-slate-400" />
                    </div>
                  )}
                  
                  {/* Speaking indicator */}
                  {participant.isSpeaking && (
                    <div className="absolute inset-0 border-2 border-green-400 rounded-xl animate-pulse" />
                  )}
                </div>
                
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {participant.name}
                </div>
                
                <div className="absolute top-2 right-2 flex space-x-1">
                  {participant.isMuted && (
                    <div className="bg-red-500 text-white p-1 rounded">
                      <MicOff className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Your Controls */}
          <div className="mt-6 pt-4 border-t border-slate-200/50">
            <div className="flex justify-center space-x-3">
              <button 
                onClick={toggleMic}
                className={`p-3 text-white rounded-full transition-colors ${
                  isListening ? 'bg-green-500 hover:bg-green-600' : 
                  participants.find(p => p.id === 'user')?.isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {participants.find(p => p.id === 'user')?.isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
              <button 
                onClick={toggleVideo}
                className={`p-3 text-white rounded-full transition-colors ${
                  participants.find(p => p.id === 'user')?.hasVideo ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {participants.find(p => p.id === 'user')?.hasVideo ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </button>
              <button 
                onClick={generateNewCards}
                className="p-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
                title="Generate new conversation starters"
              >
                <Plus className="h-5 w-5" />
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
        </div>

        {/* Center - Flash Cards */}
        <div className="flex-1 flex items-center justify-center p-8 relative">
          <div className="max-w-2xl w-full">
            
            {isLoadingCards ? (
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 text-center border border-slate-200/50">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-slate-600">Preparing conversation starters...</p>
              </div>
            ) : currentCard ? (
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 text-center border border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="mb-6">
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                    currentCard.category === 'opener' ? 'bg-green-100 text-green-700' :
                    currentCard.category === 'fun' ? 'bg-yellow-100 text-yellow-700' :
                    currentCard.category === 'deep' ? 'bg-purple-100 text-purple-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {currentCard.category}
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 leading-relaxed">
                    {currentCard.question}
                  </h2>
                </div>
                
                <div className="flex items-center justify-center space-x-6">
                  <button 
                    onClick={nextCard}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-600 transition-colors"
                  >
                    <RotateCcw className="h-5 w-5" />
                    <span>Next Card</span>
                  </button>
                  
                  <button 
                    onClick={() => setShowCardSelector(!showCardSelector)}
                    className="flex items-center space-x-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-full font-medium hover:bg-slate-100 transition-colors"
                  >
                    <span>Browse All</span>
                  </button>
                </div>

                <div className="mt-6 text-sm text-slate-500">
                  Card {currentCardIndex + 1} of {flashCards.length}
                </div>
              </div>
            ) : (
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 text-center border border-slate-200/50">
                <p className="text-slate-600 mb-4">No conversation starters available</p>
                <button 
                  onClick={generateInitialCards}
                  className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
                >
                  Generate Cards
                </button>
              </div>
            )}

            {/* Card Selector Overlay */}
            {showCardSelector && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
                  <h3 className="font-semibold text-slate-800 mb-4">Choose a conversation starter</h3>
                  
                  <div className="space-y-3">
                    {flashCards.map((card, index) => (
                      <button
                        key={card.id}
                        onClick={() => {
                          setCurrentCardIndex(index);
                          setShowCardSelector(false);
                        }}
                        className={`w-full text-left p-4 rounded-xl transition-colors ${
                          card.used 
                            ? 'bg-slate-100 text-slate-400' 
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                        }`}
                        disabled={card.used}
                      >
                        <div className="font-medium">{card.question}</div>
                        <div className={`text-xs mt-1 ${card.used ? 'text-slate-400' : 'text-slate-500'}`}>
                          {card.category} {card.used && '• Used'}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setShowCardSelector(false)}
                    className="mt-4 w-full bg-slate-200 text-slate-700 py-2 rounded-lg hover:bg-slate-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Live Transcript */}
          {sessionTranscript.length > 0 && (
            <div className="absolute bottom-8 right-8 w-80 max-h-64 bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 overflow-y-auto">
              <div className="flex items-center space-x-2 mb-3">
                <MessageSquare className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium text-slate-800 text-sm">Live Transcript</h4>
              </div>
              
              <div className="space-y-2">
                {sessionTranscript.slice(-5).map((entry, index) => (
                  <div key={index} className="text-xs">
                    <span className="font-medium text-slate-700">{entry.speaker}:</span>
                    <p className="text-slate-600 mt-1">{entry.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionPage;