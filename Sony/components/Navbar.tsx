'use client'

import { useEffect, useState } from 'react'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const links = ['Overview', 'Technology', 'Noise Cancelling', 'Specs', 'Buy']

    return (
        <nav
            className={`navbar-glass fixed top-0 left-0 right-0 z-50 ${scrolled ? 'scrolled' : ''}`}
            style={{ transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-[52px]">
                {/* Left: Logo */}
                <a href="#" className="flex items-center gap-2 group" aria-label="Sony WH-1000XM6">
                    <span
                        className="text-[15px] font-semibold tracking-[-0.02em]"
                        style={{ color: 'rgba(255,255,255,0.92)' }}
                    >
                        WH‑1000XM6
                    </span>
                    <span
                        className="text-[10px] font-medium tracking-[0.12em] uppercase"
                        style={{ color: 'rgba(255,255,255,0.35)' }}
                    >
                        SONY
                    </span>
                </a>

                {/* Center: Nav Links (desktop) */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase().replace(' ', '-')}`}
                            className="nav-link"
                        >
                            {link}
                        </a>
                    ))}
                </div>

                {/* Right: CTA */}
                <div className="flex items-center gap-4">
                    <button className="btn-sony hidden sm:flex" id="navbar-cta">
                        Experience WH‑1000XM6
                    </button>
                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden flex flex-col gap-[5px] p-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        id="mobile-menu-btn"
                    >
                        <span
                            className="block h-[1px] w-5 transition-all duration-300"
                            style={{
                                background: 'rgba(255,255,255,0.7)',
                                transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
                            }}
                        />
                        <span
                            className="block h-[1px] w-5 transition-all duration-300"
                            style={{
                                background: 'rgba(255,255,255,0.7)',
                                opacity: menuOpen ? 0 : 1,
                            }}
                        />
                        <span
                            className="block h-[1px] w-5 transition-all duration-300"
                            style={{
                                background: 'rgba(255,255,255,0.7)',
                                transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
                            }}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className="md:hidden overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                    maxHeight: menuOpen ? '300px' : '0',
                    background: 'rgba(5,5,5,0.95)',
                    borderTop: menuOpen ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
            >
                <div className="px-6 py-4 flex flex-col gap-4">
                    {links.map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase().replace(' ', '-')}`}
                            className="nav-link text-[14px] py-1"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link}
                        </a>
                    ))}
                    <button className="btn-sony mt-2 w-fit" id="mobile-cta">
                        Experience WH‑1000XM6
                    </button>
                </div>
            </div>
        </nav>
    )
}
