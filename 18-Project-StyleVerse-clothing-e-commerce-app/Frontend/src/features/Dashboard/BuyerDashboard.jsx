import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useBuyerProduct } from '../products/hook/useBuyerProduct.js'

const BuyerDashboard = () => {
  const navigate = useNavigate()
  const { handleAllProducts } = useBuyerProduct()

  // Read products & state from Redux product slice
  const rawProducts = useSelector((state) => state.product.products)
  const loading = useSelector((state) => state.product.productLoading)
  const error = useSelector((state) => state.product.productError)

  // Ensure products is always treated as an array
  const products = Array.isArray(rawProducts)
    ? rawProducts
    : rawProducts?.products || []

  // Call handleAllProducts on component mount
  useEffect(() => {
    handleAllProducts()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="mb-8 pb-4 border-b border-slate-200">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            Products
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {products.length > 0 ? `Showing ${products.length} products` : 'Explore marketplace listings'}
          </p>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-2 border-slate-200 border-t-indigo-600 rounded-full animate-spin" />
            <p className="text-slate-500 text-sm">Loading products...</p>
          </div>
        )}

        {/* ERROR STATE */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
            <p className="text-rose-600 text-sm font-medium">Failed to load products.</p>
            <button
              onClick={handleAllProducts}
              className="text-xs text-indigo-600 hover:underline font-semibold"
            >
              Try Again
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && products.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-6">
            <p className="text-slate-500 text-sm">No products available at the moment.</p>
          </div>
        )}

        {/* PRODUCTS GRID */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const firstImg = Array.isArray(product.images) && product.images.length > 0
                ? (typeof product.images[0] === 'object' ? product.images[0].url : product.images[0])
                : null

              const priceNum = typeof product.price === 'object' ? product.price?.amount || 0 : Number(product.price) || 0
              const currencySymbol = product.price?.currency === 'USD' ? '$' : '₹'

              return (
                <div
                  key={product._id}
                  onClick={() => navigate(`/products/${product._id}`)}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                >
                  {/* Product Thumbnail / Title Fallback */}
                  <div className="relative aspect-[4/3] bg-indigo-50/60 overflow-hidden flex flex-col items-center justify-center p-4 text-center">
                    {firstImg ? (
                      <img
                        src={firstImg}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.parentElement.classList.add('flex')
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 p-2">
                        <div className="w-10 h-10 rounded-xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <span className="text-xs font-bold text-slate-800 line-clamp-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {product.title}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {product.seller && (
                        <p className="text-[10px] text-indigo-600 font-semibold uppercase tracking-wider mb-1">
                          Seller: {typeof product.seller === 'object' ? product.seller.fullName : 'Seller'}
                        </p>
                      )}
                      <h3
                        className="text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors truncate"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                        title={product.title}
                      >
                        {product.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-base font-bold text-indigo-600">
                        {currencySymbol}{priceNum.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}

export default BuyerDashboard