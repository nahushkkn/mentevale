import React, { useEffect, useState } from 'react';
import { Sparkles, Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface AIHostProps {
  currentPhase: number;
  phases: Array<{
    name: string;
    duration: number;
    description: string;
  }>;
  currentMessage?: string;
  isLoading?: boolean;
}

const AIHost: React.FC<AIHostProps> = ({ currentPhase, phases, currentMessage, isLoading }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [bestVoice, setBestVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
      
      // Find the best female voice available
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        
        // Priority order for natural female voices
        const preferredVoices = [
          // iOS/macOS voices (highest quality)
          'Samantha',
          'Ava',
          'Allison',
          'Susan',
          'Karen',
          // Google/Chrome voices
          'Google UK English Female',
          'Google US English Female',
          // Windows voices
          'Microsoft Zira Desktop',
          'Microsoft Hazel Desktop',
          // Android voices
          'en-gb-x-gbb-network',
          'en-us-x-iog-network',
          // Fallback to any female English voice
          ...voices.filter(v => 
            v.lang.startsWith('en') && 
            (v.name.toLowerCase().includes('female') || 
             v.name.toLowerCase().includes('woman') ||
             v.voiceURI.toLowerCase().includes('female'))
          ).map(v => v.name)
        ];

        for (const voiceName of preferredVoices) {
          const voice = voices.find(v => v.name === voiceName);
          if (voice) {
            setBestVoice(voice);
            console.log('🎵 Selected voice:', voice.name);
            break;
          }
        }

        // If no preferred voice found, use first English voice
        if (!bestVoice && voices.length > 0) {
          const englishVoice = voices.find(v => v.lang.startsWith('en'));
          setBestVoice(englishVoice || voices[0]);
        }
      };

      // Voices might not be loaded immediately
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      } else {
        loadVoices();
      }
    }
  }, []);

  const getDefaultMessage = () => {
    switch (currentPhase) {
      case 0:
        return "Welcome to this storytelling circle. I'm your AI guide, here to facilitate our exploration together. Let's create a space where every voice can be heard with respect and openness.";
      case 1:
        return "I'll now share a story to set our theme. Listen as this tale opens pathways to your own reflections and memories.";
      case 2:
        return "This is your time for authentic sharing. When you feel moved to speak, know that your story adds valuable wisdom to our collective understanding.";
      case 3:
        return "I'm now processing and connecting the stories you've shared, weaving them into patterns that reveal our common humanity.";
      case 4:
        return "As our circle concludes, carry forward the insights and connections you've discovered here. Thank you for your courage in sharing authentically.";
      default:
        return "Welcome to mentehub, where stories connect hearts.";
    }
  };

  const displayMessage = currentMessage || getDefaultMessage();

  const speakMessage = (text: string) => {
    if (!speechSynthesis || !speechEnabled || !bestVoice) {
      console.log('🔇 Speech not available or disabled');
      return;
    }

    // Stop any current speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure for natural, conversational speech
    utterance.voice = bestVoice;
    utterance.rate = 0.9;     // Natural pace
    utterance.pitch = 1.0;    // Natural pitch
    utterance.volume = 0.85;  // Comfortable volume

    // Add natural pauses for better flow
    const naturalText = text
      .replace(/\./g, '. ')     // Pause after periods
      .replace(/,/g, ', ')      // Slight pause after commas
      .replace(/:/g, ': ')      // Pause after colons
      .replace(/\s+/g, ' ')     // Clean up extra spaces
      .trim();

    utterance.text = naturalText;

    utterance.onstart = () => {
      setIsSpeaking(true);
      console.log('🎵 Started speaking with voice:', bestVoice.name);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      console.log('🎵 Finished speaking');
    };
    
    utterance.onerror = (event) => {
      setIsSpeaking(false);
      console.error('🔇 Speech error:', event.error);
    };

    // Small delay to ensure text is rendered
    setTimeout(() => {
      speechSynthesis.speak(utterance);
    }, 100);
  };

  const stopSpeaking = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakMessage(displayMessage);
    }
  };

  // Auto-speak when new AI message arrives
  useEffect(() => {
    if (currentMessage && speechEnabled && !isLoading && bestVoice) {
      // Delay to ensure message is fully rendered and user can see it
      const timer = setTimeout(() => {
        speakMessage(currentMessage);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [currentMessage, speechEnabled, isLoading, bestVoice]);

  return (
    <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-300/30">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 relative">
          <Sparkles className="h-6 w-6 text-white" />
          {isSpeaking && (
            <div className="absolute -inset-1 bg-blue-400/30 rounded-full animate-ping" />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <h3 className="text-slate-800 font-semibold">AI Guide</h3>
              {isLoading ? (
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              ) : isSpeaking ? (
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span className="text-xs text-green-600 font-medium">Speaking</span>
                </div>
              ) : (
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full" />
                  <div className="w-2 h-2 bg-slate-400 rounded-full" />
                  <div className="w-2 h-2 bg-slate-400 rounded-full" />
                </div>
              )}
            </div>

            {/* Speech Controls */}
            {bestVoice && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleSpeech}
                  disabled={isLoading}
                  className="p-2 rounded-full hover:bg-blue-500/10 transition-colors disabled:opacity-50 group"
                  title={isSpeaking ? "Pause speech" : "Play speech"}
                >
                  {isSpeaking ? (
                    <Pause className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
                  ) : (
                    <Play className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
                  )}
                </button>
                
                <button
                  onClick={() => setSpeechEnabled(!speechEnabled)}
                  className="p-2 rounded-full hover:bg-blue-500/10 transition-colors group"
                  title={speechEnabled ? "Disable voice" : "Enable voice"}
                >
                  {speechEnabled ? (
                    <Volume2 className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
                  ) : (
                    <VolumeX className="h-4 w-4 text-slate-400 group-hover:scale-110 transition-transform" />
                  )}
                </button>
              </div>
            )}
          </div>
          
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 bg-slate-100/70 rounded-lg flex items-center justify-center z-10">
                <div className="flex items-center space-x-2 text-blue-600">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Reflecting...</span>
                </div>
              </div>
            )}
            
            <div className={`transition-all duration-300 ${isLoading ? 'opacity-30' : 'opacity-100'}`}>
              <p className={`text-slate-700 leading-relaxed ${isSpeaking ? 'bg-blue-50/50 rounded-lg p-3' : ''} transition-all duration-300`}>
                {displayMessage}
              </p>
              
              {bestVoice && speechEnabled && (
                <div className="mt-2 text-xs text-slate-500 flex items-center space-x-1">
                  <Volume2 className="h-3 w-3" />
                  <span>Voice: {bestVoice.name.split(' ')[0]}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIHost;