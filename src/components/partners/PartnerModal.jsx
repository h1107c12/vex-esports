import { useEffect } from "react"
import "./PartnerModal.css"

function PartnerModal({ partner, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  useEffect(() => {
    if (!partner) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [partner])

  if (!partner) return null

  const detailItems =
    partner.details && partner.details.length > 0
      ? partner.details
      : [
          {
            image: partner.detailImage,
            text: partner.description,
          },
        ]

  const isDouble = detailItems.length >= 2
  const isCenter = partner.layout === "center"
  const isVisualOnly = partner.layout === "visualOnly"
  const hideTopLogo = !!partner.hideTopLogo
  const useHeroLink = !!(partner.heroLink && partner.website)

  const handleLogoClick = () => {
    if (!partner.website) return
    window.open(partner.website, "_blank", "noopener,noreferrer")
  }

  const renderCenterHero = () => {
    const image = (
      <img
        src={detailItems[0].image}
        alt={partner.name}
        className="partner-modal__center-image"
        style={{
          maxWidth: partner.centerImageWidth
            ? `${partner.centerImageWidth}px`
            : undefined,
          maxHeight: partner.centerImageHeight
            ? `${partner.centerImageHeight}px`
            : undefined,
        }}
      />
    )

    if (!useHeroLink) return image

    return (
      <button
        type="button"
        className="partner-modal__hero-link"
        onClick={handleLogoClick}
        aria-label={`${partner.name} 홈페이지 이동`}
      >
        {image}
      </button>
    )
  }

  const renderVisualOnlyHero = () => {
    const image = (
      <img
        src={detailItems[0].image}
        alt={partner.name}
        className="partner-modal__visual-only-image"
        style={{
          maxWidth: partner.centerImageWidth
            ? `${partner.centerImageWidth}px`
            : undefined,
          maxHeight: partner.centerImageHeight
            ? `${partner.centerImageHeight}px`
            : undefined,
        }}
      />
    )

    if (!useHeroLink) return image

    return (
      <button
        type="button"
        className="partner-modal__hero-link"
        onClick={handleLogoClick}
        aria-label={`${partner.name} 홈페이지 이동`}
      >
        {image}
      </button>
    )
  }

  return (
    <div className="partner-modal" onClick={onClose}>
      <div
        className={`partner-modal__content ${
          isDouble
            ? "partner-modal__content--double"
            : "partner-modal__content--single"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="partner-modal__close"
          type="button"
          onClick={onClose}
          aria-label="팝업 닫기"
        >
          ×
        </button>

        {!hideTopLogo && (
          <div className="partner-modal__top">
            {partner.website ? (
              <button
                type="button"
                className="partner-modal__logo-link"
                onClick={handleLogoClick}
                aria-label={`${partner.name} 홈페이지 이동`}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="partner-modal__logo"
                  style={{
                    width: partner.logoWidth
                      ? `${partner.logoWidth}px`
                      : undefined,
                    height: partner.logoHeight
                      ? `${partner.logoHeight}px`
                      : undefined,
                  }}
                />
              </button>
            ) : (
              <img
                src={partner.logo}
                alt={partner.name}
                className="partner-modal__logo"
                style={{
                  width: partner.logoWidth
                    ? `${partner.logoWidth}px`
                    : undefined,
                  height: partner.logoHeight
                    ? `${partner.logoHeight}px`
                    : undefined,
                }}
              />
            )}
          </div>
        )}

        {isVisualOnly ? (
          <div className="partner-modal__visual-only">
            <div className="partner-modal__visual-only-inner">
              {renderVisualOnlyHero()}
            </div>
          </div>
        ) : isCenter ? (
          <div className="partner-modal__center">
            <div className="partner-modal__center-visual">
              {renderCenterHero()}
            </div>

            <div className="partner-modal__center-text">
              {detailItems[0].text?.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        ) : (
          <div
            className={`partner-modal__body ${
              isDouble
                ? "partner-modal__body--double"
                : "partner-modal__body--single"
            }`}
          >
            {detailItems.map((item, index) => (
              <div className="partner-modal__card" key={index}>
                <div className="partner-modal__image-wrap">
                  <img
                    src={item.image}
                    alt={`${partner.name} 상세 이미지 ${index + 1}`}
                    className="partner-modal__image"
                  />
                </div>

                <div className="partner-modal__text">
                  {item.text?.split("\n").map((line, lineIndex) => (
                    <p key={lineIndex}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PartnerModal