import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Sparkles, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SessionSchedulerProps {
  onClose: () => void;
}

const SessionScheduler: React.FC<SessionSchedulerProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [selectedAudience, setSelectedAudience] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const audiences = [
    { 
      id: 'corporate', 
      name: 'Corporate Professionals', 
      description: 'Work-life balance, career transitions, finding meaning',
      participants: 4,
      nextSession: 'Today, 3:00 PM'
    },
    { 
      id: 'nomads', 
      name: 'Digital Nomads', 
      description: 'Travel stories, remote life, building community',
      participants: 3,
      nextSession: 'Today, 6:00 PM'
    },
    { 
      id: 'students', 
      name: 'University Students', 
      description: 'Academic pressures, future dreams, growing up',
      participants: 5,
      nextSession: 'Tomorrow, 12:00 PM'
    },
    { 
      id: 'wellness', 
      name: 'Wellness Seekers', 
      description: 'Mindfulness, healing journeys, personal growth',
      participants: 3,
      nextSession: 'Today, 7:30 PM'
    },
    { 
      id: 'seniors', 
      name: 'Life Wisdom Circle', 
      description: 'Life reflections, legacy stories, intergenerational wisdom',
      participants: 4,
      nextSession: 'Tomorrow, 10:00 AM'
    },
    { 
      id: 'creatives', 
      name: 'Creative Souls', 
      description: 'Artistic journeys, inspiration, overcoming blocks',
      participants: 2,
      nextSession: 'Tomorrow, 4:00 PM'
    },
  ];

  const timeSlots = [
    { id: 'now', time: 'Join Now', available: true, description: 'Circle starting in 5 minutes' },
    { id: '3pm', time: '3:00 PM EST', available: true, description: '2 spots available' },
    { id: '6pm', time: '6:00 PM EST', available: true, description: '3 spots available' },
    { id: '730pm', time: '7:30 PM EST', available: true, description: '4 spots available' },
    { id: '9pm', time: '9:00 PM EST', available: false, description: 'Full - join waitlist' },
  ];

  const handleJoinSession = () => {
    if (selectedAudience && selectedTime) {
      const sessionId = `${selectedAudience}-${selectedTime}-${Date.now()}`;
      navigate(`/waiting/${sessionId}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700/50 shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Join a Storytelling Circle</h2>
            <p className="text-slate-400">
              Choose your community and find your next meaningful conversation
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700/50 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Community Selection */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Users className="h-5 w-5 mr-3 text-amber-400" />
              Choose Your Community
            </h3>
            
            <div className="space-y-4">
              {audiences.map((audience) => (
                <button
                  key={audience.id}
                  onClick={() => setSelectedAudience(audience.id)}
                  className={`group w-full p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden ${
                    selectedAudience === audience.id
                      ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/20'
                      : 'border-slate-600 bg-slate-700/30 hover:border-slate-500 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{audience.name}</h4>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="text-amber-400">{audience.participants} joined</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 mb-2">{audience.description}</p>
                    <p className="text-xs text-slate-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Next: {audience.nextSession}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Calendar className="h-5 w-5 mr-3 text-amber-400" />
              Select Your Time
            </h3>
            
            <div className="space-y-4 mb-8">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => slot.available && setSelectedTime(slot.id)}
                  disabled={!slot.available}
                  className={`group w-full p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden ${
                    selectedTime === slot.id
                      ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/20'
                      : slot.available
                      ? 'border-slate-600 bg-slate-700/30 hover:border-slate-500 hover:bg-slate-700/50'
                      : 'border-slate-700 bg-slate-800/50 cursor-not-allowed opacity-50'
                  }`}
                >
                  {slot.available && (
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-white">{slot.time}</h4>
                      {slot.id === 'now' && (
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                          <span className="text-red-400 text-xs font-medium">LIVE</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-slate-400">{slot.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Join Button */}
            <button
              onClick={handleJoinSession}
              disabled={!selectedAudience || !selectedTime}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-2xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-amber-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center space-x-3 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <Sparkles className="h-5 w-5 relative z-10" />
              <span className="relative z-10">Join Circle (60 minutes)</span>
              <Heart className="h-5 w-5 relative z-10" />
            </button>
            
            <div className="mt-4 text-center space-y-2">
              <p className="text-slate-400 text-sm">
                ✨ Free during our beta testing phase
              </p>
              <p className="text-slate-500 text-xs">
                Help us create something beautiful together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionScheduler;