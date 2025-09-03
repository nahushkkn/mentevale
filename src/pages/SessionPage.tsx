import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SessionPhase from '../components/SessionPhase';
import ParticipantGrid from '../components/ParticipantGrid';
import ProgressBar from '../components/ProgressBar';
import AIHost from '../components/AIHost';
import StoryArtifact from '../components/StoryArtifact';

const SessionPage: React.FC = () => {
  const { sessionId } = useParams();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes
  const [participants] = useState([
    { id: '1', name: 'You', avatar: '/api/placeholder/100/100', isHost: true, isActive: false },
    { id: '2', name: 'Sarah M.', avatar: '/api/placeholder/100/100', isHost: false, isActive: false },
    { id: '3', name: 'Alex R.', avatar: '/api/placeholder/100/100', isHost: false, isActive: true },
    { id: '4', name: 'Jordan L.', avatar: '/api/placeholder/100/100', isHost: false, isActive: false },
  ]);
  const [showArtifact, setShowArtifact] = useState(false);

  const phases = [
    { name: 'Induction', duration: 300, description: 'Setting the sacred space' },
    { name: 'Anchor Story', duration: 300, description: 'AI shares opening narrative' },
    { name: 'Circle Reflection', duration: 1800, description: 'Participants share stories' },
    { name: 'Weaving', duration: 900, description: 'Creating collective narrative' },
    { name: 'Closure', duration: 300, description: 'Blessing and departure' },
  ];

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
        setCurrentPhase(i);
        break;
      }
    }
  }, [timeRemaining, phases]);

  if (showArtifact) {
    return <StoryArtifact sessionId={sessionId || ''} participants={participants} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Subtle background animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 h-screen flex flex-col">
        {/* Progress Bar */}
        <ProgressBar 
          currentPhase={currentPhase}
          phases={phases}
          timeRemaining={timeRemaining}
          totalDuration={3600}
        />

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* AI Host & Session Content */}
          <div className="lg:col-span-2 space-y-6">
            <AIHost currentPhase={currentPhase} phases={phases} />
            <SessionPhase 
              phase={phases[currentPhase]}
              phaseIndex={currentPhase}
              participants={participants}
            />
          </div>

          {/* Participant Grid */}
          <div className="lg:col-span-1">
            <ParticipantGrid participants={participants} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionPage;