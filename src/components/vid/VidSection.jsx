import { useState } from "react"
import "./VidSection.css"

const videos = [
  {
    title: "VEX OFFICIAL VID 01",
    desc: "VEX E-SPORTS 로스터 소개",
    videoId: "FVvfB32RsAM",
  },
  {
    title: "VEX OFFICIAL VID 02",
    desc: "VEX E-SPORTS 공식 창단",
    videoId: "BlB5Ns1i-UE",
  },
  {
    title: "VEX OFFICIAL VID 03",
    desc: "VEX E-SPORTS 공식 스폰서 영상",
    videoId: "TV_-0JGcNCY",
  },
  {
    title: "VEX OFFICIAL VID 04",
    desc: "VEX E-SPORTS 클랜컵 홍보 영상",
    videoId: "lvD-m5AiY0s",
  },
]

function VidSection() {
  const [selectedVideo, setSelectedVideo] = useState(videos[0])

  return (
    <section id="vid" className="vid-section">
      <div className="vid-section__inner">
        <div className="vid-section__header">
          <h2 className="vid-section__title">VIDEO</h2>
          <p className="vid-section__desc">Vex E-Sports 공식 영상</p>
        </div>

        <div className="vid-preview">
          <div className="vid-preview__video">
            <iframe
              key={selectedVideo.videoId}
              src={`https://www.youtube.com/embed/${selectedVideo.videoId}?rel=0`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="vid-preview__info">
            <span>NOW PLAYING</span>
            <h3>{selectedVideo.title}</h3>
            <p>{selectedVideo.desc}</p>
          </div>
        </div>

        <div className="vid-list">
          {videos.map((video) => {
            const thumbnail = `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`
            const isActive = selectedVideo.videoId === video.videoId

            return (
              <button
                type="button"
                className={`vid-card ${isActive ? "is-active" : ""}`}
                key={video.videoId}
                onClick={() => setSelectedVideo(video)}
              >
                <div className="vid-card__video">
                  <img src={thumbnail} alt={video.title} loading="lazy" />
                  <span className="vid-card__play">▶</span>
                </div>

                <div className="vid-card__info">
                  <h3>{video.title}</h3>
                  <p>{video.desc}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default VidSection