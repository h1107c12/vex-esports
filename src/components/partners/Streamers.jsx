import { useState } from "react"
import { FiArrowUpRight, FiMaximize2, FiUsers } from "react-icons/fi"
import streamersData, { getPostUrl } from "../../data/streamersData"
import "./Streamers.css"

function StreamerCard({ streamer, index }) {
  const [failedImage, setFailedImage] = useState(null)
  const hasImage = Boolean(streamer.image) && failedImage !== streamer.image
  const name = streamer.name.trim() || "공개 예정"
  const postUrl = getPostUrl(streamer.postUrl)

  return (
    <article className="streamer-card">
      <div className="streamer-card__visual">
        {hasImage ? (
          <a className="streamer-card__image-link" href={streamer.image} target="_blank" rel="noopener noreferrer" aria-label={`${name} 포스터 크게 보기 (새 창)`}>
            <img src={streamer.image} alt={`VEX 스트리머 ${name} 합류 포스터`} loading="lazy" decoding="async" onError={() => setFailedImage(streamer.image)} />
            <span className="streamer-card__enlarge"><FiMaximize2 aria-hidden="true" /> 크게 보기</span>
          </a>
        ) : (
          <div className="streamer-card__placeholder">
            <span className="streamer-card__placeholder-number" aria-hidden="true">0{index + 1}</span>
            <FiUsers size={32} aria-hidden="true" />
            <strong>{streamer.name ? "이미지 준비 중" : "COMING SOON"}</strong>
            <span>{streamer.name ? name : "새로운 만남을 기대해 주세요."}</span>
          </div>
        )}
      </div>
      <div className="streamer-card__body">
        <p className="streamer-card__label">VEX STREAMER <span>0{index + 1}</span></p>
        <h4>{name}</h4>
        {postUrl ? (
          <a className="streamer-card__post" href={postUrl} target="_blank" rel="noopener noreferrer" aria-label={`${name} 게시물 바로가기 (새 창)`}>
            게시물 바로가기 <FiArrowUpRight size={18} aria-hidden="true" />
          </a>
        ) : (
          <button className="streamer-card__post" type="button" disabled>게시물 준비 중 <FiArrowUpRight size={18} aria-hidden="true" /></button>
        )}
      </div>
    </article>
  )
}

export default function Streamers() {
  return (
    <section className="streamers" aria-labelledby="streamers-title">
      <div className="streamers__heading">
        <div><p className="streamers__eyebrow">VEX CREATOR PARTNERS</p><h3 id="streamers-title">함께하는 스트리머</h3></div>
        <p>플레이의 즐거움을 함께 나누는 VEX의 파트너</p>
      </div>
      <div className="streamers__grid">
        {streamersData.map((streamer, index) => <StreamerCard key={streamer.id} streamer={streamer} index={index} />)}
      </div>
    </section>
  )
}
