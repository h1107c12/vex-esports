import { useEffect, useRef, useState } from "react"
import {
  FiArrowUpRight,
  FiMaximize2,
  FiUsers,
  FiX,
} from "react-icons/fi"
import streamersData, { getPostUrl } from "../../data/streamersData"
import "./Streamers.css"

function ImageViewer({ streamer, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = "hidden"

    if (dialog && !dialog.open) {
      dialog.showModal()
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  const closeViewer = () => {
    dialogRef.current?.close()
  }

  return (
    <dialog
      ref={dialogRef}
      className="streamer-lightbox"
      aria-labelledby="streamer-lightbox-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closeViewer()
        }
      }}
    >
      <div className="streamer-lightbox__content">
        <div className="streamer-lightbox__heading">
          <h2 id="streamer-lightbox-title">
            {streamer.name}
          </h2>

          <button
            type="button"
            className="streamer-lightbox__close"
            onClick={closeViewer}
            aria-label="확대 이미지 닫기"
          >
            <FiX aria-hidden="true" />
          </button>
        </div>

        <img
          src={streamer.image}
          alt={`${streamer.name} 파트너 이미지 확대`}
        />
      </div>
    </dialog>
  )
}

function StreamerCard({ streamer, index, onEnlarge }) {
  const [failedImage, setFailedImage] = useState(null)
  const hasImage =
    Boolean(streamer.image) && failedImage !== streamer.image

  const name = streamer.name.trim() || "공개 예정"
  const postUrl = getPostUrl(streamer.postUrl)
  const number = String(index + 1).padStart(2, "0")

  return (
    <article className="streamer-card">
      <div className="streamer-card__visual">
        {hasImage ? (
          <button
            type="button"
            className="streamer-card__image-link"
            onClick={() => onEnlarge(streamer)}
            aria-label={`${name} 이미지 크게 보기`}
          >
            <img
              src={streamer.image}
              alt={`VEX 스트리머 ${name} 파트너 이미지`}
              loading="lazy"
              decoding="async"
              onError={() => setFailedImage(streamer.image)}
            />

            <span className="streamer-card__enlarge">
              <FiMaximize2 aria-hidden="true" />
              크게 보기
            </span>
          </button>
        ) : (
          <div className="streamer-card__placeholder">
            <span
              className="streamer-card__placeholder-number"
              aria-hidden="true"
            >
              {number}
            </span>

            <FiUsers size={32} aria-hidden="true" />
            <strong>이미지 준비 중</strong>
            <span>{name}</span>
          </div>
        )}
      </div>

      <div className="streamer-card__body">
        <p className="streamer-card__label">
          VEX STREAMER <span>{number}</span>
        </p>

        <h4>{name}</h4>

        <div className="streamer-card__actions">
          {postUrl && (
            <a
              className="streamer-card__post"
              href={postUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} 게시물 바로가기 (새 탭)`}
            >
              게시물 바로가기
              <FiArrowUpRight size={18} aria-hidden="true" />
            </a>
          )}

          <div className="streamer-card__channels">
            {(streamer.channels ?? []).map((channel) => {
              const url = getPostUrl(channel.url)
              if (!url) return null

              return (
                <a
                  key={channel.label}
                  className="streamer-card__channel"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} ${channel.label} 바로가기 (새 탭)`}
                >
                  <span>{channel.label}</span>
                  <FiArrowUpRight size={16} aria-hidden="true" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Streamers() {
  const [selectedStreamer, setSelectedStreamer] = useState(null)

  return (
    <section
      className="streamers"
      aria-labelledby="streamers-title"
    >
      <div className="streamers__heading">
        <div>
          <p className="streamers__eyebrow">
            VEX CREATOR PARTNERS
          </p>
          <h3 id="streamers-title">함께하는 스트리머</h3>
        </div>

        <p>플레이의 즐거움을 함께 나누는 VEX의 파트너</p>
      </div>

      <div className="streamers__grid">
        {streamersData.map((streamer, index) => (
          <StreamerCard
            key={streamer.id}
            streamer={streamer}
            index={index}
            onEnlarge={setSelectedStreamer}
          />
        ))}
      </div>

      {selectedStreamer && (
        <ImageViewer
          streamer={selectedStreamer}
          onClose={() => setSelectedStreamer(null)}
        />
      )}
    </section>
  )
}
