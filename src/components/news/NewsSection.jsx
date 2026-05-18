import { useEffect, useState } from "react"
import "./NewsSection.css"
import { FaInstagram, FaXTwitter } from "react-icons/fa6"
import { supabase } from "../../lib/supabase"

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
]

export default function NewsSection() {
  const [adminMode, setAdminMode] = useState(false)
  const [articles, setArticles] = useState([])
  const [form, setForm] = useState({
    category: "NEWS",
    title: "",
    description: "",
    href: "",
  })

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from("news_articles")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
      return
    }

    setArticles(data || [])
  }

  useEffect(() => {
    fetchArticles()

    const checkAdminMode = () => {
      setAdminMode(document.body.classList.contains("vex-admin-mode"))
    }

    checkAdminMode()

    window.addEventListener("vex-admin-mode-change", checkAdminMode)

    return () => {
      window.removeEventListener("vex-admin-mode-change", checkAdminMode)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.title.trim() || !form.description.trim() || !form.href.trim()) {
      alert("제목, 설명, 링크를 모두 입력해줘.")
      return
    }

    const today = new Date()
      .toLocaleDateString("ko-KR")
      .replaceAll(". ", ".")
      .replace(".", ".")
      .trim()

    const { error } = await supabase
      .from("news_articles")
      .insert([
        {
          category: form.category,
          date: today,
          title: form.title,
          description: form.description,
          href: form.href,
        },
      ])

    if (error) {
      console.error(error)
      alert("기사 등록 실패")
      return
    }

    setForm({
      category: "NEWS",
      title: "",
      description: "",
      href: "",
    })

    fetchArticles()
  }

  const handleDelete = async (id) => {
    const ok = window.confirm("이 기사를 삭제할까?")
    if (!ok) return

    const { error } = await supabase
      .from("news_articles")
      .delete()
      .eq("id", id)

    if (error) {
      console.error(error)
      alert("기사 삭제 실패")
      return
    }

    fetchArticles()
  }

  return (
    <section className="news-section" id="news">
      <div className="news-container">
        <div className="news-header">
          <h2 className="news-title">뉴스 및 이벤트</h2>

          <p className="news-subtitle">
            Vex E-Sports의 최신 소식과 공식 뉴스를 확인하세요
          </p>
        </div>

        {adminMode && (
          <form className="news-admin" onSubmit={handleSubmit}>
            <div className="news-admin__grid">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="NEWS">NEWS</option>
                <option value="EVENT">EVENT</option>
                <option value="ARTICLE">ARTICLE</option>
              </select>

              <input
                type="text"
                name="title"
                placeholder="기사 제목"
                value={form.title}
                onChange={handleChange}
              />

              <input
                type="text"
                name="description"
                placeholder="기사 설명"
                value={form.description}
                onChange={handleChange}
              />

              <input
                type="text"
                name="href"
                placeholder="기사 링크"
                value={form.href}
                onChange={handleChange}
              />
            </div>

            <button type="submit">
              기사 등록
            </button>
          </form>
        )}

        <div className="article-grid">
          {articles.map((article) => (
            <article
              key={article.id}
              className="article-card"
            >
              <a
                href={article.href}
                target="_blank"
                rel="noreferrer"
                className="article-card__link"
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

              {adminMode && (
                <button
                  type="button"
                  className="article-card__delete"
                  onClick={() => handleDelete(article.id)}
                >
                  삭제
                </button>
              )}
            </article>
          ))}
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
                <span className="news-card__button-text">
                  {item.buttonText}
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}