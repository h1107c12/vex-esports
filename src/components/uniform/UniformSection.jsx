import "./UniformSection.css";
import uniformBanner from "../../assets/uniform/uniform-banner.png";
import { FaDiscord } from "react-icons/fa";

export default function UniformSection() {
  return (
    <section className="uniform-section" id="uniform">
      <div className="uniform-container">
        <div className="uniform-header">
          <h2 className="uniform-title">OFFICIAL UNIFORM</h2>
          <p className="uniform-subtitle">VEX Esports 2026 하계 공식 유니폼</p>
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
            href="https://discord.com/invite/z5mrwMBW4h"
            target="_blank"
            rel="noreferrer"
            className="uniform-consult-btn"
          >
            <span className="uniform-consult-btn__shine" />
            <FaDiscord className="uniform-consult-icon" />
            <span className="uniform-consult-text">구매 상담</span>
          </a>
        </div>
      </div>
    </section>
  );
}