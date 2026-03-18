import { useEffect, useRef, useState } from "react"
import rosterData from "../../data/rosterData"
import RosterCard from "./RosterCard"

function RosterSection() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [replayKey, setReplayKey] = useState(0)

  useEffect(() => {
    const target = sectionRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.2 }
    )

    observer.observe(target)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleRestartAnimation = () => {
      setReplayKey((prev) => prev + 1)
    }

    window.addEventListener("restartRosterAnimation", handleRestartAnimation)

    return () => {
      window.removeEventListener("restartRosterAnimation", handleRestartAnimation)
    }
  }, [])

  return (
    <section
      id="roster"
      ref={sectionRef}
      className={`roster-section ${isVisible ? "roster-section--active" : ""}`}
    >
      <div className="roster-section__inner">
        <div className="roster-section__header">
          <h2 className="roster-section__title">ROSTER</h2>
          <p className="roster-section__desc">
            Vex Esports의 정예 멤버들을 소개합니다
          </p>
        </div>

        <div className="roster-grid">
          {rosterData.map((player, index) => (
            <RosterCard
              key={`${player.id}-${replayKey}`}
              image={player.image}
              alt={player.alt}
              name={player.name}
              realName={player.realName}
              position={player.position}
              streamLink={player.streamLink}
              index={index}
              isVisible={isVisible}
              replayKey={replayKey}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RosterSection