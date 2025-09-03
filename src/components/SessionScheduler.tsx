import React, { useState } from 'react';
import { X, Calendar, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SessionSchedulerProps {
  onClose: () => void;
}

const SessionScheduler: React.FC<SessionSchedulerProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [selectedAudience, setSelectedAudience] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const audiences = [
    { id: 'corporate', name: 'Corporate Professionals', description: 'Work-life balance, career growth' },
    { id: 'nomads', name: 'Digital Nomads', description: 'Travel experiences, remote life' },
    { id: 'students', name: 'University Students', description: 'Academic life, future aspirations' },
    { id: 'seniors', name: 'Senior Citizens', description: 'Life wisdom, retirement stories' },
  ];

  const timeSlots = [
    { id: '9am', time: '9:00 AM EST', available: true },
    { id: '12pm', time: '12:00 PM EST', available: true },
    { id: '3pm', time: '3:00 PM EST', available: false },
    { id: '6pm', time: '6:00 PM EST', available: true },
    { id: '9pm', time: '9:00 PM EST', available: true },
  ];

  const handleJoinSession = () => {
    if (selectedAudience && selectedTime) {
      const sessionId = `${selectedAudience}-${selectedTime}-${Date.now()}`;
      navigate(`/waiting/${sessionId}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Join a Storytelling Circle</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-amber-400" />
              Choose Your Community
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {audiences.map((audience) => (
                <button
                  key={audience.id}
                  onClick={() => setSelectedAudience(audience.id)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    selectedAudience === audience.id
                      ? 'border-amber-500 bg-amber-500/10 text-white'
                      : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <div className="font-medium">{audience.name}</div>
                  <div className="text-sm opacity-80">{audience.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-amber-400" />
              Select Time (Today)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => slot.available && setSelectedTime(slot.id)}
                  disabled={!slot.available}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    selectedTime === slot.id
                      ? 'border-amber-500 bg-amber-500/10 text-white'
                      : slot.available
                      ? 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
                      : 'border-slate-700 bg-slate-800/50 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <div className="font-medium">{slot.time}</div>
                  <div className="text-sm opacity-80">
                    {slot.available ? '3 spots available' : 'Full'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-700">
            <button
              onClick={handleJoinSession}
              disabled={!selectedAudience || !selectedTime}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-amber-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              <Calendar className="h-5 w-5" />
              <span>Join Circle (60 minutes)</span>
            </button>
            
            <div className="mt-4 text-center">
              <p className="text-slate-400 text-sm">
                First 8 circles are free • No commitment required
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionScheduler;