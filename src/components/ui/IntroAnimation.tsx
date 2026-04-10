'use client'

import { useEffect, useRef } from 'react'
import { SanityImage } from '@/components/ui/SanityImage'

type IntroAnimationProps = {
  logo?: {
    asset: any
    alt: string
    hotspot?: { x: number; y: number }
    crop?: { top: number; bottom: number; left: number; right: number }
  }
  logoText?: string
  siteName?: string
}

export default function IntroAnimation({ logo, logoText, siteName }: IntroAnimationProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const movingLogo = logoRef.current
    if (!overlay || !movingLogo) return

    function cubicInOut(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }
    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t
    }

    // Phase 1: logo fade in
    requestAnimationFrame(() => {
      movingLogo.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      movingLogo.style.opacity = '1'
      movingLogo.style.transform = 'translate(-50%, -50%) scale(1)'
    })

    // Phase 2: logo navbara gider, overlay solar
    const t = setTimeout(() => {
      const navTarget = document.getElementById('nav-logo-target')
      if (!navTarget || !overlay || !movingLogo) return

      // Lokal non-null referanslar — step closure'u içinde TS happy
      const safeOverlay = overlay
      const safeLogo = movingLogo

      const sceneRect = safeOverlay.getBoundingClientRect()
      const moveRect = safeLogo.getBoundingClientRect()
      const navRect = navTarget.getBoundingClientRect()

      const srcX = moveRect.left - sceneRect.left + moveRect.width / 2
      const srcY = moveRect.top - sceneRect.top + moveRect.height / 2
      const tgtX = navRect.left - sceneRect.left + navRect.width / 2
      const tgtY = navRect.top - sceneRect.top + navRect.height / 2

      safeLogo.style.transition = 'none'
      safeLogo.style.left = srcX + 'px'
      safeLogo.style.top = srcY + 'px'
      safeLogo.style.transform = 'translate(-50%, -50%) scale(1)'

      const duration = 850
      let start: number | null = null

      function step(ts: number) {
        if (!start) start = ts
        const raw = Math.min((ts - start) / duration, 1)
        const eased = cubicInOut(raw)

        safeLogo.style.left = lerp(srcX, tgtX, eased) + 'px'
        safeLogo.style.top = lerp(srcY, tgtY, eased) + 'px'
        safeLogo.style.transform = `translate(-50%, -50%) scale(${lerp(1, 0.72, eased)})`

        const overlayT = Math.max(0, (raw - 0.15) / 0.85)
        safeOverlay.style.opacity = String(1 - cubicInOut(Math.min(overlayT, 1)))

        if (raw < 1) {
          requestAnimationFrame(step)
        } else {
          // Bitti: overlay ve moving logo kaldır, gerçek nav logo göster
          safeOverlay.style.display = 'none'
          safeLogo.style.display = 'none'
          const navLogo = document.getElementById('nav-logo-target')
          if (navLogo) {
            navLogo.style.transition = 'opacity 0.2s ease'
            navLogo.style.opacity = '1'
          }
        }
      }

      requestAnimationFrame(step)
    }, 1500)

    return () => clearTimeout(t)
  }, [])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0d0d0d',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <div
        ref={logoRef}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) scale(0.92)',
          opacity: 0,
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {logo ? (
          <>
            {/* Logo görseli - navbar'dakiyle aynı boyut oranı */}
            <div style={{ height: '48px', width: 'auto' }}>
              <SanityImage
                image={{ ...logo, crop: undefined, hotspot: undefined }}
                width={600}
                height={800}
                fit="max"
                className="h-full w-auto object-contain"
                priority
              />
            </div>
            {logoText && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  borderLeft: '1px solid rgba(255,255,255,0.2)',
                  paddingLeft: '16px',
                  height: '48px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '20px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    color: '#fff',
                  }}
                >
                  {logoText}
                </span>
              </div>
            )}
          </>
        ) : (
          <span
            style={{
              fontSize: '20px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: '#fff',
              textTransform: 'uppercase',
            }}
          >
            {siteName || 'NUARK'}
          </span>
        )}
      </div>
    </div>
  )
}
