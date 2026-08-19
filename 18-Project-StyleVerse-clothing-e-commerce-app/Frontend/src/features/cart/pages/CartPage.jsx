import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useBuyerCart, } from '../hook/useBuyerCart.js'

/**
 * CartPage Component (Buyer View)
 * --------------------------------------------------------------------------
 * Premium luxury shopping cart interface designed following StyleVerse editorial guidelines.
 * Displays items fetched via handleGetCartItems(), calculates total pricing,
 * and handles loading and error states from Redux.
 */
function CartPage() {
  // ── 1. Extract Cart state from Redux ─────────────────────────────────────
  const cartItems = useSelector((state) => state.cart.items) || []
  const isLoading = useSelector((state) => state.cart.cartLoading)
  const error = useSelector((state) => state.cart.cartError)

  const { handleGetCartItems,handleIncrementCartItem,handleDecrementCartItem,handleDeleteCartItem } = useBuyerCart()

  // ── 2. Fetch cart items on mount ──────────────────────────────────────────
  useEffect(() => {
    handleGetCartItems()
  }, [])

  // ── 3. Calculate order subtotal & total ───────────────────────────────────
  const subtotal = cartItems.reduce((acc, item) => {
    const product = item.product || {}
    const variantObj = typeof item.variant === 'object'
      ? item.variant
      : Array.isArray(product.variants)
        ? product.variants.find((v) => v._id === item.variant || v.id === item.variant)
        : null

    const price = item.price?.amount 
      ?? variantObj?.price?.amount 
      ?? product.price?.amount 
      ?? 0

    return acc + price * (item.quantity || 1)
  }, 0)

  const currencySymbol = cartItems.length > 0 && cartItems[0].price?.currency === 'USD' ? '$' : '₹'
  const estimatedTax = Math.round(subtotal * 0.05) // 5% estimated tax
  const totalAmount = subtotal + estimatedTax

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-12" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ── BREADCRUMB / BACK LINK ────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Continue Shopping
          </Link>
          <span className="text-xs text-slate-400 font-medium">StyleVerse Buyer Experience</span>
        </div>

        {/* ── PAGE HEADER ──────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-slate-200 pb-5">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Your Shopping Cart
            </h1>
            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full shadow-xs">
              {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Free shipping on orders over ₹1,000
          </p>
        </div>

        {/* ── LOADING STATE ────────────────────────────────────────────── */}
        {isLoading && (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 flex flex-col items-center justify-center gap-4 text-center shadow-xs">
            <div className="w-10 h-10 border-3 border-slate-200 border-t-indigo-600 rounded-full animate-spin" />
            <p className="text-slate-600 text-sm font-medium">Fetching your curated cart items...</p>
          </div>
        )}

        {/* ── ERROR STATE ──────────────────────────────────────────────── */}
        {!isLoading && error && (
          <div className="bg-rose-50/80 rounded-3xl border border-rose-200 p-10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Unable to Load Shopping Cart</h3>
            <p className="text-xs text-rose-600 max-w-md">{error}</p>
            <button
              onClick={handleGetCartItems}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ── EMPTY CART STATE ─────────────────────────────────────────── */}
        {!isLoading && !error && cartItems.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-16 flex flex-col items-center justify-center text-center space-y-5 shadow-xs">
            <div className="w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                Your cart is empty
              </h2>
              <p className="text-slate-500 text-sm max-w-sm">
                Explore our luxury marketplace to discover curated apparel from independent designers.
              </p>
            </div>
            <Link
              to="/"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs uppercase tracking-widest font-semibold rounded-2xl transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              Discover Collections
            </Link>
          </div>
        )}

        {/* ── CART CONTENT (LIST + ORDER SUMMARY) ───────────────────────── */}
        {!isLoading && !error && cartItems.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* ── LEFT COLUMN: CART ITEMS LIST (8 cols) ────────────────── */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => {
                const product = item.product || {}
                
                // Resolve variant object
                const variantObj = typeof item.variant === 'object'
                  ? item.variant
                  : Array.isArray(product.variants)
                    ? product.variants.find((v) => v._id === item.variant || v.id === item.variant)
                    : null

                // Resolve image (variant image fallback to product image)
                const variantImg = variantObj?.images?.[0]
                  ? (typeof variantObj.images[0] === 'object' ? variantObj.images[0].url : variantObj.images[0])
                  : null

                const productImg = product.images?.[0]
                  ? (typeof product.images[0] === 'object' ? product.images[0].url : product.images[0])
                  : null

                const displayImg = variantImg || productImg

                // Resolve prices
                const priceNum = item.price?.amount 
                  ?? variantObj?.price?.amount 
                  ?? product.price?.amount 
                  ?? 0

                const itemSubtotal = priceNum * (item.quantity || 1)

                return (
                  <div
                    key={item._id}
                    className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-indigo-200 transition-all duration-200 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between relative"
                  >
                    {/* Top Right Cross Button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteCartItem(item.product?._id, variantObj?._id)}
                      className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 border border-slate-200 flex items-center justify-center transition-all cursor-pointer shadow-2xs z-10"
                      aria-label="Remove item"
                      title="Remove item"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    {/* Item Thumbnail & Basic Info */}
                    <div className="flex items-center gap-4 sm:gap-5 flex-1 pr-6 sm:pr-0">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-indigo-50/50 border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center relative">
                        {displayImg ? (
                          <img
                            src={displayImg}
                            alt={product.title || 'Product'}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.style.display = 'none' }}
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Link
                          to={`/products/${product._id}`}
                          className="text-base sm:text-lg font-semibold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-1"
                          style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                          {product.title || 'Untitled Product'}
                        </Link>

                        {/* Variant Badges (Color, Size, SKU) */}
                        <div className="flex flex-wrap items-center gap-2 pt-0.5">
                          {variantObj?.color && (
                            <span className="text-[10px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md border border-slate-200">
                              Color: {variantObj.color}
                            </span>
                          )}
                          {variantObj?.size && (
                            <span className="text-[10px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md border border-slate-200">
                              Size: {variantObj.size}
                            </span>
                          )}
                          {variantObj?.sku && (
                            <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-100">
                              SKU: {variantObj.sku}
                            </span>
                          )}
                        </div>

                        {/* Stock Status */}
                        <div className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 pt-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          In Stock & Ready to Ship
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Item Subtotal (pr-10 prevents overlap with top-right delete icon) */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 gap-4 sm:pr-10">
                      
                      {/* Price Display */}
                      <div className="text-right">
                        <span className="text-lg font-bold text-indigo-600">
                          {currencySymbol}{itemSubtotal.toLocaleString('en-IN')}
                        </span>
                        {item.quantity > 1 && (
                          <p className="text-[11px] text-slate-400">
                            {currencySymbol}{priceNum.toLocaleString('en-IN')} each
                          </p>
                        )}
                      </div>

                      {/* Quantity Selector with Minus & Plus Buttons */}
                      <div className="flex items-center gap-1 bg-slate-100/80 border border-slate-200 rounded-xl p-1">
                        <button
                          onClick={() => handleDecrementCartItem(item.product._id, variantObj?._id)}
                          type="button"
                          className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-slate-900">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => handleIncrementCartItem(item.product._id, variantObj?._id)}
                          type="button"
                          className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                        >
                          +
                        </button>
                      </div>

                    </div>
                  </div>
                )
              })}
            </div>

            {/* ── RIGHT COLUMN: ORDER SUMMARY (4 cols) ─────────────────── */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 sticky top-24">
                
                <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Order Summary
                </h2>

                {/* Subtotal, Tax, Shipping */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">{currencySymbol}{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Estimated Tax (5%)</span>
                    <span className="font-semibold text-slate-900">{currencySymbol}{estimatedTax.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-semibold uppercase text-xs">FREE</span>
                  </div>
                </div>


                {/* Grand Total */}
                <div className="pt-4 border-t border-slate-200 flex items-baseline justify-between">
                  <div>
                    <span className="text-base font-bold text-slate-900 block">Total</span>
                    <span className="text-[10px] text-slate-400">Inclusive of all applicable taxes</span>
                  </div>
                  <span className="text-2xl font-bold text-indigo-600">
                    {currencySymbol}{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  type="button"
                  className="w-full h-13 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-2xl transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Proceed to Checkout
                </button>

                {/* Trust Badges */}
                <div className="pt-2 flex items-center justify-center gap-4 text-slate-400 text-xs text-center border-t border-slate-100">
                  <div className="flex items-center gap-1 text-[11px]">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    256-Bit SSL Encrypted
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default CartPage