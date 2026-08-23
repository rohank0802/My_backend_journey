import React from 'react'
import { useLocation, Link } from 'react-router-dom'

/**
 * OrderSuccess Component (Buyer Experience)
 * --------------------------------------------------------------------------
 * Premium luxury order confirmation screen following StyleVerse editorial guidelines.
 * Displays order ID extracted from query params (`order_id`), order status timeline,
 * summary highlights, and quick navigation actions.
 */
function OrderSuccess() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const orderId = queryParams.get('order_id') || 'ORD-9A33XWu170gUtm'
  
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  // Estimated delivery date (3-5 days from today)
  const deliveryDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })

  const handlePrint = () => {
    window.print()
  }

  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-12 flex items-center justify-center"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="max-w-3xl w-full space-y-8">
        
        {/* ── MAIN SUCCESS CARD ────────────────────────────────────────────── */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">
          
          {/* Top Decorative Gradient Banner */}
          <div className="h-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600" />

          <div className="p-6 sm:p-10 space-y-8 text-center sm:text-left">
            
            {/* Celebration Icon & Header */}
            <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-slate-100">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 shadow-inner relative">
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-ping opacity-75" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full" />
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  Payment Verified
                </div>
                <h1
                  className="text-2xl sm:text-3xl font-normal text-slate-900 tracking-tight"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Thank You For Your Order!
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Your payment was processed successfully. A confirmation receipt has been sent to your email.
                </p>
              </div>
            </div>

            {/* ── ORDER DETAILS HIGHLIGHT GRID ────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
              
              {/* Order ID */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                  Order ID
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-slate-900 break-all select-all">
                    {orderId}
                  </span>
                </div>
              </div>

              {/* Order Date */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                  Date Placed
                </span>
                <span className="text-sm font-semibold text-slate-800 block">
                  {currentDate}
                </span>
              </div>

              {/* Payment Method */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                  Payment Gateway
                </span>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  Razorpay Secured Payment
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                  Estimated Delivery
                </span>
                <span className="text-xs font-bold text-emerald-600 block">
                  Expected by {deliveryDate}
                </span>
              </div>

            </div>

            {/* ── ORDER STATUS TRACKER TIMELINE ───────────────────────────── */}
            <div className="space-y-4 pt-2">
              <h3
                className="text-base font-semibold text-slate-900"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Order Fulfillment Status
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 relative">
                
                {/* Step 1: Placed */}
                <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200 flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center">
                      ✓
                    </span>
                    <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wide">Done</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Order Placed</h4>
                    <p className="text-[10px] text-slate-500">Details verified</p>
                  </div>
                </div>

                {/* Step 2: Processing */}
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold text-[10px] flex items-center justify-center animate-spin">
                      ⏳
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wide">Active</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Atelier Prep</h4>
                    <p className="text-[10px] text-slate-500">Packaging items</p>
                  </div>
                </div>

                {/* Step 3: Shipped */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2 opacity-60">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 font-bold text-[10px] flex items-center justify-center">
                      3
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">Next</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-700">Dispatch</h4>
                    <p className="text-[10px] text-slate-400">Courier partner</p>
                  </div>
                </div>

                {/* Step 4: Delivery */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2 opacity-60">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 font-bold text-[10px] flex items-center justify-center">
                      4
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">Pending</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-700">Delivery</h4>
                    <p className="text-[10px] text-slate-400">At your doorstep</p>
                  </div>
                </div>

              </div>
            </div>

            {/* ── ACTION BUTTONS ──────────────────────────────────────────── */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 justify-between border-t border-slate-100">
              
              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-semibold uppercase tracking-wider rounded-2xl transition-all shadow-md hover:scale-[1.01] text-center"
              >
                Continue Shopping
              </Link>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full sm:w-auto px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-2xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print Receipt
                </button>
              </div>

            </div>

          </div>

          {/* Bottom Security Footer */}
          <div className="bg-slate-900 text-slate-400 py-3.5 px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between text-xs gap-2">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>256-Bit SSL Encrypted & Verified Transaction</span>
            </div>
            <span>StyleVerse Customer Support Available 24/7</span>
          </div>

        </div>

      </div>
    </div>
  )
}

export default OrderSuccess