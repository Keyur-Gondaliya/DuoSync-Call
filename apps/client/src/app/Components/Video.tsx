import { RefObject, useEffect, useRef } from "react";

type Props = { stream: MediaStream | undefined };

function Video({ stream }: Props) {
  const videoRef = useRef<HTMLVideoElement>();
  const refinedVideoRef: RefObject<HTMLVideoElement> =
    videoRef as RefObject<HTMLVideoElement>;

  useEffect(() => {
    if (refinedVideoRef && refinedVideoRef.current && stream) {
      refinedVideoRef.current.srcObject = stream;
    }
  }, [videoRef, stream]);
  return (
    <div>
      {" "}
      <video
        style={{ borderRadius: 10 }}
        ref={refinedVideoRef}
        muted
        width="100%"
        autoPlay={true}
        playsInline={true}
      />
    </div>
  );
}

export default Video;
