'use client'

import { useEffect, useRef } from 'react'

const specs = [
    { label: 'Driver Unit', value: '40mm', unit: 'Dome Type' },
    { label: 'Frequency Response', value: '4Hz–40kHz', unit: 'Wide Range' },
    { label: 'Battery Life', value: '30hrs', unit: 'ANC On' },
    { label: 'Charging Time', value: '3hrs', unit: 'Full Charge' },
    { label: 'Quick Charge', value: '3hrs', unit: '10min charge' },
    { label: 'Weight', value: '250g', unit: 'Lightweight' },
    { label: 'Connectivity', value: 'BT 5.3', unit: 'Multipoint' },
    { label: 'Codec Support', value: 'LDAC', unit: 'Hi-Res Audio' },
]

const features = [
    {
        icon: '◎',
        title: 'Industry-Leading ANC',
        description: 'Eight microphones working in concert. Real-time processing that adapts to every environment.',
    },
    {
        icon: '◈',
        title: 'Speak-to-Chat',
        description: "Start talking and music automatically pauses. Resume naturally when you're done.",
    },
    {
        icon: '◉',
        title: 'Multipoint Connection',
        description: 'Connect to two devices simultaneously. Seamlessly switch between phone and laptop.',
    },
    {
        icon: '◊',
        title: 'Spatial Audio',
        description: '360 Reality Audio certified. A concert hall in your ears, wherever you are.',
    },
]

