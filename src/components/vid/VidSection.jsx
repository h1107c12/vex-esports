import { useEffect, useState } from "react"
import "./VidSection.css"
import { supabase } from "../../lib/supabase"

function VideoLane({ type, videos, adminMode, onDelete }) {
  const [selectedId, setSelectedId] = useState(null)
  const selected =
    videos.find((video) => video.videoId === selectedId) ??
    videos[0]

  const isShort = type === "short"
  const label = isShort ? "SHORTS" : "LONG FORM"

  return (
    <section
      className={`vex-video-lane ${isShort ? "is-short" : "is-long"}`}
      aria-label={isShort ? "벡스 쇼츠" : "벡스 롱폼"}
    >
      <div className="vex-video-lane__heading">
        <h3>{label}</h3>
        <span>{videos.length}개</span>
      </div>

      {selected ? (
        <>
          <div className="vex-video-player">
            <div className="vex-video-player__stage">
              <iframe
                key={selected.videoId}
                src={`https://www.youtube.com/embed/${encodeURIComponent(
                  selected.videoId
                )}?rel=0`}
                title={selected.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="vex-video-player__info">
              <span>NOW PLAYING</span>
              <h4>{selected.title}</h4>
              <p>{selected.description}</p>
              <a
                href={`https://www.youtube.com/watch?v=${encodeURIComponent(
                  selected.videoId
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube에서 보기 ↗
              </a>
            </div>
          </div>

          <div
            className="vex-video-strip"
            tabIndex={0}
            aria-label={`${label} 영상 목록, 좌우로 스크롤`}
          >
            {videos.map((video) => {
              const active = selected.videoId === video.videoId

              return (
                <div
                  key={video.id}
                  className={`vex-video-tile ${active ? "is-active" : ""}`}
                >
                  <button
                    type="button"
                    className="vex-video-tile__button"
                    aria-pressed={active}
                    onClick={() => setSelectedId(video.videoId)}
                  >
                    <div className="vex-video-tile__image">
                      <img
                        src={`https://i.ytimg.com/vi/${encodeURIComponent(
                          video.videoId
                        )}/hqdefault.jpg`}
                        alt=""
                        loading="lazy"
                      />
                      <span aria-hidden="true">▶</span>
                    </div>
                    <h4>{video.title}</h4>
                  </button>

                  {adminMode && (
                    <button
                      type="button"
                      className="vex-video-tile__delete"
                      onClick={() => onDelete(video.id)}
                    >
                      삭제
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <p className="vex-video-empty">
          아직 등록된 영상이 없습니다.
        </p>
      )}
    </section>
  )
}

export default function VidSection() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [adminMode, setAdminMode] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: "",
    description: "",
    videoId: "",
    video_type: "long",
  })

  const fetchVideos = async () => {
    setErrorMessage("")

    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .in("video_type", ["long", "short"])
      .order("created_at", {
        ascending: false,
        nullsFirst: false,
      })
      .order("id", { ascending: false })

    if (error) {
      console.error(error)
      setErrorMessage("영상 목록을 불러오지 못했습니다.")
    } else {
      setVideos(data || [])
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  useEffect(() => {
    const syncAdminMode = () => {
      setAdminMode(
        document.body.classList.contains("vex-admin-mode")
      )
    }

    syncAdminMode()
    window.addEventListener(
      "vex-admin-mode-change",
      syncAdminMode
    )

    return () => {
      window.removeEventListener(
        "vex-admin-mode-change",
        syncAdminMode
      )
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const extractVideoId = (value) => {
    const input = value.trim()

    if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input

    try {
      const url = new URL(input)
      const host = url.hostname.toLowerCase()
      let id = ""

      if (host === "youtu.be") {
        id = url.pathname.split("/")[1]
      } else if (
        host === "youtube.com" ||
        host.endsWith(".youtube.com")
      ) {
        const parts = url.pathname.split("/")

        id =
          url.searchParams.get("v") ||
          (["shorts", "embed", "live"].includes(parts[1])
            ? parts[2]
            : "")
      }

      return /^[A-Za-z0-9_-]{11}$/.test(id || "")
        ? id
        : null
    } catch {
      return null
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!adminMode || saving) return

    const videoId = extractVideoId(form.videoId)

    if (!form.title.trim() || !videoId) {
      alert("영상 제목과 올바른 유튜브 주소를 입력해주세요.")
      return
    }

    setSaving(true)

    const { error } = await supabase.from("videos").insert({
      title: form.title.trim(),
      description: form.description.trim(),
      videoId,
      video_type: form.video_type,
    })

    setSaving(false)

    if (error) {
      console.error(error)
      alert("영상 등록 실패: 중복 영상인지 또는 권한을 확인해주세요.")
      return
    }

    setForm({
      title: "",
      description: "",
      videoId: "",
      video_type: "long",
    })
    await fetchVideos()
  }

  const handleDelete = async (id) => {
    if (!adminMode) return
    if (!window.confirm("이 영상을 삭제하시겠습니까?")) return

    const { error } = await supabase
      .from("videos")
      .delete()
      .eq("id", id)

    if (error) {
      console.error(error)
      alert("영상 삭제 실패")
      return
    }

    await fetchVideos()
  }

  return (
    <section id="vid" className="vid-section">
      <div className="vid-section__inner">
        <div className="vid-section__header">
          <h2 className="vid-section__title">VIDEO</h2>
          <p className="vid-section__desc">
            Vex E-Sports 공식 영상
          </p>
        </div>

        {adminMode && (
          <form className="video-admin" onSubmit={handleSubmit}>
            <div className="video-admin__grid">
              <input
                name="title"
                aria-label="영상 제목"
                placeholder="영상 제목"
                value={form.title}
                onChange={handleChange}
                required
              />
              <input
                name="description"
                aria-label="영상 설명"
                placeholder="영상 설명"
                value={form.description}
                onChange={handleChange}
              />
              <input
                name="videoId"
                aria-label="유튜브 주소 또는 영상 ID"
                placeholder="유튜브 주소 또는 영상 ID"
                value={form.videoId}
                onChange={handleChange}
                required
              />
              <select
                name="video_type"
                aria-label="영상 종류"
                value={form.video_type}
                onChange={handleChange}
              >
                <option value="long">롱폼</option>
                <option value="short">쇼츠</option>
              </select>
            </div>
            <button type="submit" disabled={saving}>
              {saving ? "등록 중…" : "영상 등록"}
            </button>
          </form>
        )}

        {loading ? (
          <p className="vex-video-empty">영상을 불러오는 중입니다.</p>
        ) : errorMessage ? (
          <div className="vex-video-empty" role="alert">
            <p>{errorMessage}</p>
            <button type="button" onClick={fetchVideos}>
              다시 시도
            </button>
          </div>
        ) : (
          <div className="vex-video-columns">
            <VideoLane
              type="long"
              videos={videos.filter(
                (video) => video.video_type === "long"
              )}
              adminMode={adminMode}
              onDelete={handleDelete}
            />
            <VideoLane
              type="short"
              videos={videos.filter(
                (video) => video.video_type === "short"
              )}
              adminMode={adminMode}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>
    </section>
  )
}
/* 롱폼 / 쇼츠 두 영역 */
.vid-section .vex-video-columns {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: 32px;
  align-items: start;
}

.vex-video-lane {
  min-width: 0;
}

.vex-video-lane__heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.vex-video-lane__heading h3 {
  margin: 0;
  color: #a5a0ff;
  font-size: 20px;
  letter-spacing: 0.08em;
}

.vex-video-lane__heading > span {
  color: #aab6d0;
  font-size: 13px;
}

.vex-video-player {
  overflow: hidden;
  border: 1px solid #344b70;
  border-radius: 20px;
  background: #0b1020;
}

.vex-video-player__stage {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
}

.is-long .vex-video-player__stage {
  aspect-ratio: 16 / 9;
}

.is-short .vex-video-player__stage {
  padding: 0;
}

.vex-video-player__stage iframe {
  display: block;
  width: 100%;
  border: 0;
}

.is-long .vex-video-player__stage iframe {
  height: 100%;
  aspect-ratio: 16 / 9;
}

.is-short .vex-video-player__stage iframe {
  width: min(100%, 280px);
  aspect-ratio: 9 / 16;
}

.vex-video-player__info {
  padding: 20px;
}

.vex-video-player__info > span {
  color: #74c6ff;
  font-size: 10px;
  letter-spacing: 0.14em;
}

.vex-video-player__info h4 {
  margin: 10px 0;
  color: #fff;
  font-size: 18px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.vex-video-player__info p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  overflow-wrap: anywhere;
  margin: 0 0 14px;
  color: #aab6d0;
  font-size: 13px;
  line-height: 1.6;
}

.vex-video-player__info a {
  color: #8fcfff;
  font-size: 13px;
}

.vex-video-strip {
  display: flex;
  gap: 12px;
  min-width: 0;
  overflow-x: auto;
  padding: 18px 2px 14px;
  scroll-snap-type: x proximity;
  scrollbar-color: #6865b8 #11182b;
  scrollbar-width: thin;
}

.vex-video-tile {
  flex: 0 0 180px;
  min-width: 0;
  overflow: hidden;
  border: 1px solid #2b3450;
  border-radius: 12px;
  background: #0b1020;
  scroll-snap-align: start;
}

.is-short .vex-video-tile {
  flex-basis: 120px;
}

.vex-video-tile.is-active {
  border-color: #9c91ff;
}

.vex-video-tile__button {
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  color: #fff;
  text-align: left;
  cursor: pointer;
}

.vex-video-tile__image {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #000;
}

.is-short .vex-video-tile__image {
  aspect-ratio: 9 / 16;
}

.vex-video-tile__image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vex-video-tile__image > span {
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #000b;
  transform: translate(-50%, -50%);
}

.vex-video-tile h4 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  overflow-wrap: anywhere;
  min-height: 40px;
  margin: 12px;
  font-size: 13px;
  line-height: 20px;
}

.vex-video-tile__delete {
  width: 100%;
  padding: 10px;
  border: 0;
  background: #391a29;
  color: #ffb5bd;
  cursor: pointer;
}

.vex-video-empty {
  padding: 32px 16px;
  color: #b8c5dd;
  text-align: center;
}

.video-admin select {
  width: 100%;
  min-height: 48px;
  padding: 12px;
  border: 1px solid #344b70;
  border-radius: 12px;
  background: #10182b;
  color: #fff;
}

.vex-video-tile__button:focus-visible,
.vex-video-strip:focus-visible {
  outline: 2px solid #9c91ff;
  outline-offset: 2px;
}

@media (max-width: 800px) {
  .vid-section .vex-video-columns {
    grid-template-columns: minmax(0, 1fr);
    gap: 44px;
  }
}
