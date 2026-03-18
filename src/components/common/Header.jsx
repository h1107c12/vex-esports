function Header() {
  const menus = [
    { label: "Roster", mobileLabel: "Roster", href: "#roster" },
    { label: "Partners", mobileLabel: "Partners", href: "#partners" },
    { label: "Official Uniform", mobileLabel: "Uniform", href: "#uniform" },
    { label: "News & Events", mobileLabel: "News", href: "#news" },
  ]

  const isMobile = () => window.innerWidth <= 640

  const scrollToSectionForMobile = (id, offset = 0) => {
    const el = document.getElementById(id)
    if (!el) return

    const rect = el.getBoundingClientRect()
    const absoluteTop = window.scrollY + rect.top
    const targetPosition = absoluteTop - 118 - offset

    window.scrollTo({
      top: Math.max(targetPosition, 0),
      behavior: "smooth",
    })
  }

  const handleRosterClick = (e) => {
    window.dispatchEvent(new CustomEvent("restartRosterAnimation"))

    if (!isMobile()) return

    e.preventDefault()
    scrollToSectionForMobile("roster", 10)
  }

  const handlePartnersClick = (e) => {
    if (!isMobile()) return

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
    if (!isMobile()) return

    e.preventDefault()
    scrollToSectionForMobile("uniform", 18)
  }

  const handleNewsClick = (e) => {
    if (!isMobile()) return

    e.preventDefault()
    scrollToSectionForMobile("news", 18)
  }

  return (
    <header className="header">
      <div className="header__inner">
        <a href="#top" className="header__logo">
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
                  href={menu.href}
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
                  href={menu.href}
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
                  href={menu.href}
                  className="header__link"
                  onClick={handleUniformClick}
                >
                  {content}
                </a>
              )
            }

            if (menu.label === "News & Events") {
              return (
                <a
                  key={menu.label}
                  href={menu.href}
                  className="header__link"
                  onClick={handleNewsClick}
                >
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