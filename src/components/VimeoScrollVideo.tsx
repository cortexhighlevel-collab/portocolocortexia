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
  const lastUserScrollAtRef = useRef(0);
  const lastTargetTimeRef = useRef(0);


  // Base link format (no autoplay). We scrub frames via JS.
  const vimeoUrl = `https://player.vimeo.com/video/${videoId}?autoplay=0&muted=1&background=1&autopause=0&controls=0`;

  useEffect(() => {
    if (!iframeRef.current) return;

    // Show video immediately while loading
    const timeout = setTimeout(() => {
      setIsReady(true);
      setStatusMsg("");
    }, 2000);

    const player = new Player(iframeRef.current);
    playerRef.current = player;

    // Ensure it doesn't start playing by itself
    player.pause().catch(() => {
      // ignore
    });
    const handlePlay = () => {
      // Guarantee the video never plays on its own (only scrub via scroll)
      player.pause().catch(() => {
        // ignore
      });
    };

    const handleTimeUpdate = () => {
      // If the user isn't actively scrolling, keep it paused
      if (Date.now() - lastUserScrollAtRef.current > 200) {
        player.pause().catch(() => {
          // ignore
        });
      }
    };

    player.ready().then(async () => {
      clearTimeout(timeout);

      player.on("play", handlePlay);
      player.on("timeupdate", handleTimeUpdate);

      await player.setMuted(true);
      await player.setLoop(false);

      // Keep it strictly paused; we only scrub with setCurrentTime on scroll
      await player.pause().catch(() => {
        // ignore
      });

      const duration = await player.getDuration();
      videoDurationRef.current = duration;

      // Start at 0 and keep paused
      await player.setCurrentTime(0);
      await player.pause().catch(() => {
        // ignore
      });

      setIsReady(true);
      setStatusMsg("");

      // Sync once to current scroll position
      window.requestAnimationFrame(() => {
        window.dispatchEvent(new Event("scroll"));
      });
    }).catch((err) => {
      console.log("Vimeo player error:", err);
      clearTimeout(timeout);
      setIsReady(true);
      setStatusMsg("");
    });

    return () => {
      clearTimeout(timeout);
      if (playerRef.current) {
        try {
          playerRef.current.off("play");
          playerRef.current.off("timeupdate");
        } catch {
          // ignore
        }
        playerRef.current = null;
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
      lastUserScrollAtRef.current = now;

      // Calculate scroll progress based on container height
      const containerHeight = containerRef.current.offsetHeight;
      const startY = containerRef.current.offsetTop;
      const scrollY = window.scrollY - startY;
      const maxScroll = Math.max(containerHeight - window.innerHeight, 1);
      const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      const targetTime = scrollProgress * videoDurationRef.current;
      lastTargetTimeRef.current = targetTime;

      playerRef.current
        .setCurrentTime(targetTime)
        .then(() => playerRef.current?.pause())
        .catch(() => {
          // Ignore seek/pause errors
        });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


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
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Background Video"
        />
      </div>
    </>
  );
};

export default VimeoScrollVideo;
