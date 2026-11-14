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
