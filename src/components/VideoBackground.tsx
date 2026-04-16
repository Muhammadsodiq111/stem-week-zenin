import { useRef, useEffect } from "react";
import Hls from "hls.js";

interface VideoBackgroundProps {
  src: string;
  className?: string;
  overlay?: boolean;
}

const VideoBackground = ({ src, className = "", overlay = true }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (src.endsWith(".m3u8") && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else {
      video.src = src;
    }
  }, [src]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      {overlay && <div className="video-overlay" />}
    </div>
  );
};

export default VideoBackground;
