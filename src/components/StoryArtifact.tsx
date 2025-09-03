import React from 'react';
import { Download, Share2, BookOpen, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isHost: boolean;
  isActive: boolean;
}

interface StoryArtifactProps {
  sessionId: string;
  participants: Participant[];
}

const StoryArtifact: React.FC<StoryArtifactProps> = ({ sessionId, participants }) => {
  const collectiveStory = `
The Bridge of Shared Journeys

In a circle where strangers became storytellers, we discovered that every path we walk 
crosses bridges of transformation. Sarah's bridge led from certainty to courage, choosing 
passion over security. Alex's bridges span continents, carrying the weight of goodbyes 
but also the lightness of endless possibility.

Jordan showed us bridges built from knowledge, each semester a step closer to dreams 
that grow clearer with time. And in our sharing, we realized that the heaviest burdens 
become lighter when carried together, and the bridges we cross alone become pathways 
of connection when we pause to share our stories.

The ancient bridge keeper would smile to see us now - travelers who stopped not just 
to cross, but to recognize the sacred in our shared journey. In this circle, we learned 
that every ending is a beginning, every burden a teacher, and every story a gift that 
multiplies when given freely.

May you carry these voices with you across every bridge that awaits.
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <BookOpen className="h-16 w-16 text-amber-400 mx-auto mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Your Collective Story
          </h1>
          <p className="text-slate-300 text-lg">
            Woven from the threads of your shared experiences
          </p>
        </div>

        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mb-8">
          <div className="prose prose-invert max-w-none">
            <div className="text-slate-200 leading-relaxed text-lg whitespace-pre-line">
              {collectiveStory}
            </div>
          </div>
        </div>

        {/* Contributors */}
        <div className="bg-slate-800/40 rounded-xl p-6 mb-8">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <Heart className="h-5 w-5 text-red-400 mr-2" />
            Story Contributors
          </h3>
          <div className="flex flex-wrap gap-3">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center space-x-2 bg-slate-700/50 rounded-full px-4 py-2">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {participant.name.charAt(0)}
                  </span>
                </div>
                <span className="text-slate-300 text-sm">{participant.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="flex items-center space-x-2 bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors">
            <Download className="h-5 w-5" />
            <span>Download Story</span>
          </button>
          
          <button className="flex items-center space-x-2 bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-500 transition-colors">
            <Share2 className="h-5 w-5" />
            <span>Share Story</span>
          </button>
          
          <Link 
            to="/"
            className="flex items-center space-x-2 border border-slate-600 text-slate-300 px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoryArtifact;