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

const newsArticles = [
  {
    id: 1,
    category: "NEWS",
    date: "2026.01.01",
    title: "Vex E-Sports 공식 홈페이지 오픈",
    description:
      "Vex E-Sports의 새로운 공식 홈페이지가 공개되었습니다.",
    href: "https://example.com",
  },
  {
    id: 2,
    category: "EVENT",
    date: "2026.01.08",
    title: "Vex E-Sports 신규 로스터 공개",
    description:
      "새로운 시즌을 함께할 Vex E-Sports 선수단을 소개합니다.",
    href: "https://example.com",
  },
  {
    id: 3,
    category: "ARTICLE",
    date: "2026.01.12",
    title: "대회 참가 및 팀 활동 소식",
    description:
      "다가오는 공식 대회 일정 및 활동 내용을 확인해보세요.",
    href: "https://example.com",
  },
];

export default function NewsSection() {
  return (
    <section className="news-section" id="news">
      <div className="news-container">
        <div className="news-header">
          <h2 className="news-title">뉴스 및 이벤트</h2>

          <p className="news-subtitle">
            Vex E-Sports의 최신 소식과 공식 뉴스를 확인하세요
          </p>
        </div>

        {/* 기사 카드 */}
        <div className="article-grid">
          {newsArticles.map((article) => (
            <a
              key={article.id}
              href={article.href}
              target="_blank"
              rel="noreferrer"
              className="article-card"
            >
              <div className="article-card__line" />

              <div className="article-card__top">
                <span className="article-card__category">
                  {article.category}
                </span>

                <span className="article-card__date">
                  {article.date}
                </span>
              </div>

              <h3 className="article-card__title">
                {article.title}
              </h3>

              <p className="article-card__description">
                {article.description}
              </p>

              <div className="article-card__bottom">
                기사 보러가기 →
              </div>
            </a>
          ))}
        </div>

        {/* SNS 카드 */}
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
                <span className="news-card__button-text">
                  {item.buttonText}
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}