function Header() {
  const menus = [
    { label: "Roster", href: "#roster" },
    { label: "Partners", href: "#partners" },
    { label: "Official Uniform", href: "#uniform" },
    { label: "News & Events", href: "#news" },
  ]

  const handleRosterClick = (e) => {
    e.preventDefault()

    // 1) 애니메이션 즉시 트리거
    window.dispatchEvent(new CustomEvent("restartRosterAnimation"))

    // 2) 바로 스크롤
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
            if (menu.label === "Roster") {
              return (
                <a
                  key={menu.label}
                  href={menu.href}
                  className="header__link"
                  onClick={handleRosterClick}
                >
                  {menu.label}
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
                  {menu.label}
                </a>
              )
            }

            return (
              <a key={menu.label} href={menu.href} className="header__link">
                {menu.label}
              </a>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default Header