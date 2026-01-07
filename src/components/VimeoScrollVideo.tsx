import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";

interface VimeoScrollVideoProps {
  videoId: string;
}

const VimeoScrollVideo = ({ videoId }: VimeoScrollVideoProps) => {
  const playerRef = useRef<Player | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [statusMsg, setStatusMsg] = useState("SINCRONIZANDO FRAMES...");
  
  const videoDurationRef = useRef(0);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    // Show video immediately while loading
    const timeout = setTimeout(() => {
      setIsReady(true);
      setStatusMsg("");
    }, 2000);

    const player = new Player(iframeRef.current);
    playerRef.current = player;

    player.ready().then(() => {
      clearTimeout(timeout);
      player.getDuration().then((duration) => {
        videoDurationRef.current = duration;
        setIsReady(true);
        setStatusMsg("");
        startSyncLoop();
      });
    }).catch((err) => {
      console.log("Vimeo player error:", err);
      clearTimeout(timeout);
      setIsReady(true);
      setStatusMsg("");
    });

    return () => {
      clearTimeout(timeout);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  const startSyncLoop = () => {
    const syncFrame = () => {
      if (!playerRef.current || !videoDurationRef.current) {
        rafIdRef.current = requestAnimationFrame(syncFrame);
        return;
      }

      // Calculate scroll height (800vh equivalent)
      const scrollHeight = window.innerHeight * 8;
      const scrollY = window.scrollY;
      const maxScroll = scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      
      targetTimeRef.current = scrollProgress * videoDurationRef.current;

      // Smooth interpolation
      const diff = targetTimeRef.current - currentTimeRef.current;
      const lerpFactor = 0.08;
      
      if (Math.abs(diff) > 0.01) {
        currentTimeRef.current += diff * lerpFactor;
        
        if (!isSeekingRef.current && Math.abs(diff) > 0.05) {
          isSeekingRef.current = true;
          playerRef.current.setCurrentTime(currentTimeRef.current).then(() => {
            isSeekingRef.current = false;
          }).catch(() => {
            isSeekingRef.current = false;
          });
        }
      }

      rafIdRef.current = requestAnimationFrame(syncFrame);
    };

    rafIdRef.current = requestAnimationFrame(syncFrame);
  };

  const vimeoUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&background=1&autopause=0&controls=0`;

  return (
    <>
      {/* Scroll container - creates the scroll space */}
      <div 
        className="vimeo-scroll-container"
        style={{ height: "800vh", position: "relative" }}
      />
      
      {/* Status message */}
      {statusMsg && (
        <div className="vimeo-status-msg">
          {statusMsg}
        </div>
      )}
      
      {/* Video background */}
      <div className={`vimeo-video-background ${isReady ? "video-ready" : ""}`}>
        <iframe
          ref={iframeRef}
          src={vimeoUrl}
          allow="autoplay; fullscreen"
          allowFullScreen
          title="Background Video"
        />
      </div>
    </>
  );
};

export default VimeoScrollVideo;
