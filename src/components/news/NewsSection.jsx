import "./NewsSection.css";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

const socialLinks = [
  {
    id: "instagram",
    icon: <FaInstagram />,
    handle: "@vexesports_official",
    href: "https://www.instagram.com/vexesports_official/",
    buttonText: "Follow",
    theme: "instagram",
  },
  {
    id: "x",
    icon: <FaXTwitter />,
    handle: "@VexEsportsKR",
    href: "https://x.com/VexEsportsKR",
    buttonText: "Follow",
    theme: "x",
  },
];

export default function NewsSection() {
  return (
    <section className="news-section" id="news">
      <div className="news-container">
        <div className="news-header">
          <h2 className="news-title">뉴스 및 이벤트</h2>
          <p className="news-subtitle">
            Vex Esports의 최신 소식을 SNS에서 만나보세요
          </p>
        </div>

        <div className="news-grid">
          {socialLinks.map((item) => (
            <article
              key={item.id}
              className={`news-card news-card--${item.theme}`}
            >
              <div className="news-card__glow" />
              <div className={`news-card__icon news-card__icon--${item.theme}`}>
                {item.icon}
              </div>

              <p className="news-card__handle">{item.handle}</p>

              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={`news-card__button news-card__button--${item.theme}`}
              >
                <span className="news-card__button-shine" />
                <span className="news-card__button-text">{item.buttonText}</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}