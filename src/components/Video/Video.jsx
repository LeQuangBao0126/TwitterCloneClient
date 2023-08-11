import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";
import {
  MediaCommunitySkin,
  MediaOutlet,
  MediaPlayer,
  MediaPoster,
} from "@vidstack/react";
export default function Video() {
  const url = import.meta.env.VITE_API_URL;
  return (
    <div>
      <div style={{ maxWidth: "1200px" }}>
        <h2>Video streaming</h2>
        <MediaPlayer
          title="Phim test"
          src={`${url}/static/video-hls/Lh2NccN/master.m3u8`}
          aspectRatio={16 / 9}
          crossorigin=""
        >
          <MediaOutlet>
            <MediaPoster alt="Girl walks into sprite gnomes around her friend on a campfire in danger!" />
          </MediaOutlet>
          <MediaCommunitySkin />
        </MediaPlayer>
      </div>
    </div>
  );
}
