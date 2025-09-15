import React, { useState, useRef, useEffect } from 'react';

interface ScratchCardProps {
  question: string;
  category: 'opener' | 'deep' | 'fun' | 'reflection';
  isRevealed: boolean;
  canScratch: boolean;
  onReveal: () => void;
  participantName: string;
}

const ScratchCard: React.FC<ScratchCardProps> = ({
  question,
  category,
  isRevealed,
  canScratch,
  onReveal,
  participantName
}) => {
  const [isScratching, setIsScratching] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    if (canScratch && !isRevealed) {
      initializeScratchCanvas();
    }
  }, [canScratch, isRevealed]);

  const initializeScratchCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Create silver scratch-off surface
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#C0C0C0');
    gradient.addColorStop(0.5, '#E8E8E8');
    gradient.addColorStop(1, '#B8B8B8');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Add texture pattern
    ctx.globalCompositeOperation = 'multiply';
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.moveTo(Math.random() * rect.width, 0);
      ctx.lineTo(Math.random() * rect.width, rect.height);
      ctx.stroke();
    }

    ctx.globalCompositeOperation = 'source-over';
  };

  const startScratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!canScratch || isRevealed) return;
    
    setIsScratching(true);
    isDrawing.current = true;
    scratch(e);
  };

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || !canScratch) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left) * 2;
    const y = (clientY - rect.top) * 2;

    // Erase the scratch area
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();

    // Calculate scratch progress
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    
    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i + 3] === 0) {
        transparentPixels++;
      }
    }

    const progress = transparentPixels / (imageData.data.length / 4);
    setScratchProgress(progress);

    // Auto-reveal when 30% is scratched
    if (progress > 0.3 && !isRevealed) {
      onReveal();
    }
  };

  const stopScratch = () => {
    setIsScratching(false);
    isDrawing.current = false;
  };

  const getCategoryColor = () => {
    switch (category) {
      case 'opener': return 'bg-green-100 text-green-700';
      case 'fun': return 'bg-yellow-100 text-yellow-700';
      case 'deep': return 'bg-purple-100 text-purple-700';
      case 'reflection': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="relative h-24 bg-white/90 backdrop-blur-sm rounded-lg border border-slate-200/50 overflow-hidden">
      {/* Question Content (always rendered behind) */}
      <div className="absolute inset-0 p-3 flex flex-col justify-center">
        <div className={`inline-flex self-start px-2 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryColor()}`}>
          {category}
        </div>
        <p className="text-slate-800 text-sm font-medium leading-snug">
          {question}
        </p>
      </div>

      {/* Scratch Layer */}
      {!isRevealed && (
        <div className="absolute inset-0">
          {canScratch ? (
            <>
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full cursor-pointer"
                onMouseDown={startScratch}
                onMouseMove={scratch}
                onMouseUp={stopScratch}
                onMouseLeave={stopScratch}
                onTouchStart={startScratch}
                onTouchMove={scratch}
                onTouchEnd={stopScratch}
                style={{ touchAction: 'none' }}
              />
              {/* Instructions overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`text-center transition-opacity duration-300 ${isScratching ? 'opacity-70' : 'opacity-100'}`}>
                  <div className="text-slate-600 text-xs mb-1">Your Question</div>
                  <div className="text-slate-700 text-sm font-medium">
                    {scratchProgress > 0.1 ? 'Keep scratching...' : 'Scratch to reveal'}
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Non-interactive version for other participants */
            <div className="absolute inset-0 bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center">
              <div className="text-center">
                <div className="text-white text-xs mb-1">{participantName}'s Card</div>
                <div className="text-white/70 text-sm">Hidden</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Reveal animation */}
      {isRevealed && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 animate-pulse duration-1000" />
      )}
    </div>
  );
};

export default ScratchCard;