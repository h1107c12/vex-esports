import "./Partners.css"
import { useEffect, useRef, useState } from "react"
import partnersData from "../../data/partnersData"
import PartnerModal from "./PartnerModal"

function Partners() {
  const trackRef = useRef(null)
  const frameRef = useRef(null)
  const offsetRef = useRef(0)
  const isHoveringRef = useRef(false)
  const lastTimeRef = useRef(0)
  const isPausedRef = useRef(false)

  const [selectedPartner, setSelectedPartner] = useState(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const normalSpeed = 30
    const hoverSpeed = 12

    const animate = (time) => {
      if (isPausedRef.current || selectedPartner) {
        frameRef.current = requestAnimationFrame(animate)
        return
      }

      if (!lastTimeRef.current) {
        lastTimeRef.current = time
      }

      let delta = (time - lastTimeRef.current) / 1000
      lastTimeRef.current = time
      delta = Math.min(delta, 0.05)

      const currentSpeed = isHoveringRef.current ? hoverSpeed : normalSpeed

      offsetRef.current -= currentSpeed * delta
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`

      const firstItem = track.firstElementChild

      if (firstItem) {
        const firstWidth = firstItem.getBoundingClientRect().width

        if (Math.abs(offsetRef.current) >= firstWidth) {
          offsetRef.current += firstWidth
          track.appendChild(firstItem)
          track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
        }
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPausedRef.current = true
      } else {
        isPausedRef.current = false
        lastTimeRef.current = 0
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    frameRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [selectedPartner])

  const handleMarqueeMouseEnter = () => {
    isHoveringRef.current = true
  }

  const handleMarqueeMouseLeave = () => {
    isHoveringRef.current = false
  }

  const openPartnerModal = (partner) => {
    setSelectedPartner(partner)
  }

  const closePartnerModal = () => {
    setSelectedPartner(null)
    lastTimeRef.current = 0
  }

  return (
    <>
      <section id="partners" className="partners">
        <div className="partners__header">
          <h2 className="partners__title">PARTNERS</h2>
          <p className="partners__desc">함께하는 파트너</p>
        </div>

        <div
          className="partners__marquee"
          onMouseEnter={handleMarqueeMouseEnter}
          onMouseLeave={handleMarqueeMouseLeave}
        >
          <div className="partners__track" ref={trackRef}>
            {[...partnersData, ...partnersData, ...partnersData].map(
              (partner, index) => (
                <div className="partners__item" key={`${partner.id}-${index}`}>
                  <button
                    type="button"
                    className="partners__logo-button"
                    onClick={() => openPartnerModal(partner)}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="partners__logo"
                      draggable="false"
                    />
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <PartnerModal partner={selectedPartner} onClose={closePartnerModal} />
    </>
  )
}

export default Partners