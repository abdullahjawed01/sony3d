'use client'

import { useEffect, useRef, useState } from 'react'

const TOTAL_FRAMES = 240
const FRAME_PATH = (i: number) =>
    `/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`

// Lerp factor: higher = snappier, lower = more laggy/smooth (0.06–0.12 is ideal)
const LERP_FACTOR = 0.09

// Story beats: [scrollStart, scrollEnd, content]
const storyBeats = [
    {
        id: 'hero',
        scrollStart: 0,
        scrollEnd: 0.15,
        align: 'center',
        headline: 'Sony WH‑1000XM6',
        subheadline: 'Silence, perfected.',
        body: 'Flagship wireless noise cancelling,\nre‑engineered for a world that never stops.',
        tag: null,
    },
    {
        id: 'engineering',
        scrollStart: 0.15,
        scrollEnd: 0.42,
        align: 'left',
        headline: 'Precision-engineered\nfor silence.',
        subheadline: null,
        body: 'Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity. Every component is tuned for balance, power, and comfort—hour after hour.',
        tag: 'Engineering',
    },
    {
        id: 'noise',
        scrollStart: 0.4,
        scrollEnd: 0.67,
        align: 'right',
        headline: 'Adaptive noise\ncancelling, redefined.',
        subheadline: null,
        body: null,
        tag: 'Noise Cancelling',
        bullets: [
            'Multi-microphone array listens in every direction.',
            'Real-time noise analysis adapts to your environment.',
            'Your music stays pure — planes, trains, and crowds fade away.',
        ],
    },
    {
        id: 'sound',
        scrollStart: 0.65,
        scrollEnd: 0.87,
        align: 'left',
        headline: 'Immersive,\nlifelike sound.',
        subheadline: null,
        body: 'High-performance drivers unlock detail, depth, and texture in every track. AI-enhanced upscaling restores clarity to compressed audio, so every note feels alive.',
        tag: 'Audio',
    },
    {
        id: 'cta',
        scrollStart: 0.85,
        scrollEnd: 1.0,
        align: 'center',
        headline: 'Hear everything.\nFeel nothing else.',
        subheadline: 'WH‑1000XM6. Designed for focus, crafted for comfort.',
        body: 'Engineered for airports, offices, and everything in between.',
        tag: null,
        cta: true,
    },
]

