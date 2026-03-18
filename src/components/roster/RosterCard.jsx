import { useEffect, useState } from "react"

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
}) {
  const [cardActive, setCardActive] = useState(false)

  useEffect(() => {
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
  }, [isVisible, replayKey])

  return (
    <article
      className={`roster-card ${cardActive ? "roster-card--active" : ""}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="roster-card__poster">
        <img className="roster-card__image" src={image} alt={alt} />
        <div className="roster-card__overlay" />

        <div className="roster-card__info">
          <h3 className="roster-card__name">{name}</h3>
          <p className="roster-card__realname">{realName}</p>
          <p className="roster-card__position">{position}</p>
        </div>

        <div className="roster-card__divider"></div>

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
              aria-hidden="true"
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