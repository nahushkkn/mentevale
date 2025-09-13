import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Sparkles, Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SessionSchedulerProps {
  onClose: () => void;
  selectedTheme?: string;
}

const SessionScheduler: React.FC<SessionSchedulerProps> = ({ onClose, selectedTheme = '' }) => {
  const navigate = useNavigate();
  const [currentTheme, setCurrentTheme] = useState(selectedTheme);
  const [selectedTime, setSelectedTime] = useState('');
  const [showThemeSelector, setShowThemeSelector] = useState(!selectedTheme);

  const themes = {
    anxiety: { 
      name: 'Anxiety', 
      icon: '🌅', 
      color: 'from-blue-400 to-cyan-400',
      description: 'Finding calm in the storm',
      nextSession: 'Today, 3:00 PM'
    },
    burnout: { 
      name: 'Burnout', 
      icon: '🔥', 
      color: 'from-orange-400 to-red-400',
      description: 'Rekindling your inner flame',
      nextSession: 'Today, 6:00 PM'
    },
    loneliness: { 
      name: 'Loneliness', 
      icon: '🤗', 
      color: 'from-purple-400 to-pink-400',
      description: 'You are not alone',
      nextSession: 'Today, 7:30 PM'
    },
    wisdom: { 
      name: 'Wisdom', 
      icon: '🌳', 
      color: 'from-green-400 to-emerald-400',
      description: 'Sharing life lessons',
      nextSession: 'Tomorrow, 10:00 AM'
    },
    wlb: { 
      name: 'Work-Life Balance', 
      icon: '⚖️', 
      color: 'from-indigo-400 to-purple-400',
      description: 'Finding your equilibrium',
      nextSession: 'Today, 5:00 PM'
    },
    transitions: { 
      name: 'Life Transitions', 
      icon: '🌉', 
      color: 'from-teal-400 to-blue-400',
      description: 'Navigating change together',
      nextSession: 'Tomorrow, 2:00 PM'
    }
  };

  const timeSlots = [
    { id: 'now', time: 'Join Now', available: true, description: 'Circle starting in 5 minutes' },
    { id: '3pm', time: '3:00 PM EST', available: true, description: '2 spots available' },
    { id: '5pm', time: '5:00 PM EST', available: true, description: '3 spots available' },
    { id: '6pm', time: '6:00 PM EST', available: true, description: '1 spot available' },
    { id: '730pm', time: '7:30 PM EST', available: true, description: '4 spots available' },
    { id: '9pm', time: '9:00 PM EST', available: false, description: 'Full - join waitlist' },
  ];

  const handleJoinSession = () => {
    if (currentTheme && selectedTime) {
      const sessionId = `${currentTheme}-${selectedTime}-${Date.now()}`;
      navigate(`/waiting/${sessionId}`);
      onClose();
    }
  };

  const handleThemeSelect = (themeId: string) => {
    setCurrentTheme(themeId);
    setShowThemeSelector(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200/50">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            {!showThemeSelector && currentTheme && (
              <button
                onClick={() => setShowThemeSelector(true)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-slate-600" />
              </button>
            )}
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                {showThemeSelector ? 'Choose Your Theme' : 'Select Your Time'}
              </h2>
              <p className="text-slate-600 text-sm">
                {showThemeSelector 
                  ? 'What would you like to explore today?' 
                  : `${themes[currentTheme as keyof typeof themes]?.name} Circle`
                }
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {showThemeSelector ? (
          /* Theme Selection */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(themes).map(([id, theme]) => (
              <button
                key={id}
                onClick={() => handleThemeSelect(id)}
                className="group text-left p-6 rounded-2xl bg-slate-50/50 hover:bg-white border border-slate-200/50 hover:border-slate-300/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${theme.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <span className="text-xl">{theme.icon}</span>
                </div>
                
                <h3 className="font-semibold text-slate-800 mb-2">{theme.name}</h3>
                <p className="text-sm text-slate-600 mb-3">{theme.description}</p>
                <p className="text-xs text-slate-500 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Next: {theme.nextSession}
                </p>
              </button>
            ))}
          </div>
        ) : (
          /* Time Selection */
          <div>
            {/* Selected Theme Display */}
            <div className="bg-slate-50/50 rounded-2xl p-4 mb-6 border border-slate-200/50">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${themes[currentTheme as keyof typeof themes]?.color} rounded-xl flex items-center justify-center`}>
                  <span className="text-lg">{themes[currentTheme as keyof typeof themes]?.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{themes[currentTheme as keyof typeof themes]?.name}</h3>
                  <p className="text-sm text-slate-600">{themes[currentTheme as keyof typeof themes]?.description}</p>
                </div>
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-3 mb-6">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => slot.available && setSelectedTime(slot.id)}
                  disabled={!slot.available}
                  className={`group w-full p-4 rounded-2xl border text-left transition-all duration-300 ${
                    selectedTime === slot.id
                      ? 'border-blue-400 bg-blue-50/50 shadow-lg'
                      : slot.available
                      ? 'border-slate-200/50 bg-white/50 hover:border-slate-300/50 hover:bg-white hover:shadow-md'
                      : 'border-slate-200/30 bg-slate-50/30 cursor-not-allowed opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-800">{slot.time}</h4>
                      <p className="text-sm text-slate-600">{slot.description}</p>
                    </div>
                    {slot.id === 'now' && slot.available && (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                        <span className="text-red-500 text-xs font-medium">LIVE</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Join Button */}
            <button
              onClick={handleJoinSession}
              disabled={!selectedTime}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-2xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-400 hover:to-indigo-500 transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center space-x-3 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <Sparkles className="h-5 w-5 relative z-10" />
              <span className="relative z-10">Join Circle (60 minutes)</span>
              <Heart className="h-5 w-5 relative z-10" />
            </button>
            
            <div className="mt-4 text-center space-y-2">
              <p className="text-slate-500 text-sm">
                ✨ Free during our beta testing phase
              </p>
              <p className="text-slate-600 text-xs">
                Small circles • Authentic stories • Meaningful connections
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionScheduler;