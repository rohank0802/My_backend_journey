import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useSellerAuth } from '../auth/hook/useSellerAuth.js'

const DEFAULT_LOGO =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'><rect width='100' height='100' rx='24' fill='%234F46E5'/><path d='M32 38C32 38 40 24 50 24C60 24 68 38 68 38' stroke='white' stroke-width='6' stroke-linecap='round'/><path d='M26 38H74L70 76C70 78.2091 68.2091 80 66 80H34C31.7909 80 30 78.2091 30 76L26 38Z' fill='white' fill-opacity='0.15' stroke='white' stroke-width='6' stroke-linejoin='round'/><path d='M43 48C43 51.866 46.134 55 50 55C53.866 55 57 51.866 57 48' stroke='white' stroke-width='5' stroke-linecap='round'/></svg>"

const STATS = [
  { num: '10K+', label: 'Active Buyers' },
  { num: '50+',  label: 'Curated Brands' },
  { num: 'Zero', label: 'Compromise on Style' },
]

const SellerDashboard = () => {
  const user = useSelector((state) => state.auth.user)
  const { handleSellerLogout } = useSellerAuth()
  const navigate = useNavigate()

  // Mobile nav drawer state
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await handleSellerLogout()
    navigate('/seller/login')
  }

  return (
    /*
      RESPONSIVE STRATEGY
      ──────────────────────────────────────────────────────────────────
      Mobile / tablet (< lg) : min-h-screen, scrollable, stacked layout
      Desktop         (lg+)  : h-screen, locked viewport, centered card
    */
    <div
      className="min-h-screen lg:h-screen lg:overflow-hidden bg-slate-50 flex flex-col"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >

      {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
      <header className="shrink-0 bg-white border-b border-slate-100 h-14 px-4 sm:px-8 lg:px-10 flex items-center justify-between relative z-20">

        {/* Brand */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center p-1">
            <img
              src="/styleverse-logo.png"
              onError={(e) => { e.currentTarget.src = DEFAULT_LOGO }}
              alt="StyleVerse"
              className="w-full h-full object-contain"
            />
          </div>
          <span
            className="text-base font-semibold text-slate-900 tracking-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            StyleVerse
          </span>
          <span className="hidden sm:inline text-[9px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
            Seller
          </span>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-2">
          <Link
            to="/seller/create-product"
            className="flex items-center gap-1.5 h-8 px-4 bg-indigo-700 hover:bg-indigo-800
                       text-white text-xs font-medium rounded-lg transition-all duration-200
                       shadow-sm hover:shadow-md hover:shadow-indigo-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Create Product
          </Link>
          <Link
            to="/seller/products"
            className="flex items-center gap-1.5 h-8 px-4 border border-slate-200 text-slate-600
                       hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50
                       text-xs font-medium rounded-lg transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            View All Products
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 h-8 px-4 text-slate-400 hover:text-red-500
                       text-xs font-medium rounded-lg hover:bg-red-50 transition-all duration-200 ml-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </header>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden shrink-0 bg-white border-b border-slate-100 px-4 py-3 flex flex-col gap-2 z-10">
          <Link
            to="/seller/create-product"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 h-10 px-4 bg-indigo-700 text-white text-sm font-medium rounded-lg"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Create Product
          </Link>
          <Link
            to="/seller/products"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 h-10 px-4 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            View All Products
          </Link>
          <button
            onClick={() => { setMenuOpen(false); handleLogout() }}
            className="flex items-center gap-2 h-10 px-4 border border-red-100 text-red-500 text-sm font-medium rounded-lg hover:bg-red-50"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      )}

      {/* ── MAIN ───────────────────────────────────────────────────────── */}
      {/*
          Mobile/tablet : py-10 px-4, stacked, scrollable
          Desktop       : flex-1 flex items-center justify-center, no scroll
      */}
      <main className="flex-1 flex items-start lg:items-center justify-center
                       px-4 sm:px-8 lg:px-10 py-10 lg:py-0 min-h-0 overflow-y-auto lg:overflow-hidden">
        <div className="w-full max-w-3xl flex flex-col items-center gap-6 sm:gap-8">

          {/* ── LOGO + HEADING ──────────────────────────────────────── */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-slate-100
                              shadow-[0_4px_20px_rgba(79,70,229,0.12)]
                              flex items-center justify-center p-2">
                <img
                  src="/styleverse-logo.png"
                  onError={(e) => { e.currentTarget.src = DEFAULT_LOGO }}
                  alt="StyleVerse"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <h1
              className="text-2xl sm:text-3xl font-semibold text-slate-900 leading-tight mb-2"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Welcome{user?.fullName ? `, ${user.fullName}` : ' to StyleVerse'}
            </h1>

            <p className="text-slate-500 text-sm leading-relaxed max-w-sm sm:max-w-md mx-auto">
              Your storefront on the world's most curated fashion marketplace.
            </p>

            <div className="mt-4 flex justify-center">
              <div className="w-8 h-0.5 bg-indigo-700 rounded-full" />
            </div>
          </div>

          {/* ── BRAND QUOTE ─────────────────────────────────────────── */}
          <div className="text-center px-2 sm:px-4">
            <p
              className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              <span className="text-indigo-300 text-2xl font-bold leading-none align-middle mr-1">"</span>
              StyleVerse is where independent fashion meets a global audience.
              Every designer, boutique, and creative brand deserves the spotlight
              that only big labels once had — and here, they get it.
              <span className="text-indigo-300 text-2xl font-bold leading-none align-middle ml-1">"</span>
            </p>
          </div>

          {/* ── STAT PILLS ──────────────────────────────────────────── */}
          {/*
              Mobile  : single column (flex-col)
              sm+     : row (flex-row)
          */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
            {STATS.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white border border-slate-100
                           rounded-full px-5 py-2 shadow-sm w-full sm:w-auto justify-center"
              >
                <span className="text-indigo-700 font-bold text-sm">{s.num}</span>
                <span className="text-slate-500 text-xs">{s.label}</span>
              </div>
            ))}
          </div>

          {/* ── CTA BUTTONS ─────────────────────────────────────────── */}
          {/*
              Mobile  : full-width stacked buttons
              sm+     : side-by-side
          */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <Link
              to="/seller/create-product"
              className="flex items-center justify-center gap-2 h-10 px-6
                         w-full sm:w-auto
                         bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-medium
                         rounded-xl transition-all duration-200
                         shadow-md hover:shadow-lg hover:shadow-indigo-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Create Your First Product
            </Link>

            <Link
              to="/seller/products"
              className="flex items-center justify-center gap-2 h-10 px-6
                         w-full sm:w-auto
                         border border-slate-200 text-slate-700 hover:border-indigo-300
                         hover:text-indigo-700 hover:bg-indigo-50 text-sm font-medium
                         rounded-xl transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              View All Products
            </Link>
          </div>

        </div>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="shrink-0 bg-white border-t border-slate-100 h-10 px-4 sm:px-10 flex items-center justify-between">
        <p className="text-[10px] text-slate-400 uppercase tracking-widest">
          StyleVerse Seller Portal
        </p>
        <p className="hidden sm:block text-[10px] text-slate-400">
          Elevating fashion, one listing at a time ✦
        </p>
      </footer>

    </div>
  )
}

export default SellerDashboard