export default function SpecsSection() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.fade-in-up').forEach((el, i) => {
                            setTimeout(() => el.classList.add('visible'), i * 60)
                        })
                    }
                })
            },
            { threshold: 0.15 }
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div ref={sectionRef} id="specs">
            {/* Feature Cards */}
            <section className="section-dark py-24 md:py-36" id="technology">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
                    {/* Header */}
                    <div className="text-center mb-20 fade-in-up">
                        <div
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                marginBottom: '20px',
                                padding: '5px 14px',
                                borderRadius: '100px',
                                background: 'rgba(0, 80, 255, 0.10)',
                                border: '1px solid rgba(0, 80, 255, 0.22)',
                            }}
                        >
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
                                Technology
                            </span>
                        </div>
                        <h2
                            className="text-gradient-sony"
                            style={{
                                fontSize: 'clamp(36px, 5vw, 64px)',
                                fontWeight: 700,
                                letterSpacing: '-0.04em',
                                lineHeight: 1.05,
                                marginBottom: '16px',
                            }}
                        >
                            Built different.
                            <br />
                            In every way.
                        </h2>
                        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
                            Each feature in the WH‑1000XM6 is engineered with obsessive precision to deliver an experience that transcends listening.
                        </p>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {features.map((feat, i) => (
                            <div key={i} className="spec-card fade-in-up group">
                                <div
                                    style={{
                                        fontSize: '24px',
                                        marginBottom: '20px',
                                        background: 'linear-gradient(135deg, #0050FF, #00D6FF)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        transition: 'transform 0.3s ease',
                                    }}
                                    className="group-hover:scale-110 inline-block"
                                >
                                    {feat.icon}
                                </div>
                                <h3
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        letterSpacing: '-0.02em',
                                        color: 'rgba(255,255,255,0.88)',
                                        marginBottom: '10px',
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {feat.title}
                                </h3>
                                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.65 }}>
                                    {feat.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Specs Grid */}
            <section className="section-dark-alt py-24 md:py-32" id="noise-cancelling">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                        {/* Left copy */}
                        <div className="flex-1 fade-in-up">
                            <div
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    marginBottom: '20px',
                                    padding: '5px 14px',
                                    borderRadius: '100px',
                                    background: 'rgba(0, 214, 255, 0.08)',
                                    border: '1px solid rgba(0, 214, 255, 0.18)',
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        color: '#00D6FF',
                                    }}
                                >
                                    Specifications
                                </span>
                            </div>
                            <h2
                                style={{
                                    fontSize: 'clamp(32px, 4vw, 52px)',
                                    fontWeight: 700,
                                    letterSpacing: '-0.04em',
                                    lineHeight: 1.05,
                                    marginBottom: '20px',
                                    background: 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.60) 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Every detail,
                                <br />
                                obsessed over.
                            </h2>
                            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: '360px' }}>
                                Years of acoustic research, distilled into a single pair of headphones. The numbers tell only part of the story.
                            </p>

                            <div className="flex items-center gap-8 mt-10 flex-wrap">
                                <div>
                                    <div className="text-gradient-blue" style={{ fontSize: '42px', fontWeight: 700, letterSpacing: '-0.04em' }}>
                                        30
                                    </div>
                                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>
                                        Hours Battery
                                    </div>
                                </div>
                                <div className="metric-divider" />
                                <div>
                                    <div className="text-gradient-blue" style={{ fontSize: '42px', fontWeight: 700, letterSpacing: '-0.04em' }}>
                                        8
                                    </div>
                                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>
                                        Microphones
                                    </div>
                                </div>
                                <div className="metric-divider" />
                                <div>
                                    <div className="text-gradient-blue" style={{ fontSize: '42px', fontWeight: 700, letterSpacing: '-0.04em' }}>
                                        #1
                                    </div>
                                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>
                                        In ANC
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Specs table */}
                        <div className="flex-1 w-full fade-in-up">
                            <div
                                style={{
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    background: 'rgba(255,255,255,0.02)',
                                }}
                            >
                                {specs.map((spec, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '16px 24px',
                                            borderBottom: i < specs.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                            transition: 'background 0.2s ease',
                                        }}
                                        className="hover:bg-white/[0.02]"
                                    >
                                        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.40)', fontWeight: 400 }}>
                                            {spec.label}
                                        </span>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.01em' }}>
                                                {spec.value}
                                            </span>
                                            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)', marginLeft: '8px' }}>
                                                {spec.unit}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button className="btn-sony flex-1 justify-center" style={{ fontSize: '14px' }} id="buy-btn">
                                    Buy Now
                                </button>
                                <button className="btn-sony-outline flex-1 justify-center" style={{ fontSize: '14px' }} id="specs-btn">
                                    Full Specs
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                id="buy"
                style={{
                    background: '#050505',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    padding: '60px 24px 40px',
                }}
            >
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '40px',
                    }}
                >
                    <div className="flex flex-col md:flex-row justify-between gap-10">
                        <div>
                            <div style={{ fontSize: '18px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                                WH‑1000XM6
                            </div>
                            <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '16px' }}>
                                SONY
                            </div>
                            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.30)', lineHeight: 1.65, maxWidth: '280px' }}>
                                The pinnacle of Sony&apos;s noise cancelling technology. Crafted for those who demand the best.
                            </p>
                        </div>

                        <div className="flex gap-12 md:gap-16 flex-wrap">
                            {[
                                { title: 'Product', links: ['Overview', 'Technology', 'Noise Cancelling', 'Specs'] },
                                { title: 'Sony', links: ['About Sony', 'Headphones', 'Support', 'Dealers'] },
                                { title: 'Legal', links: ['Privacy Policy', 'Terms of Use', 'Cookie Settings'] },
                            ].map((col) => (
                                <div key={col.title}>
                                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                                        {col.title}
                                    </div>
                                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {col.links.map((link) => (
                                            <li key={link}>
                                                <a
                                                    href="#"
                                                    style={{ fontSize: '13px', color: 'rgba(255,255,255,0.38)', textDecoration: 'none', transition: 'color 0.2s' }}
                                                    onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.75)')}
                                                    onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.38)')}
                                                >
                                                    {link}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        style={{
                            paddingTop: '24px',
                            borderTop: '1px solid rgba(255,255,255,0.05)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '12px',
                        }}
                    >
                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.22)' }}>
                            © 2025 Sony Group Corporation. All rights reserved.
                        </p>
                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.18)' }}>
                            WH‑1000XM6 · Flagship Noise Cancelling
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
