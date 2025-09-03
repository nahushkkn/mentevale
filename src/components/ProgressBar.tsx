import React from 'react';

interface ProgressBarProps {
  currentPhase: number;
  phases: Array<{
    name: string;
    duration: number;
    description: string;
  }>;
  timeRemaining: number;
  totalDuration: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentPhase, 
  phases, 
  timeRemaining, 
  totalDuration 
}) => {
  const progressPercentage = ((totalDuration - timeRemaining) / totalDuration) * 100;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <h2 className="text-white font-semibold">
              Phase {currentPhase + 1}: {phases[currentPhase]?.name}
            </h2>
            <span className="text-slate-400 text-sm">
              {phases[currentPhase]?.description}
            </span>
          </div>
          
          <div className="text-amber-400 font-mono text-lg">
            {formatTime(timeRemaining)}
          </div>
        </div>
        
        <div className="relative">
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          {/* Phase markers */}
          <div className="flex justify-between mt-2">
            {phases.map((phase, index) => (
              <div 
                key={index}
                className={`text-xs font-medium ${
                  index <= currentPhase ? 'text-amber-400' : 'text-slate-500'
                }`}
              >
                {phase.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;