function Header() {
  const menus = [
    { label: "Roster", mobileLabel: "Roster", href: "#roster" },
    { label: "Partners", mobileLabel: "Partners", href: "#partners" },
    { label: "Official Uniform", mobileLabel: "Uniform", href: "#uniform" },
    { label: "News & Events", mobileLabel: "News", href: "#news" },
  ]

  const handleRosterClick = (e) => {
    e.preventDefault()

    window.dispatchEvent(new CustomEvent("restartRosterAnimation"))

    const el = document.getElementById("roster")
    if (!el) return

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const scrollPartnersToCenter = (e) => {
    e.preventDefault()

    const el = document.getElementById("partners")
    if (!el) return

    const rect = el.getBoundingClientRect()
    const absoluteTop = window.scrollY + rect.top
    const targetPosition =
      absoluteTop - window.innerHeight / 2 + rect.height / 2

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    })
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
                  onClick={scrollPartnersToCenter}
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