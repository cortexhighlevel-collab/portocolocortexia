import { useEffect, useMemo, useRef, useState } from "react";
import Player from "@vimeo/player";

interface VimeoScrollVideoProps {
  videoId: string;
}

const VimeoScrollVideo = ({ videoId }: VimeoScrollVideoProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  const rafIdRef = useRef<number | null>(null);
  const durationRef = useRef(0);

  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);

  const isSeekingRef = useRef(false);
  const seekSafetyTimeoutRef = useRef<number | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [statusMsg, setStatusMsg] = useState("SINCRONIZANDO FRAMES...");

  // Keep DOM ownership with React (iframe stays in React tree).
  // This prevents the classic React error:
  // "Failed to execute 'removeChild' on 'Node'" (usually caused by player.destroy() removing the iframe).
  const vimeoUrl = useMemo(
    () =>
      `https://player.vimeo.com/video/${videoId}?muted=1&autoplay=1&background=1&autopause=0&controls=0&loop=0`,
    [videoId]
  );

  useEffect(() => {
    if (!iframeRef.current) return;

    let isActive = true;

    // HMR/remount safety: if a previous cleanup blanked/unloaded the iframe,
    // ensure we restore the correct src before re-initializing the player.
    try {
      iframeRef.current.src = vimeoUrl;
    } catch {
      // ignore
    }

    setIsReady(false);
    setStatusMsg("SINCRONIZANDO FRAMES...");

    targetTimeRef.current = 0;
    currentTimeRef.current = 0;

    const player = new Player(iframeRef.current);
    playerRef.current = player;

    const readyTimeout = window.setTimeout(() => {
      setIsReady(true);
      setStatusMsg("");
    }, 2500);

    const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

    const startScrollSyncLoop = () => {
      const tick = () => {
        if (!isActive) return;

        const p = playerRef.current;
        const container = scrollContainerRef.current;
        const duration = durationRef.current;

        if (!p || !container || !duration) {
          rafIdRef.current = window.requestAnimationFrame(tick);
          return;
        }

        const startY = container.offsetTop;
        const containerHeight = container.offsetHeight;
        const maxScroll = Math.max(containerHeight - window.innerHeight, 1);
        const localScroll = window.scrollY - startY;
        const progress = clamp01(localScroll / maxScroll);

        targetTimeRef.current = progress * duration;

        const diff = targetTimeRef.current - currentTimeRef.current;
        const lerpFactor = 0.08;

        if (Math.abs(diff) > 0.0001) {
          currentTimeRef.current += diff * lerpFactor;
        }

        if (!isSeekingRef.current && Math.abs(diff) > 0.06) {
          isSeekingRef.current = true;

          if (seekSafetyTimeoutRef.current) {
            window.clearTimeout(seekSafetyTimeoutRef.current);
            seekSafetyTimeoutRef.current = null;
          }

          // Safety release in case Vimeo never resolves the promise.
          seekSafetyTimeoutRef.current = window.setTimeout(() => {
            isSeekingRef.current = false;
            seekSafetyTimeoutRef.current = null;
          }, 300);

          const seekTo = Math.min(Math.max(currentTimeRef.current, 0), duration);

          p.setCurrentTime(seekTo)
            .then(() => p.pause())
            .catch(() => {
              // ignore seek errors
            })
            .finally(() => {
              if (seekSafetyTimeoutRef.current) {
                window.clearTimeout(seekSafetyTimeoutRef.current);
                seekSafetyTimeoutRef.current = null;
              }
              isSeekingRef.current = false;
            });
        }

        rafIdRef.current = window.requestAnimationFrame(tick);
      };

      rafIdRef.current = window.requestAnimationFrame(tick);
    };

    player
      .ready()
      .then(async () => {
        if (!isActive) return;

        window.clearTimeout(readyTimeout);

        await player.setMuted(true).catch(() => {
          // ignore
        });

        // Prime decoding/buffering so seeking updates frames reliably.
        // Muted playback is typically allowed without user gesture.
        await player
          .play()
          .then(() => player.pause())
          .catch(() => {
            // ignore
          });

        const duration = await player.getDuration();
        durationRef.current = duration;

        await player.setCurrentTime(0).catch(() => {
          // ignore
        });
        await player.pause().catch(() => {
          // ignore
        });

        setIsReady(true);
        setStatusMsg("");

        startScrollSyncLoop();
      })
      .catch((err) => {
        console.log("Vimeo player error:", err);
        window.clearTimeout(readyTimeout);
        setIsReady(true);
        setStatusMsg("");
      });

    return () => {
      isActive = false;
      window.clearTimeout(readyTimeout);

      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      if (seekSafetyTimeoutRef.current) {
        window.clearTimeout(seekSafetyTimeoutRef.current);
        seekSafetyTimeoutRef.current = null;
      }

      const current = playerRef.current;
      playerRef.current = null;

      if (current) {
        // CRITICAL: do NOT call destroy() here; it removes the iframe from the DOM and can crash React.
        current.pause().catch(() => {
          // ignore
        });
        current.unload?.().catch(() => {
          // ignore
        });
      }
    };
  }, [vimeoUrl]);

  return (
    <>
      {/* Scroll container - creates the scroll space */}
      <div
        ref={scrollContainerRef}
        className="vimeo-scroll-container"
        style={{ height: "150vh", position: "relative" }}
      />

      {/* Status message */}
      {statusMsg && <div className="vimeo-status-msg">{statusMsg}</div>}

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
