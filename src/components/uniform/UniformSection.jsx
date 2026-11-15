import "./UniformSection.css"
import uniformBanner from "../../assets/uniform/uniform-banner.png"
import { FaDiscord, FaInstagram } from "react-icons/fa"
import { SiKakaotalk } from "react-icons/si"
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

        <div className="uniform-purchase-actions">
          <a
            href={UNIFORM_ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="uniform-consult-btn uniform-order-btn"
          >
            <span className="uniform-consult-text">
              유니폼 구매 신청
            </span>
          </a>

          <div className="uniform-contact">
            <p className="uniform-contact__label">
              구매 문의
            </p>

            <div className="uniform-contact__links">
              <a
                href="https://open.kakao.com/o/smAEavei"
                target="_blank"
                rel="noopener noreferrer"
                className="uniform-contact__button"
              >
                <SiKakaotalk aria-hidden="true" />
                <span>카카오톡</span>
              </a>

              <a
                href="https://www.instagram.com/vexesports_official?dlrf=MTM2bjBlMXA2eDF3cQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="uniform-contact__button"
              >
                <FaInstagram aria-hidden="true" />
                <span>Instagram</span>
              </a>

              <a
                href={DISCORD_CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="uniform-contact__button"
              >
                <FaDiscord aria-hidden="true" />
                <span>디스코드</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
