import { useEffect, useState } from "react"
import "./Header.css"
const ADMIN_PASSWORD = "vex2026"

function Header() {
  const [adminMode, setAdminMode] = useState(false)
  const [tapCount, setTapCount] = useState(0)

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

  const isMobile = () => window.innerWidth <= 640

  const enableAdminMode = () => {
    const password = window.prompt("ADMIN PASSWORD")

    if (password !== ADMIN_PASSWORD) {
      alert("비밀번호가 틀렸습니다.")
      return
    }

    document.body.classList.add("vex-admin-mode")
    window.dispatchEvent(new Event("vex-admin-mode-change"))
  }

  const scrollToTop = (e) => {
    e.preventDefault()

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

    if (!isMobile()) return

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

  const scrollToSection = (id, offset = 0) => {
    const el = document.getElementById(id)
    if (!el) return

    const rect = el.getBoundingClientRect()
    const absoluteTop = window.scrollY + rect.top
    const targetPosition = absoluteTop - offset

    window.scrollTo({
      top: Math.max(targetPosition, 0),
      behavior: "smooth",
    })
  }

  const scrollToSectionForMobile = (id, offset = 0) => {
    const el = document.getElementById(id)
    if (!el) return

    const rect = el.getBoundingClientRect()
    const absoluteTop = window.scrollY + rect.top
    const targetPosition = absoluteTop - 102 - offset

    window.scrollTo({
      top: Math.max(targetPosition, 0),
      behavior: "smooth",
    })
  }

  const handleRosterClick = (e) => {
    e.preventDefault()
    window.dispatchEvent(new CustomEvent("restartRosterAnimation"))

    if (isMobile()) {
      scrollToSectionForMobile("roster", 10)
      return
    }

    scrollToSection("roster", 90)
  }

  const handlePartnersClick = (e) => {
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

  const handleUniformClick = (e) => {
    e.preventDefault()

    if (isMobile()) {
      scrollToSectionForMobile("uniform", 18)
      return
    }

    scrollToSection("uniform", 90)
  }

  const handleVidClick = (e) => {
    e.preventDefault()

    if (isMobile()) {
      scrollToSectionForMobile("vid", 18)
      return
    }

    scrollToSection("vid", 90)
  }

  const handleNewsClick = (e) => {
    e.preventDefault()

    if (isMobile()) {
      scrollToSectionForMobile("news", 18)
      return
    }

    scrollToSection("news", 90)
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
      if (isMobile()) return

      if (e.key === sequence[index]) {
        index += 1

        if (index === sequence.length) {
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
        <a href="/" className="header__logo" onClick={scrollToTop}>
          <img src="/images/logo/vex-logo.png" alt="VEX Esports logo" />

          {adminMode && (
            <span className="header__admin-badge">
              ADMIN
            </span>
          )}
        </a>

        <nav className="header__nav">
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

            if (menu.label === "Roster") {
              return (
                <a key={menu.label} href="/" className="header__link" onClick={handleRosterClick}>
                  {content}
                </a>
              )
            }

            if (menu.label === "Partners") {
              return (
                <a key={menu.label} href="/" className="header__link" onClick={handlePartnersClick}>
                  {content}
                </a>
              )
            }

            if (menu.label === "Official Uniform") {
              return (
                <a key={menu.label} href="/" className="header__link" onClick={handleUniformClick}>
                  {content}
                </a>
              )
            }

            if (menu.label === "VIDEO") {
              return (
                <a key={menu.label} href="/" className="header__link" onClick={handleVidClick}>
                  {content}
                </a>
              )
            }

            if (menu.label === "News & Events") {
              return (
                <a key={menu.label} href="/" className="header__link" onClick={handleNewsClick}>
                  {content}
                </a>
              )
            }

            return (
              <a key={menu.label} href={menu.href} className="header__link">
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