import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const YouTubeScrollVideo = () => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [statusMsg, setStatusMsg] = useState("SINCRONIZANDO FRAMES...");
  
  const videoIdRef = useRef("0xZ7zg2y9HY");
  const videoDurationRef = useRef(0);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const scrollHeightRef = useRef(0);

  useEffect(() => {
    // Load YouTube API
    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        initPlayer();
        return;
      }

      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = initPlayer;
    };

    const initPlayer = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: videoIdRef.current,
        playerVars: {
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          mute: 1,
          playsinline: 1,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    };

    const onPlayerReady = (event: any) => {
      videoDurationRef.current = event.target.getDuration();
      event.target.mute();
      event.target.playVideo();
    };

    const onPlayerStateChange = (event: any) => {
      if (event.data === window.YT.PlayerState.PLAYING && !isReady) {
        event.target.pauseVideo();
        setIsReady(true);
        setStatusMsg("");
        startSyncLoop();
      }
    };

    loadYouTubeAPI();

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const startSyncLoop = () => {
    const syncFrame = () => {
      if (!playerRef.current || !videoDurationRef.current) {
        rafIdRef.current = requestAnimationFrame(syncFrame);
        return;
      }

      // Calculate scroll height (800vh equivalent)
      scrollHeightRef.current = window.innerHeight * 8;
      
      const scrollY = window.scrollY;
      const maxScroll = scrollHeightRef.current - window.innerHeight;
      const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      
      targetTimeRef.current = scrollProgress * videoDurationRef.current;

      // Smooth interpolation
      const diff = targetTimeRef.current - currentTimeRef.current;
      const lerpFactor = 0.08;
      
      if (Math.abs(diff) > 0.01) {
        currentTimeRef.current += diff * lerpFactor;
        
        if (!isSeekingRef.current && Math.abs(diff) > 0.05) {
          isSeekingRef.current = true;
          playerRef.current.seekTo(currentTimeRef.current, true);
          setTimeout(() => {
            isSeekingRef.current = false;
          }, 50);
        }
      }

      lastScrollYRef.current = scrollY;
      rafIdRef.current = requestAnimationFrame(syncFrame);
    };

    rafIdRef.current = requestAnimationFrame(syncFrame);
  };

  return (
    <>
      {/* Scroll container - creates the scroll space */}
      <div 
        ref={containerRef}
        className="youtube-scroll-container"
        style={{ height: "800vh", position: "relative" }}
      />
      
      {/* Status message */}
      {statusMsg && (
        <div className="youtube-status-msg">
          {statusMsg}
        </div>
      )}
      
      {/* Video background */}
      <div className={`youtube-video-background ${isReady ? "video-ready" : ""}`}>
        <div id="youtube-player" />
      </div>
    </>
  );
};

export default YouTubeScrollVideo;
