import "./VidSection.css"

const videos = [
  {
    title: "VEX OFFICIAL VID 02",
    desc: "VEX E-SPORTS 로스터 소개",
    videoId: "FVvfB32RsAM",
  },
  {
    title: "VEX OFFICIAL VID 01",
    desc: "VEX E-SPORTS 공식 창단",
    videoId: "mAxPqc8X3Gk",
  },
  {
    title: "VEX OFFICIAL VID 03",
    desc: "VEX Esports 공식 영상",
    videoId: "TV_-0JGcNCY",
  },
]

function VidSection() {
  return (
    <section id="vid" className="vid-section">
      <div className="vid-section__inner">
        <div className="vid-section__header">
          <h2 className="vid-section__title">VID</h2>
          <p className="vid-section__desc">VEX Esports 공식 영상</p>
        </div>

        <div className="vid-list">
          {videos.map((video) => (
            <article className="vid-card" key={video.videoId}>
              <div className="vid-card__video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="vid-card__info">
                <h3>{video.title}</h3>
                <p>{video.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VidSection