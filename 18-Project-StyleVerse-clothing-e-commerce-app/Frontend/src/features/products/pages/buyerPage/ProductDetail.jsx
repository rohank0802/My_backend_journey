import { useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useBuyerProduct } from "../../hook/useBuyerProduct.js"
import { useEffect, useState } from "react"

function ProductDetail() {
    const { productId } = useParams()
    const { handleProductdetail } = useBuyerProduct()
    const [product, setProductDetail] = useState(null)
    const [selectedImgIndex, setSelectedImgIndex] = useState(0)
    const [imgError, setImgError] = useState(false)

    async function fetchProductDetail() {
        const result = await handleProductdetail(productId)
        if (result) {
            setProductDetail(result)
        }
    }

    useEffect(() => {
        fetchProductDetail()
    }, [productId])

    console.log(product)

    // Loading State
    if (!product) {
        return (
            <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center py-20 gap-3 text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
                <div className="w-8 h-8 border-3 border-slate-200 border-t-indigo-600 rounded-full animate-spin" />
                <p className="text-slate-600 text-sm font-medium">Loading product details...</p>
            </div>
        )
    }

    // Safely extract image URLs
    const imageList = Array.isArray(product.images) && product.images.length > 0
        ? product.images.map((img) => (typeof img === 'object' ? img.url : img))
        : []

    // Slider Navigation Functions
    const handlePrevImage = () => {
        if (imageList.length <= 1) return
        setImgError(false)
        setSelectedImgIndex((prev) => (prev - 1 + imageList.length) % imageList.length)
    }

    const handleNextImage = () => {
        if (imageList.length <= 1) return
        setImgError(false)
        setSelectedImgIndex((prev) => (prev + 1) % imageList.length)
    }

    // Safely extract price
    const priceNum = typeof product.price === 'object' ? product.price?.amount || 0 : Number(product.price) || 0
    const currencySymbol = product.price?.currency === 'USD' ? '$' : '₹'

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900 py-10 px-4 sm:px-6 lg:px-12" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="max-w-6xl mx-auto">
                
                {/* Back to Marketplace Link */}
                <div className="mb-6">
                    <Link to="/" className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 font-semibold transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Marketplace
                    </Link>
                </div>

                {/* Main Product Card */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm shadow-slate-200/50">
                    
                    {/* LEFT COLUMN: Image Slider & Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-2xl bg-indigo-50/50 border border-slate-200 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden shadow-sm group">
                            {imageList.length > 0 && !imgError ? (
                                <>
                                    {/* Slide Image */}
                                    <img
                                        src={imageList[selectedImgIndex]}
                                        alt={product.title}
                                        className="w-full h-full object-cover rounded-2xl transition-all duration-300"
                                        onError={() => setImgError(true)}
                                    />

                                    {/* Slider Controls (Shown on hover when multiple images exist) */}
                                    {imageList.length > 1 && (
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            {/* Previous Button */}
                                            <button
                                                onClick={handlePrevImage}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-all hover:scale-110 border border-slate-200 cursor-pointer"
                                                title="Previous image"
                                                aria-label="Previous image"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>

                                            {/* Next Button */}
                                            <button
                                                onClick={handleNextImage}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-all hover:scale-110 border border-slate-200 cursor-pointer"
                                                title="Next image"
                                                aria-label="Next image"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>

                                            {/* Slider Indicators (Dots) */}
                                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-xs px-3 py-1 rounded-full border border-white/20">
                                                {imageList.map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => {
                                                            setSelectedImgIndex(idx)
                                                            setImgError(false)
                                                        }}
                                                        className={`h-2 rounded-full transition-all cursor-pointer ${
                                                            selectedImgIndex === idx
                                                                ? 'w-5 bg-white'
                                                                : 'w-2 bg-white/50 hover:bg-white/80'
                                                        }`}
                                                        aria-label={`Go to slide ${idx + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-3 p-4">
                                    <div className="w-16 h-16 rounded-2xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center shadow-sm">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                                        {product.title}
                                    </h3>
                                    <span className="text-xs text-indigo-600 font-semibold bg-white border border-indigo-100 px-3 py-1 rounded-full shadow-xs">
                                        StyleVerse Apparel
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Gallery Strip */}
                        {imageList.length > 1 && !imgError && (
                            <div className="flex items-center gap-3 overflow-x-auto pb-2">
                                {imageList.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setSelectedImgIndex(idx)
                                            setImgError(false)
                                        }}
                                        className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                                            selectedImgIndex === idx
                                                ? 'border-indigo-600 scale-105 shadow-sm'
                                                : 'border-slate-200 opacity-60 hover:opacity-100'
                                        }`}
                                    >
                                        <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Product Information & Actions */}
                    <div className="space-y-6">
                        
                        {/* Seller / Brand Badge */}
                        {product.seller && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold">
                                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                                Seller: {typeof product.seller === 'object' ? product.seller.fullName : 'StyleVerse Brand'}
                            </div>
                        )}

                        {/* Product Title */}
                        <h1
                            className="text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight"
                            style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                            {product.title}
                        </h1>

                        {/* Price Display */}
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-indigo-600">
                                {currencySymbol}{priceNum.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
                                Inclusive of all taxes
                            </span>
                        </div>

                        <div className="h-px bg-slate-200 w-full" />

                        {/* Description */}
                        <div className="space-y-2">
                            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Description & Details
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {product.description || 'No description provided for this product.'}
                            </p>
                        </div>

                        {/* Action Buttons: Buy Now & Add to Cart */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                            <button
                                className="w-full sm:flex-1 h-13 py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm rounded-2xl transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Buy Now
                            </button>

                            <button
                                className="w-full sm:flex-1 h-13 py-3.5 px-6 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-sm rounded-2xl border border-slate-300 transition-all flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Add to Cart
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default ProductDetail