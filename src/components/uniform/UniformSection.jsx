import "./UniformSection.css"
import uniformBanner from "../../assets/uniform/uniform-banner.png"
import { FaDiscord } from "react-icons/fa"
import {
  UNIFORM_ORDER_URL,
  DISCORD_CONSULT_URL,
} from "../../data/shopConfig"

export default function UniformSection() {
  return (
    <section className="uniform-section" id="uniform">
      <div className="uniform-container">
        <div className="uniform-header">
          <h2 className="uniform-title">OFFICIAL UNIFORM</h2>
          <p className="uniform-subtitle">
            Vex E-Sports 2026 시즌 2 하계 공식 유니폼
          </p>
        </div>

        <div className="uniform-image-wrap">
          <img
            src={uniformBanner}
            alt="VEX Esports 2026 하계 유니폼"
            className="uniform-image"
          />
        </div>

        <div className="uniform-btn-wrap">
          <a
            href={UNIFORM_ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="uniform-consult-btn uniform-order-btn"
          >
            <span className="uniform-consult-text">
              유니폼 바로 구매하기
            </span>
          </a>

          <a
            href={DISCORD_CONSULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="uniform-consult-btn"
          >
            <span className="uniform-consult-btn__shine" />
            <FaDiscord className="uniform-consult-icon" />
            <span className="uniform-consult-text">
              디스코드 구매 상담
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
