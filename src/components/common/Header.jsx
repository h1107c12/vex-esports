function Header() {
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

  const scrollToTop = (e) => {
    e.preventDefault()

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
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

  return (
    <header className="header">
      <div className="header__inner">
        <a href="/" className="header__logo" onClick={scrollToTop}>
          <img src="/images/logo/vex-logo.png" alt="VEX Esports logo" />
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
                <a
                  key={menu.label}
                  href="/"
                  className="header__link"
                  onClick={handleRosterClick}
                >
                  {content}
                </a>
              )
            }

            if (menu.label === "Partners") {
              return (
                <a
                  key={menu.label}
                  href="/"
                  className="header__link"
                  onClick={handlePartnersClick}
                >
                  {content}
                </a>
              )
            }

            if (menu.label === "Official Uniform") {
              return (
                <a
                  key={menu.label}
                  href="/"
                  className="header__link"
                  onClick={handleUniformClick}
                >
                  {content}
                </a>
              )
            }

            if (menu.label === "VIDEO") {
              return (
                <a
                  key={menu.label}
                  href="/"
                  className="header__link"
                  onClick={handleVidClick}
                >
                  {content}
                </a>
              )
            }

            if (menu.label === "News & Events") {
              return (
                <a
                  key={menu.label}
                  href="/"
                  className="header__link"
                  onClick={handleNewsClick}
                >
                  {content}
                </a>
              )
            }

            return (
              <a
                key={menu.label}
                href={menu.href}
                className="header__link"
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