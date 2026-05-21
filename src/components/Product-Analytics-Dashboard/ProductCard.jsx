import React from 'react'

const ProductCard = React.memo(({ product, onCompare, isComparing }) => {
  return (
    <div className="product-card">
      <h3 className="product-name">{product.name}</h3>
      <div className="product-price">${product.price}</div>
      <div className="product-rating">
        {'⭐'.repeat(Math.floor(product.rating))} {product.rating}/5
      </div>
      <div className="product-category">{product.category}</div>
      <button
        className="compare-btn"
        disabled={isComparing}
        onClick={() => onCompare(product)}
      >
        {isComparing ? "✓ In Compare" : "+ Add to Compare"}
      </button>
    </div>
  )
})

export default ProductCard