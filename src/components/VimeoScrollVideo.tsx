import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";

interface VimeoScrollVideoProps {
  videoId: string;
}

const VimeoScrollVideo = ({ videoId }: VimeoScrollVideoProps) => {
  const playerRef = useRef<Player | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [statusMsg, setStatusMsg] = useState("SINCRONIZANDO FRAMES...");
  
  const videoDurationRef = useRef(0);
  const lastScrollTime = useRef(0);

  useEffect(() => {
    if (!iframeRef.current) return;

    // Show video immediately while loading
    const timeout = setTimeout(() => {
      setIsReady(true);
      setStatusMsg("");
    }, 2000);

    const player = new Player(iframeRef.current);
    playerRef.current = player;

    player.ready().then(async () => {
      clearTimeout(timeout);
      const duration = await player.getDuration();
      videoDurationRef.current = duration;
      // Set initial position to 0
      await player.setCurrentTime(0);
      setIsReady(true);
      setStatusMsg("");
    }).catch((err) => {
      console.log("Vimeo player error:", err);
      clearTimeout(timeout);
      setIsReady(true);
      setStatusMsg("");
    });

    return () => {
      clearTimeout(timeout);
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!playerRef.current || !videoDurationRef.current || !containerRef.current) return;

      // Throttle to avoid too many seek calls
      const now = Date.now();
      if (now - lastScrollTime.current < 50) return;
      lastScrollTime.current = now;

      // Calculate scroll progress based on container height
      const containerHeight = containerRef.current.offsetHeight;
      const scrollY = window.scrollY;
      const maxScroll = containerHeight - window.innerHeight;
      const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      
      const targetTime = scrollProgress * videoDurationRef.current;

      playerRef.current.setCurrentTime(targetTime).catch(() => {
        // Ignore seek errors
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const vimeoUrl = `https://player.vimeo.com/video/${videoId}?muted=1&background=1&autopause=0&controls=0&quality=1080p`;

  return (
    <>
      {/* Scroll container - creates the scroll space */}
      <div 
        ref={containerRef}
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