export default function ScrollCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const framesRef = useRef<HTMLImageElement[]>([])
    const loadedCountRef = useRef(0)
    // Smooth lerp refs — target is where scroll says we should be, current is what's displayed
    const targetFrameRef = useRef(0)
    const smoothFrameRef = useRef(0)
    const currentFrameRef = useRef(0)
    const animLoopRef = useRef<number>(0)
    const allLoadedRef = useRef(false)
    const [scrollProgress, setScrollProgress] = useState(0)
    const scrollProgressRef = useRef(0)
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [allLoaded, setAllLoaded] = useState(false)

    // Preload all frames
    useEffect(() => {
        const images: HTMLImageElement[] = []
        let loaded = 0

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new window.Image()
            img.src = FRAME_PATH(i)
            img.onload = () => {
                loaded++
                loadedCountRef.current = loaded
                setLoadingProgress(Math.round((loaded / TOTAL_FRAMES) * 100))
                if (loaded === TOTAL_FRAMES) {
                    allLoadedRef.current = true
                    setAllLoaded(true)
                    renderFrame(0)
                }
            }
            img.onerror = () => {
                loaded++
                loadedCountRef.current = loaded
                if (loaded === TOTAL_FRAMES) {
                    allLoadedRef.current = true
                    setAllLoaded(true)
                }
            }
            images.push(img)
        }
        framesRef.current = images
    }, [])

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        const img = framesRef.current[index]
        if (!img || !img.complete) return

        const W = canvas.width
        const H = canvas.height
        const imgW = img.naturalWidth || img.width
        const imgH = img.naturalHeight || img.height
        if (!imgW || !imgH) return

        ctx.fillStyle = '#050505'
        ctx.fillRect(0, 0, W, H)

        const scale = Math.max(W / imgW, H / imgH)
        const drawW = imgW * scale
        const drawH = imgH * scale
        const drawX = (W - drawW) / 2
        const drawY = (H - drawH) / 2

        ctx.drawImage(img, drawX, drawY, drawW, drawH)
    }

    // Handle canvas resize
    const resizeCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        canvas.width = window.innerWidth * window.devicePixelRatio
        canvas.height = window.innerHeight * window.devicePixelRatio
        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${window.innerHeight}px`
        renderFrame(currentFrameRef.current)
    }

    useEffect(() => {
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)
        return () => window.removeEventListener('resize', resizeCanvas)
    }, [])

    // Continuous lerp animation loop — runs independently of scroll events
    useEffect(() => {
        let lastTime = 0

        const loop = (time: number) => {
            animLoopRef.current = requestAnimationFrame(loop)

            if (!allLoadedRef.current) return

            const dt = Math.min((time - lastTime) / 16.67, 3) // capped delta, normalised to ~60fps
            lastTime = time

            // Lerp smooth frame toward target
            const lerpFactor = 1 - Math.pow(1 - LERP_FACTOR, dt)
            smoothFrameRef.current += (targetFrameRef.current - smoothFrameRef.current) * lerpFactor

            const displayFrame = Math.round(smoothFrameRef.current)
            const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, displayFrame))

            if (clamped !== currentFrameRef.current) {
                currentFrameRef.current = clamped
                renderFrame(clamped)
            }

            // Sync scroll progress state (throttled by frame rate naturally)
            setScrollProgress(scrollProgressRef.current)
        }

        animLoopRef.current = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(animLoopRef.current)
    }, [])

    // Scroll tracking — only updates target, never renders directly
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const onScroll = () => {
            const rect = container.getBoundingClientRect()
            const scrollableHeight = container.offsetHeight - window.innerHeight
            const scrolled = -rect.top
            const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight))

            scrollProgressRef.current = progress

            // Only set target frame — the lerp loop handles actual rendering
            const targetFrame = progress * (TOTAL_FRAMES - 1)
            targetFrameRef.current = Math.max(0, Math.min(TOTAL_FRAMES - 1, targetFrame))
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Get opacity for a story beat
    const getBeatOpacity = (beat: typeof storyBeats[0]) => {
        const { scrollStart, scrollEnd } = beat
        const fadeIn = 0.07
        const fadeOut = 0.07

        if (scrollProgress < scrollStart - fadeIn) return 0
        if (scrollProgress < scrollStart) {
            return (scrollProgress - (scrollStart - fadeIn)) / fadeIn
        }
        if (scrollProgress <= scrollEnd - fadeOut) return 1
        if (scrollProgress <= scrollEnd) {
            return 1 - (scrollProgress - (scrollEnd - fadeOut)) / fadeOut
        }
        return 0
    }

    // Larger travel values for more dramatic entrances
    const getBeatTranslateY = (beat: typeof storyBeats[0]) => {
        const op = getBeatOpacity(beat)
        return `${(1 - op) * 48}px`
    }

    const getBeatTranslateX = (beat: typeof storyBeats[0]) => {
        const op = getBeatOpacity(beat)
        if (beat.align === 'left') return `${(op - 1) * -60}px`
        if (beat.align === 'right') return `${(op - 1) * 60}px`
        return '0px'
    }

    return (
        <div
            ref={containerRef}
            id="overview"
            style={{ height: `${400}vh`, position: 'relative' }}
        >
            {/* Loading Screen */}
            {!allLoaded && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: '#050505',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        gap: '24px',
                    }}
                >
                    <div
                        style={{
                            width: '200px',
                            height: '1px',
                            background: 'rgba(255,255,255,0.08)',
                            borderRadius: '1px',
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                height: '100%',
                                background: 'linear-gradient(90deg, #0050FF, #00D6FF)',
                                width: `${loadingProgress}%`,
                                transition: 'width 0.3s ease',
                            }}
                        />
                    </div>
                    <p
                        style={{
                            fontSize: '12px',
                            color: 'rgba(255,255,255,0.3)',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            fontWeight: 500,
                        }}
                    >
                        Loading Experience
                    </p>
                </div>
            )}

            {/* Sticky Canvas + Overlays */}
            <div
                className="canvas-sticky"
                style={{ opacity: allLoaded ? 1 : 0, transition: 'opacity 0.8s ease' }}
            >
                {/* Ambient hero glow */}
                <div className="hero-glow" />

                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        display: 'block',
                    }}
                />

                {/* Story Beat Overlays */}
                {storyBeats.map((beat) => {
                    const opacity = getBeatOpacity(beat)
                    if (opacity <= 0.001) return null

                    return (
                        <div
                            key={beat.id}
                            className="story-panel"
                            style={{ opacity, pointerEvents: opacity > 0.5 ? 'auto' : 'none' }}
                        >
                            <div
                                className="w-full h-full flex items-center"
                                style={{
                                    justifyContent:
                                        beat.align === 'left'
                                            ? 'flex-start'
                                            : beat.align === 'right'
                                                ? 'flex-end'
                                                : 'center',
                                    padding:
                                        beat.align === 'center'
                                            ? '0 24px'
                                            : beat.align === 'left'
                                                ? '0 0 0 6vw'
                                                : '0 6vw 0 0',
                                }}
                            >
                                <div
                                    className="story-panel-inner"
                                    style={{
                                        maxWidth: beat.align === 'center' ? '700px' : '420px',
                                        width: '100%',
                                        textAlign: beat.align === 'center' ? 'center' : 'left',
                                        transform: `translateY(${getBeatTranslateY(beat)}) translateX(${getBeatTranslateX(beat)})`,
                                    }}
                                >
                                    {/* Tag */}
                                    {beat.tag && (
                                        <div
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                marginBottom: '20px',
                                                padding: '5px 12px',
                                                borderRadius: '100px',
                                                background: 'rgba(0, 80, 255, 0.12)',
                                                border: '1px solid rgba(0, 80, 255, 0.25)',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: '4px',
                                                    height: '4px',
                                                    borderRadius: '50%',
                                                    background: '#00D6FF',
                                                }}
                                            />
                                            <span
                                                style={{
                                                    fontSize: '11px',
                                                    fontWeight: 600,
                                                    letterSpacing: '0.1em',
                                                    textTransform: 'uppercase',
                                                    background: 'linear-gradient(90deg, #0050FF, #00D6FF)',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                }}
                                            >
                                                {beat.tag}
                                            </span>
                                        </div>
                                    )}

                                    {/* Headline */}
                                    <h2
                                        style={{
                                            fontSize: beat.id === 'hero' ? 'clamp(42px, 7vw, 88px)' : 'clamp(32px, 4.5vw, 60px)',
                                            fontWeight: beat.id === 'hero' ? 700 : 700,
                                            letterSpacing: '-0.04em',
                                            lineHeight: 1.0,
                                            marginBottom: '20px',
                                            whiteSpace: 'pre-line',
                                            background:
                                                beat.id === 'hero'
                                                    ? 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 60%, rgba(0,214,255,0.9) 100%)'
                                                    : 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.70) 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                        }}
                                    >
                                        {beat.headline}
                                    </h2>

                                    {/* Subheadline */}
                                    {beat.subheadline && (
                                        <p
                                            style={{
                                                fontSize: beat.id === 'hero' ? 'clamp(20px, 2.5vw, 30px)' : '18px',
                                                fontWeight: 300,
                                                letterSpacing: beat.id === 'hero' ? '-0.01em' : '0',
                                                color: 'rgba(255,255,255,0.65)',
                                                marginBottom: '16px',
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            {beat.subheadline}
                                        </p>
                                    )}

                                    {/* Body */}
                                    {beat.body && (
                                        <p
                                            style={{
                                                fontSize: '15px',
                                                lineHeight: 1.65,
                                                color: 'rgba(255,255,255,0.50)',
                                                maxWidth: beat.align === 'center' ? '520px' : '380px',
                                                margin: beat.align === 'center' ? '0 auto' : '0',
                                                whiteSpace: 'pre-line',
                                                marginTop: beat.subheadline ? '8px' : '0',
                                            }}
                                        >
                                            {beat.body}
                                        </p>
                                    )}

                                    {/* Bullets */}
                                    {'bullets' in beat && beat.bullets && (
                                        <ul
                                            style={{
                                                listStyle: 'none',
                                                padding: 0,
                                                margin: 0,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '12px',
                                                marginTop: '4px',
                                            }}
                                        >
                                            {beat.bullets.map((bullet: string, bi: number) => (
                                                <li
                                                    key={bi}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        gap: '10px',
                                                        fontSize: '14px',
                                                        color: 'rgba(255,255,255,0.55)',
                                                        lineHeight: 1.55,
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            marginTop: '6px',
                                                            flexShrink: 0,
                                                            width: '4px',
                                                            height: '4px',
                                                            borderRadius: '50%',
                                                            background: 'linear-gradient(135deg, #0050FF, #00D6FF)',
                                                            display: 'block',
                                                        }}
                                                    />
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* CTA Buttons */}
                                    {beat.cta && (
                                        <div
                                            style={{
                                                display: 'flex',
                                                gap: '16px',
                                                marginTop: '36px',
                                                justifyContent: 'center',
                                                flexWrap: 'wrap',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <button className="btn-sony" id="cta-primary" style={{ fontSize: '15px', padding: '12px 30px' }}>
                                                Experience WH‑1000XM6
                                            </button>
                                            <button className="btn-sony-outline" id="cta-secondary">
                                                See full specs
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}

                {/* Scroll progress indicator */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '32px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        opacity: scrollProgress < 0.05 ? 1 : 0,
                        transition: 'opacity 0.5s ease',
                        pointerEvents: 'none',
                        zIndex: 20,
                    }}
                >
                    <span
                        style={{
                            fontSize: '10px',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.3)',
                            fontWeight: 500,
                        }}
                    >
                        Scroll to explore
                    </span>
                    <div
                        style={{
                            width: '1px',
                            height: '40px',
                            background: 'linear-gradient(180deg, rgba(0,214,255,0.5), transparent)',
                            animation: 'pulse 2s ease-in-out infinite',
                        }}
                    />
                </div>

                {/* Frame counter (dev only — remove for prod) */}
                {/* <div style={{ position: 'absolute', bottom: 8, right: 12, fontSize: 10, color: 'rgba(255,255,255,0.15)', zIndex: 20 }}>
          Frame {currentFrameRef.current + 1}/{TOTAL_FRAMES}
        </div> */}
            </div>
        </div>
    )
}
