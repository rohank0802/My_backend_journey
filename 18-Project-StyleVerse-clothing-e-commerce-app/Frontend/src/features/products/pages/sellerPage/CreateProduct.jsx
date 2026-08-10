import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useSellerProduct } from '../../hook/useSellerProduct.js'

const MAX_IMAGES = 7

const CreateProduct = () => {
  const { handleCreateProduct } = useSellerProduct()
  const loading   = useSelector((state) => state.product.loading)
  const reduxError = useSelector((state) => state.product.error)
  const user       = useSelector((state) => state.auth.user)
  const navigate   = useNavigate()

  const [formData, setFormData] = useState({ title: '', description: '', price: '' })
  const [images,   setImages]   = useState([])
  const [previews, setPreviews] = useState([])
  const [formError, setFormError] = useState('')
  const [success,  setSuccess]  = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const files     = Array.from(e.target.files)
    const slotsLeft = MAX_IMAGES - images.length
    if (slotsLeft <= 0) { setFormError(`Maximum ${MAX_IMAGES} images allowed.`); return }
    const allowed     = files.slice(0, slotsLeft)
    const newPreviews = allowed.map((f) => URL.createObjectURL(f))
    setImages((p)   => [...p, ...allowed])
    setPreviews((p) => [...p, ...newPreviews])
    setFormError('')
    e.target.value = ''
  }

  const handleRemoveImage = (index) => {
    URL.revokeObjectURL(previews[index])
    setImages((p)   => p.filter((_, i) => i !== index))
    setPreviews((p) => p.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim())        return setFormError('Product title is required.')
    if (formData.title.trim().length < 3) return setFormError('Title must be at least 3 characters.')
    if (!formData.description.trim())  return setFormError('Description is required.')
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0)
      return setFormError('Enter a valid price greater than 0.')
    if (images.length === 0)           return setFormError('Add at least one product image.')
    setFormError('')
    const data = new FormData()
    data.append('title',       formData.title.trim())
    data.append('description', formData.description.trim())
    data.append('price',       formData.price)
    images.forEach((img) => data.append('images', img))
    const result = await handleCreateProduct(data)
    if (result) {
      setSuccess('Product listed! Redirecting...')
      setTimeout(() => navigate('/seller/dashboard'), 1500)
    }
  }

  /* ─────────────────────────── RENDER ─────────────────────────────────── */
  return (
    /*
      RESPONSIVE STRATEGY
      ─────────────────────────────────────────────────────────────────────
      • Mobile   (< lg)  : min-h-screen, scrollable, single column form
      • Desktop  (lg+)   : h-screen overflow-hidden, two-column form, no scroll
    */
    <div
      className="min-h-screen lg:h-screen lg:overflow-hidden bg-slate-50 flex flex-col"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >

      {/* ── TOP BAR ──────────────────────────────────────────────────────── */}
      <header className="shrink-0 bg-white border-b border-slate-100 h-14 px-4 sm:px-8 lg:px-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Shopping bag icon */}
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
            <svg className="w-4 h-4 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <span
            className="text-base font-semibold text-slate-900"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {/* Shorter label on mobile, full label on sm+ */}
            <span className="sm:hidden">New Listing</span>
            <span className="hidden sm:inline">Create New Listing</span>
          </span>
        </div>

        {/* Back link */}
        <button
          type="button"
          onClick={() => navigate('/seller/dashboard')}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-600 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Dashboard</span>
        </button>
      </header>

      {/* ── CONTENT ──────────────────────────────────────────────────────── */}
      {/*
          Mobile / tablet  : py-8 px-4, flex-col, centered card
          Desktop          : flex-1 flex items-center justify-center
      */}
      <div className="flex-1 flex items-start lg:items-center justify-center px-4 sm:px-6 lg:px-10 py-6 lg:py-0 min-h-0">
        <div className="w-full max-w-4xl">

          {/* Greeting — hidden on very small screens to save space */}
          {user?.fullName && (
            <p className="hidden sm:block text-xs text-slate-400 mb-4 text-center lg:text-left">
              Hello, <span className="text-slate-600 font-medium">{user.fullName}</span> — fill in the details below.
            </p>
          )}

          {/* ── BANNERS ────────────────────────────────────────────────── */}
          {formError && (
            <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
              {formError}
            </div>
          )}
          {reduxError && (
            <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
              {Array.isArray(reduxError)
                ? reduxError.map((err, i) => <p key={i}>{err.msg}</p>)
                : <p>{reduxError}</p>}
            </div>
          )}
          {success && (
            <div className="mb-4 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-xs">
              {success}
            </div>
          )}

          {/* ── FORM ───────────────────────────────────────────────────── */}
          <form onSubmit={handleSubmit}>

            {/*
                Layout grid:
                  Mobile  : 1 column (grid-cols-1)
                  Desktop : 2 columns (lg:grid-cols-2)
            */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 mb-5">

              {/* ── LEFT COLUMN: Title + Description ─────────────────── */}
              <div className="flex flex-col gap-4 lg:gap-5">

                {/* Title */}
                <div>
                  <label
                    htmlFor="cp-title"
                    className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5"
                  >
                    Product Title
                  </label>
                  <input
                    id="cp-title"
                    name="title"
                    type="text"
                    placeholder="e.g. Classic White Linen Shirt"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full h-10 px-3.5 border border-slate-200 rounded-lg text-sm text-slate-800
                               placeholder-slate-300 focus:outline-none focus:border-indigo-700
                               focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col flex-1">
                  <label
                    htmlFor="cp-description"
                    className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5"
                  >
                    Description
                  </label>
                  <textarea
                    id="cp-description"
                    name="description"
                    rows={5}
                    placeholder="Describe your product — material, fit, occasion, size guide..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full flex-1 px-3.5 py-3 border border-slate-200 rounded-lg text-sm text-slate-800
                               placeholder-slate-300 resize-none focus:outline-none focus:border-indigo-700
                               focus:ring-2 focus:ring-indigo-100 transition-all duration-200 leading-relaxed"
                  />
                </div>
              </div>

              {/* ── RIGHT COLUMN: Price + Images ─────────────────────── */}
              <div className="flex flex-col gap-4 lg:gap-5">

                {/* Price */}
                <div>
                  <label
                    htmlFor="cp-price"
                    className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5"
                  >
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium select-none">
                      $
                    </span>
                    <input
                      id="cp-price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full h-10 pl-7 pr-3.5 border border-slate-200 rounded-lg text-sm text-slate-800
                                 placeholder-slate-300 focus:outline-none focus:border-indigo-700
                                 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Images */}
                <div className="flex flex-col flex-1">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                    Images{' '}
                    <span className="normal-case tracking-normal font-normal text-slate-400">
                      ({images.length} / {MAX_IMAGES})
                    </span>
                  </label>

                  {/* Upload zone */}
                  {images.length < MAX_IMAGES && (
                    <label
                      htmlFor="cp-images"
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed
                                 border-slate-200 rounded-xl cursor-pointer bg-slate-50
                                 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 group mb-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mb-1">
                        <svg className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                      </div>
                      <p className="text-[11px] text-slate-500 group-hover:text-indigo-600 transition-colors font-medium">
                        Click to upload — {MAX_IMAGES - images.length} slots left
                      </p>
                      <input id="cp-images" type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
                    </label>
                  )}

                  {/* Preview grid — responsive columns */}
                  {previews.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {previews.map((src, index) => (
                        <div key={index} className="relative group rounded-lg overflow-hidden border border-slate-200 aspect-square bg-slate-100">
                          <img src={src} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute inset-0 bg-slate-900/50 flex items-center justify-center
                                       opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow">
                              <svg className="w-3 h-3 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                          </button>
                          <span className="absolute top-1 left-1 bg-indigo-700/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                            {index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── SUBMIT ─────────────────────────────────────────────── */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900
                         text-white text-sm font-medium rounded-lg tracking-wide
                         transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
                         shadow-sm hover:shadow-md hover:shadow-indigo-200"
            >
              {loading ? 'Uploading Product...' : 'Create Product'}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default CreateProduct