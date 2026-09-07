import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import "./ValorantPopup.css"

// 실제 신청 폼 주소를 받으면 이 값만 변경하세요.
const APPLY_URL = "https://docs.google.com/forms/d/1mBvBBEQ2vNeK9uvKVQlMqTtMyJiPhzFVZ0b0oWKxyRc/viewform"
const INSTAGRAM_URL = "https://www.instagram.com/p/Db7j0XpmVn-/"
const STORAGE_KEY = "vex-valorant-opening-hide-until-v1"
const benefits = [
  ["◎", "개인 맞춤 피드백"],
  ["◇", "팀 전술 · 실전 훈련"],
  ["↗", "데이터 기반 분석"],
  ["☆", "대회 참가 · 진출 지원"],
]

export default function ValorantPopup() {
  const dialogRef = useRef(null)
  const [hideToday, setHideToday] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    try {
      if (Number(localStorage.getItem(STORAGE_KEY)) > Date.now()) return
    } catch { /* 저장소 제한 시에도 팝업은 정상 표시 */ }
    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = "hidden"
    const restoreScroll = () => { document.body.style.overflow = previousOverflow }
    dialog.addEventListener("close", restoreScroll)
    return () => {
      dialog.removeEventListener("close", restoreScroll)
      if (dialog.open) dialog.close()
      restoreScroll()
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus()
      }
    }
  }, [])

  function closePopup() {
    if (hideToday) {
      // 방문자 기기 기준 다음 날 자정까지 숨김.
      const tomorrow = new Date()
      tomorrow.setHours(24, 0, 0, 0)
      try { localStorage.setItem(STORAGE_KEY, String(tomorrow.getTime())) }
      catch { /* 저장이 불가능해도 닫기는 동작 */ }
    }
    dialogRef.current?.close()
  }

  if (typeof document === "undefined") return null

  return createPortal(
    <dialog
      ref={dialogRef}
      className="vex-vp"
      aria-labelledby="vex-vp-title"
      aria-describedby="vex-vp-description"
      onCancel={(event) => { event.preventDefault(); closePopup() }}
    >
      <div className="vex-vp__body">
        <button type="button" className="vex-vp__x" aria-label="팝업 닫기" onClick={closePopup} autoFocus>×</button>
        <div className="vex-vp__brand">
          <img src="/images/hero/vex-hero-logo.png" alt="VEX Esports" />
          <span>VEX ACADEMY</span>
        </div>
        <span className="vex-vp__badge">NEW CLASS · 신규 수강생 모집</span>
        <h2 id="vex-vp-title">발로란트반<strong>신규 개설</strong></h2>
        <p id="vex-vp-description" className="vex-vp__description">
          <b>취미부터 프로게이머 도전까지</b>
          <span>당신의 목표에 맞춘 체계적인 코칭</span>
        </p>
        <div className="vex-vp__divider" aria-hidden="true" />
        <ul className="vex-vp__benefits">
          {benefits.map(([icon, label]) => <li key={label}><span aria-hidden="true">{icon}</span>{label}</li>)}
        </ul>
        <p className="vex-vp__recruit">입문자부터 개인 · 팀 단위까지 모집</p>
        <a className="vex-vp__apply" href={APPLY_URL} target="_blank" rel="noopener noreferrer" onClick={closePopup}>
          수강 상담 및 신청하기 <span aria-hidden="true">→</span><span className="vex-vp__sr"> (새 창)</span>
        </a>
        <a
          className="vex-vp__details"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="인스타그램에서 자세히 보기 (새 창)"
        >
          <svg className="vex-vp__instagram" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" focusable="false">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          <span className="vex-vp__details-divider" aria-hidden="true" />
          <span>자세히 보기</span>
          <svg className="vex-vp__external" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <path d="M6 18 18 6M6 6h12v12" />
          </svg>
        </a>
      </div>
      <footer className="vex-vp__footer">
        <label><input type="checkbox" checked={hideToday} onChange={(event) => setHideToday(event.target.checked)} />오늘 하루 보지 않기</label>
        <button type="button" onClick={closePopup}>닫기</button>
      </footer>
    </dialog>, document.body
  )
}
