import { useEffect, useState } from "react"
import "./VidSection.css"
import { supabase } from "../../lib/supabase"

export default function VidSection() {
  const [videos, setVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [adminMode, setAdminMode] = useState(false)

  const [form, setForm] = useState({
    title: "",
    description: "",
    videoId: "",
  })

  const fetchVideos = async () => {
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
      return
    }

    setVideos(data || [])

    if (data?.length) {
      setSelectedVideo(data[0])
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  useEffect(() => {
    const syncAdminMode = () => {
      setAdminMode(document.body.classList.contains("vex-admin-mode"))
    }

    syncAdminMode()

    window.addEventListener("vex-admin-mode-change", syncAdminMode)

    return () => {
      window.removeEventListener("vex-admin-mode-change", syncAdminMode)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const extractVideoId = (value) => {
    const input = value.trim()

    if (input.includes("youtube.com/watch?v=")) {
      return input.split("v=")[1]?.split("&")[0]
    }

    if (input.includes("youtu.be/")) {
      return input.split("youtu.be/")[1]?.split("?")[0]
    }

    if (input.includes("youtube.com/embed/")) {
      return input.split("embed/")[1]?.split("?")[0]
    }

    return input
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!adminMode) return

    const videoId = extractVideoId(form.videoId)

    if (!form.title.trim() || !form.description.trim() || !videoId) {
      alert("제목, 설명, 유튜브 링크를 모두 입력해줘.")
      return
    }

    const { error } = await supabase
      .from("videos")
      .insert([
        {
          title: form.title.trim(),
          description: form.description.trim(),
          videoId,
        },
      ])

    if (error) {
      console.error(error)
      alert("영상 등록 실패")
      return
    }

    setForm({
      title: "",
      description: "",
      videoId: "",
    })

    fetchVideos()
  }

  const handleDelete = async (id) => {
    if (!adminMode) return

    const ok = window.confirm("이 영상을 삭제할까?")
    if (!ok) return

    const { error } = await supabase
      .from("videos")
      .delete()
      .eq("id", id)

    if (error) {
      console.error(error)
      alert("영상 삭제 실패")
      return
    }

    fetchVideos()
  }

  if (!selectedVideo) {
    return (
      <section id="vid" className="vid-section">
        <div className="vid-section__inner">
          <div className="vid-section__header">
            <h2 className="vid-section__title">VIDEO</h2>
            <p className="vid-section__desc">Vex E-Sports 공식 영상</p>
          </div>

          {adminMode && (
            <form className="video-admin" onSubmit={handleSubmit}>
              <div className="video-admin__grid">
                <input
                  type="text"
                  name="title"
                  placeholder="영상 제목"
                  value={form.title}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="description"
                  placeholder="영상 설명"
                  value={form.description}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="videoId"
                  placeholder="유튜브 링크 or Video ID"
                  value={form.videoId}
                  onChange={handleChange}
                />
              </div>

              <button type="submit">영상 등록</button>
            </form>
          )}
        </div>
      </section>
    )
  }

  return (
    <section id="vid" className="vid-section">
      <div className="vid-section__inner">
        <div className="vid-section__header">
          <h2 className="vid-section__title">VIDEO</h2>
          <p className="vid-section__desc">Vex E-Sports 공식 영상</p>
        </div>

        {adminMode && (
          <form className="video-admin" onSubmit={handleSubmit}>
            <div className="video-admin__grid">
              <input
                type="text"
                name="title"
                placeholder="영상 제목"
                value={form.title}
                onChange={handleChange}
              />

              <input
                type="text"
                name="description"
                placeholder="영상 설명"
                value={form.description}
                onChange={handleChange}
              />

              <input
                type="text"
                name="videoId"
                placeholder="유튜브 링크 or Video ID"
                value={form.videoId}
                onChange={handleChange}
              />
            </div>

            <button type="submit">영상 등록</button>
          </form>
        )}

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
            <p>{selectedVideo.description}</p>
          </div>
        </div>

        <div className="vid-list">
          {videos.map((video) => {
            const thumbnail = `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`
            const isActive = selectedVideo.videoId === video.videoId

            return (
              <div
                key={video.id}
                className={`vid-card ${isActive ? "is-active" : ""}`}
              >
                <button
                  type="button"
                  className="vid-card__button"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="vid-card__video">
                    <img src={thumbnail} alt={video.title} loading="lazy" />
                    <span className="vid-card__play">▶</span>
                  </div>

                  <div className="vid-card__info">
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                  </div>
                </button>

                {adminMode && (
                  <button
                    type="button"
                    className="vid-card__delete"
                    onClick={() => handleDelete(video.id)}
                  >
                    삭제
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}