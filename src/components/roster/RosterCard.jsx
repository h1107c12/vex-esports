import { useEffect, useState } from "react"
import "./RosterSection.css"

function RosterCard({
  image,
  alt,
  name,
  realName,
  position,
  streamLink,
  index,
  isVisible,
  replayKey,
  isMobile,
}) {
  const [cardActive, setCardActive] = useState(false)

  useEffect(() => {
    if (isMobile) {
      setCardActive(true)
      return
    }

    if (!isVisible) {
      setCardActive(false)
      return
    }

    setCardActive(false)

    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        setCardActive(true)
      })
    }, 20)

    return () => clearTimeout(timer)
  }, [isVisible, replayKey, isMobile])

  return (
    <article
      className={`roster-card ${cardActive ? "roster-card--active" : ""}`}
      style={!isMobile ? { transitionDelay: `${index * 90}ms` } : undefined}
    >
      <div className="roster-card__poster">
        <img
          className="roster-card__image"
          src={image}
          alt={alt}
          draggable="false"
          loading="eager"
          onError={() => {
            console.log("이미지 로드 실패:", image)
          }}
        />

        <div className="roster-card__overlay" />

        <div className="roster-card__info">
          <h3 className="roster-card__name">{name}</h3>
          <p className="roster-card__realname">{realName}</p>
          <p className="roster-card__position">{position}</p>
        </div>

        <div className="roster-card__divider" />

        {streamLink && (
          <a
            className="roster-card__stream"
            href={streamLink}
            target="_blank"
            rel="noreferrer"
            aria-label={`${name} 개인방송국`}
          >
            <svg
              className="roster-card__stream-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 17V7a2 2 0 0 0-2-2h-4.2l1.6-2.2a1 1 0 1 0-1.6-1.2L12.2 5H9.8L7.2 1.6A1 1 0 1 0 5.6 2.8L7.2 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5v2H8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2h-2v-2h5a2 2 0 0 0 2-2Z" />
            </svg>
          </a>
        )}
      </div>
    </article>
  )
}

export default RosterCard