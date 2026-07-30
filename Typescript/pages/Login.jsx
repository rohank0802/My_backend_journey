import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// import { useAuth } from '../hook/useAuth.js'

const Login = () => {

    // ── Single combined form state object ─────────────────────────────────────
    // identifier = email OR phone number
    const [formData, setFormData] = useState({
        identifier: '',
        password  : '',
    })
    // const {handleUserLogin}=useAuth()

  // ── UI-only states ─────────────────────────────────────────────────────────
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState('')
  const [success, setSuccess]           = useState('')

  const navigate = useNavigate()

  // ── Generic change handler — one handler for all inputs ───────────────────
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // ── Handle Form Submit ─────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.identifier || !formData.password) {
      setError('Email / Contact and Password are required.')
      return
    }

    setLoading(true)
    setError('')

    try {
      // If identifier contains '@' it's an email, otherwise it's a contact number
      const isEmail = formData.identifier.includes('@')
      const loginPayload = isEmail
        ? { email: formData.identifier, password: formData.password }
        : { contact: formData.identifier, password: formData.password }

      // await handleUserLogin(loginPayload)
      // console.log(loginPayload)
      setSuccess('Login successful! Redirecting...')
      setTimeout(() => navigate('/'), 1200)

    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    // h-screen + overflow-hidden = exactly one viewport, no scroll
    <div className="h-screen overflow-hidden flex">

      {/* ── LEFT PANEL ── Indigo gradient ───────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900
                      flex-col items-center justify-center px-12 relative overflow-hidden">

        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white opacity-5 rounded-full" />
        <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-indigo-400 opacity-10 rounded-full" />

        <div className="relative z-10 text-center">
          {/* Logo */}
          <div className="mb-5 flex justify-center">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg p-1">
              <img src="/styleverse-logo.png" alt="StyleVerse logo" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Brand */}
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
            StyleVerse
          </h1>
          <p className="text-indigo-200 text-lg font-medium mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Welcome Back
          </p>

          <div className="w-12 h-px bg-indigo-400 mx-auto mb-4" />

          <p className="text-indigo-200 text-sm leading-relaxed max-w-xs mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Sign back in to access your curated wardrobe, saved styles, and exclusive offers.
          </p>

          {/* Feature bullets */}
          <div className="mt-8 space-y-3 text-left">
            {[
              { icon: '✦', text: 'Your wishlist awaits'   },
              { icon: '✦', text: 'Track your orders'      },
              { icon: '✦', text: 'Exclusive member deals' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="text-indigo-300 text-xs">{item.icon}</span>
                <span className="text-indigo-100 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── White form (h-full fills the screen height) ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 bg-white h-full">
        <div className="w-full max-w-md">

          {/* Mobile-only logo (left panel hidden on small screens) */}
          <div className="lg:hidden text-center mb-6">
            <div className="flex justify-center mb-2">
              <img src="/styleverse-logo.png" alt="StyleVerse" className="w-12 h-12 object-contain" />
            </div>
            <h2 className="text-2xl font-bold text-indigo-800" style={{ fontFamily: 'Playfair Display, serif' }}>
              StyleVerse
            </h2>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              Sign In
            </h2>
            <p className="text-slate-500 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* Error / Success alerts */}
          {error && (
            <div className="mb-4 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-green-700 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
              {success}
            </div>
          )}

          {/* ── Login Form ─────────────────────────────────────────────── */}
          {/*
            Each input has `name` matching a key in formData.
            handleChange reads e.target.name and updates only that key.
          */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email or Contact */}
            <div>
              <label htmlFor="identifier" className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                Email or Contact
              </label>
              <input
                id="identifier" name="identifier" type="text"
                placeholder="Enter your email or phone number"
                value={formData.identifier}
                onChange={handleChange}
                className="w-full h-11 px-4 border border-slate-200 rounded-lg text-slate-800 text-sm placeholder-slate-400
                           focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password" name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-11 px-4 pr-16 border border-slate-200 rounded-lg text-slate-800 text-sm placeholder-slate-400
                             focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                {/* Show / Hide toggle — only changes showPassword state */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors text-xs font-medium"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-lg
                         transition-all duration-200 text-sm tracking-wide
                         disabled:opacity-60 disabled:cursor-not-allowed
                         shadow-md hover:shadow-indigo-200 hover:shadow-lg"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {loading ? 'Signing In...' : 'Login'}
            </button>
          </form>

          {/* Don't have an account */}
          <p className="mt-6 text-center text-sm text-slate-500" style={{ fontFamily: 'Inter, sans-serif' }}>
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-700 font-semibold hover:text-indigo-900 hover:underline transition-colors">
              Register
            </Link>
          </p>

          {/* ── Login as Seller — bottom quick-link ───────────────────── */}
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-xs text-slate-400 uppercase tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>or</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>
            <Link
              to="/login"
              state={{ role: 'seller' }}
              className="w-full h-10 flex items-center justify-center gap-2
                         border-2 border-slate-200 text-slate-600 font-semibold text-sm rounded-lg
                         hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-700 transition-all duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5l9 9-7 7-9-9V3z" />
              </svg>
              Login as Seller
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
