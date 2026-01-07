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
  const lastScrollYRef = useRef<number | null>(null);
  const isSeekingRef = useRef(false);

  const [isReady, setIsReady] = useState(false);
  const [statusMsg, setStatusMsg] = useState("SINCRONIZANDO FRAMES...");

  // Base link format requested (we immediately pause and scrub via scroll)
  const vimeoUrl = useMemo(
    () =>
      `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&background=1&autopause=0&controls=0`,
    [videoId]
  );

  useEffect(() => {
    if (!iframeRef.current) return;

    setIsReady(false);
    setStatusMsg("SINCRONIZANDO FRAMES...");

    const player = new Player(iframeRef.current);
    playerRef.current = player;

    const readyTimeout = window.setTimeout(() => {
      // Avoid black screen forever if Vimeo takes too long
      setIsReady(true);
      setStatusMsg("");
    }, 2500);

    const stopAutoplay = () => {
      player.pause().catch(() => {
        // ignore
      });
    };

    const startScrollSyncLoop = () => {
      const tick = () => {
        const p = playerRef.current;
        const container = scrollContainerRef.current;

        if (!p || !container || !durationRef.current) {
          rafIdRef.current = window.requestAnimationFrame(tick);
          return;
        }

        const currentScrollY = window.scrollY;
        if (lastScrollYRef.current !== currentScrollY && !isSeekingRef.current) {
          lastScrollYRef.current = currentScrollY;

          const startY = container.offsetTop;
          const containerHeight = container.offsetHeight;
          const maxScroll = Math.max(containerHeight - window.innerHeight, 1);
          const localScroll = currentScrollY - startY;
          const progress = Math.min(Math.max(localScroll / maxScroll, 0), 1);

          const targetTime = progress * durationRef.current;

          isSeekingRef.current = true;
          p.setCurrentTime(targetTime)
            .then(() => p.pause())
            .catch(() => {
              // ignore seek errors
            })
            .finally(() => {
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
        window.clearTimeout(readyTimeout);

        // Make sure Vimeo never keeps playing by itself
        player.on("play", stopAutoplay);

        await player.setMuted(true).catch(() => {
          // ignore
        });

        // Let it start (autoplay param) so it buffers, then freeze at frame 0
        await player.pause().catch(() => {
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

        // Sync immediately to the current scroll position
        lastScrollYRef.current = null;
        startScrollSyncLoop();
      })
      .catch((err) => {
        console.log("Vimeo player error:", err);
        window.clearTimeout(readyTimeout);
        setIsReady(true);
        setStatusMsg("");
      });

    return () => {
      window.clearTimeout(readyTimeout);

      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      const current = playerRef.current;
      playerRef.current = null;

      if (current) {
        try {
          current.off("play", stopAutoplay);
        } catch {
          // ignore
        }

        current.destroy().catch(() => {
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
        style={{ height: "800vh", position: "relative" }}
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
