import { useState } from "react"
import uniformBanner from "../assets/uniform/uniform-banner.png"
import {
  UNIFORM_ORDER_URL,
  DISCORD_CONSULT_URL,
  GOODS,
} from "../data/shopConfig"
import "./StorePage.css"

export default function StorePage() {
  const [category, setCategory] = useState("uniform")

  return (
    <div className="vex-store">
      <header className="vex-store__header">
        <a href="/" aria-label="벡스 홈페이지로 돌아가기">
          <img
            src="/images/logo/vex-logo.png"
            alt="VEX E-Sports"
          />
        </a>
        <a href="/">← 홈페이지로 돌아가기</a>
      </header>

      <main className="vex-store__main">
        <div className="vex-store__intro">
          <span>VEX E-SPORTS</span>
          <h1>VEX STORE</h1>
          <p>벡스의 유니폼과 굿즈를 만나보세요.</p>
          <p className="vex-store__notice">
            네이버 스토어 오픈 준비 중입니다.
            현재 유니폼 구매 신청은 구글 폼에서 진행됩니다.
          </p>
        </div>

        <div
          className="vex-store__tabs"
          aria-label="상품 종류"
        >
          <button
            type="button"
            aria-pressed={category === "uniform"}
            onClick={() => setCategory("uniform")}
          >
            유니폼
          </button>
          <button
            type="button"
            aria-pressed={category === "goods"}
            onClick={() => setCategory("goods")}
          >
            굿즈
          </button>
        </div>

        {category === "uniform" ? (
          <section aria-label="유니폼">
            <article className="vex-store__uniform">
              <img
                src={uniformBanner}
                alt="벡스 2026 시즌 2 하계 유니폼 상품 안내"
              />

              <div>
                <span className="vex-store__badge">
                  OFFICIAL UNIFORM
                </span>
                <h2>VEX 공식 유니폼</h2>
                <p>2026 시즌 2 하계 유니폼</p>
                <p>
                  상품 구성과 주문 안내를 확인하고
                  구매 신청서를 작성해주세요.
                </p>

                <a
                  className="vex-store__primary"
                  href={UNIFORM_ORDER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  유니폼 구매 신청 ↗
                </a>

                                <div className="vex-store__contact">
                  <p className="vex-store__contact-label">
                    구매 문의
                  </p>

                  <div className="vex-store__contact-links">
                    <a
                      href="https://open.kakao.com/o/smAEavei"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      카카오톡
                    </a>

                    <a
                      href="https://www.instagram.com/vexesports_official?dlrf=MTM2bjBlMXA2eDF3cQ=="
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>

                    <a
                      href={DISCORD_CONSULT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      디스코드
                    </a>
                  </div>
                </div>

                <p className="vex-store__small">
                  현재 구매 신청은 구글 폼에서 진행됩니다.
                </p>
              </div>
            </article>
          </section>
        ) : (
          <section aria-label="굿즈">
            <p className="vex-store__goods-notice">
              굿즈는 상품 준비 중입니다.
              판매 일정과 가격은 추후 안내합니다.
            </p>

            <div className="vex-store__goods">
              {GOODS.map((product) => (
                <article key={product.name}>
                  <div className="vex-store__placeholder">
                    <span>VEX E-SPORTS</span>
                    <span>
                      {product.url ? "OFFICIAL GOODS" : "COMING SOON"}
                    </span>
                  </div>

                  <h2>{product.name}</h2>

                  {product.url ? (
                    <a
                      className="vex-store__primary"
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      상품 보러 가기 ↗
                    </a>
                  ) : (
                    <span className="vex-store__badge">
                      상품 준비 중
                    </span>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="vex-store__footer">
        VEX E-Sports · <a href="/">공식 홈페이지</a>
      </footer>
    </div>
  )
}
