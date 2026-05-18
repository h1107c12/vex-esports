import { useEffect, useState } from "react"
import "./Header.css"

const ADMIN_PASSWORD = "vex2026"

const menus = [
  { label: "Roster", mobileLabel: "Roster", id: "roster" },
  { label: "Partners", mobileLabel: "Partners", id: "partners" },
  { label: "Official Uniform", mobileLabel: "Uniform", id: "uniform" },
  {
    label: "ACADEMY",
    mobileLabel: "ACADEMY",
    href: "https://vex-academy.vercel.app/",
  },
  { label: "VIDEO", mobileLabel: "VIDEO", id: "vid" },
  { label: "News & Events", mobileLabel: "News", id: "news" },
]

function Header() {
  const [adminMode, setAdminMode] = useState(false)
  const [tapCount, setTapCount] = useState(0)

  const enableAdminMode = () => {
    const password = window.prompt("ADMIN PASSWORD")

    if (password !== ADMIN_PASSWORD) {
      alert("비밀번호가 틀렸습니다.")
      return
    }

    document.body.classList.add("vex-admin-mode")
    window.dispatchEvent(new Event("vex-admin-mode-change"))
  }

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()

    const el = document.getElementById(sectionId)
    if (!el) return

    const offset = window.innerWidth <= 640 ? 118 : 90
    const rect = el.getBoundingClientRect()
    const top = window.scrollY + rect.top - offset

    window.scrollTo({
      top: Math.max(top, 0),
      behavior: "smooth",
    })
  }

  const scrollToPartners = (e) => {
    e.preventDefault()

    const el = document.getElementById("partners")
    if (!el) return

    const rect = el.getBoundingClientRect()
    const absoluteTop = window.scrollY + rect.top
    const targetPosition =
      absoluteTop - window.innerHeight / 2 + rect.height / 2

    window.scrollTo({
      top: Math.max(targetPosition, 0),
      behavior: "smooth",
    })
  }

  const handleLogoTap = (e) => {
    e.preventDefault()

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

    if (window.innerWidth > 768) return

    const nextTapCount = tapCount + 1

    if (nextTapCount >= 10) {
      enableAdminMode()
      setTapCount(0)
      return
    }

    setTapCount(nextTapCount)

    window.setTimeout(() => {
      setTapCount(0)
    }, 3500)
  }

  useEffect(() => {
    const sequence = [
      "ArrowUp",
      "ArrowDown",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
    ]

    let index = 0

    const handleKeyDown = (e) => {
      if (window.innerWidth <= 768) return

      if (e.key === sequence[index]) {
        index += 1

        if (index >= sequence.length) {
          enableAdminMode()
          index = 0
        }

        return
      }

      index = 0
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  useEffect(() => {
    const checkAdminMode = () => {
      setAdminMode(document.body.classList.contains("vex-admin-mode"))
    }

    checkAdminMode()

    window.addEventListener("vex-admin-mode-change", checkAdminMode)

    return () => {
      window.removeEventListener("vex-admin-mode-change", checkAdminMode)
    }
  }, [])

  return (
    <header className={`header ${adminMode ? "header--admin" : ""}`}>
      <div className="header__inner">
        <a
          href="/"
          className="header__logo"
          aria-label="VEX Esports home"
          onClick={handleLogoTap}
        >
          <img src="/images/logo/vex-logo.png" alt="VEX Esports logo" />

          {adminMode && <span className="header__admin-badge">ADMIN</span>}
        </a>

        <nav className="header__nav" aria-label="Primary navigation">
          {menus.map((menu) => {
            const content = (
              <>
                <span className="header__label header__label--desktop">
                  {menu.label}
                </span>

                <span className="header__label header__label--mobile">
                  {menu.mobileLabel}
                </span>
              </>
            )

            if (menu.href) {
              return (
                <a
                  key={menu.label}
                  href={menu.href}
                  className="header__link"
                >
                  {content}
                </a>
              )
            }

            if (menu.id === "partners") {
              return (
                <a
                  key={menu.label}
                  href={`#${menu.id}`}
                  className="header__link"
                  onClick={scrollToPartners}
                >
                  {content}
                </a>
              )
            }

            if (menu.id === "roster") {
              return (
                <a
                  key={menu.label}
                  href={`#${menu.id}`}
                  className="header__link"
                  onClick={(e) => {
                    window.dispatchEvent(
                      new CustomEvent("restartRosterAnimation")
                    )
                    scrollToSection(e, menu.id)
                  }}
                >
                  {content}
                </a>
              )
            }

            return (
              <a
                key={menu.label}
                href={`#${menu.id}`}
                className="header__link"
                onClick={(e) => scrollToSection(e, menu.id)}
              >
                {content}
              </a>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default Header