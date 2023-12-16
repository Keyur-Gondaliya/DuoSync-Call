import { RefObject, useEffect, useRef } from "react";

type Props = {
  stream: MediaStream | undefined;
  muted: boolean;
  poster: string;
};

function Video({ stream, muted, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>();
  const refinedVideoRef: RefObject<HTMLVideoElement> =
    videoRef as RefObject<HTMLVideoElement>;

  useEffect(() => {
    if (refinedVideoRef && refinedVideoRef.current && stream) {
      refinedVideoRef.current.srcObject = stream;
    }
  }, [videoRef, stream]);
  return (
    <div className="w-full h-full rounded-2xl border-gray-300 border-2 bg-slate-300">
      <video
        ref={refinedVideoRef}
        autoPlay={true}
        playsInline={true}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "10px ",
          padding: "0.4rem",
        }}
        // muted={muted}
        // poster={poster}
      />
    </div>
  );
}

export default Video;
