import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  isLoading: boolean;
  minDuration?: number;
}

const LoadingScreen = ({ isLoading, minDuration = 1500 }: LoadingScreenProps) => {
  const [showLoader, setShowLoader] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simular progresso suave
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Acelera no início, desacelera no fim
        const increment = prev < 70 ? 3 : prev < 90 ? 1.5 : 0.5;
        return Math.min(prev + increment, 100);
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoading && progress >= 100) {
      // Pequeno delay para garantir animação suave
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, progress]);

  // Garantir duração mínima
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (progress >= 100) {
        setShowLoader(false);
      }
    }, minDuration);
    return () => clearTimeout(timeout);
  }, [minDuration, progress]);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Scan lines overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(255,255,255,0.03) 2px,
                rgba(255,255,255,0.03) 4px
              )`,
            }}
          />

          {/* Grid pattern */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(239,68,68,0.1) 1px, transparent 1px),
                linear-gradient(rgba(239,68,68,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Main content */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Logo/Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-2xl md:text-3xl font-bold tracking-[0.3em] text-white/90 font-['Orbitron']">
                CORTEX
              </h1>
              <p className="text-[10px] tracking-[0.5em] text-zinc-500 mt-2 font-mono">
                PROTOCOL
              </p>
            </motion.div>

            {/* Loading bar container */}
            <div className="relative w-48 md:w-64">
              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-3 h-3 border-l border-t border-red-500/50" />
              <div className="absolute -top-2 -right-2 w-3 h-3 border-r border-t border-red-500/50" />
              <div className="absolute -bottom-2 -left-2 w-3 h-3 border-l border-b border-red-500/50" />
              <div className="absolute -bottom-2 -right-2 w-3 h-3 border-r border-b border-red-500/50" />

              {/* Background bar */}
              <div className="h-[2px] bg-zinc-800 rounded-full overflow-hidden">
                {/* Progress bar */}
                <motion.div
                  className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Glow effect */}
              <motion.div
                className="absolute top-0 left-0 h-[2px] bg-red-500 blur-sm"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Status text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 text-xs font-mono text-zinc-500"
            >
              <span className="text-red-500 animate-pulse">●</span>
              <span>INITIALIZING SYSTEM</span>
              <span className="text-zinc-600">{Math.round(progress)}%</span>
            </motion.div>
          </div>

          {/* Scanning line animation */}
          <motion.div
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
