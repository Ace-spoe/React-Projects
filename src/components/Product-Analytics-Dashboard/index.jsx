import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import generateProducts from "./products"
import ProductCard from "./ProductCard"
import CompareBar from "./CompareBar"
import './AnalyticsDashboard.css'

const FilterReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH":
      return { ...state, search: action.payload.input }
    case "CATEGORY":
      return { ...state, category: action.payload.category }
    case "MINPRICE":
      return { ...state, minPrice: action.payload.minPrice }
    case "MAXPRICE":
      return { ...state, maxPrice: action.payload.maxPrice }
    case "STOCK":
      return { ...state, inStock: action.payload.instock }
    case "SORTBY":
      return { ...state, sortBy: action.payload.sortBy }
    default:
      return state
  }
}

const AnalyticsDashBoard = () => {
  const [renderTime, setRenderTime] = useState(0)
  const [isCompareBarVisible, setIsCompareBarVisible] = useState(true)
  const products = useMemo(() => generateProducts(), [])
  
  const initialFilterState = {
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    inStock: false,
    sortBy: ""
  }

  const [state, dispatch] = useReducer(FilterReducer, initialFilterState)
  const [compareList, setCompareList] = useState([])

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(state.search.toLowerCase())
      const matchesCategory = state.category === "" || state.category.toLowerCase() === item.category.toLowerCase()
      const matchesMinPrice = state.minPrice === "" || item.price >= Number(state.minPrice)
      const matchesMaxPrice = state.maxPrice === "" || item.price <= Number(state.maxPrice)
      const matchesStock = !state.inStock || item.inStock
      return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice && matchesStock
    })

    switch (state.sortBy) {
      case "ASCENDING":
        return [...filtered].sort((a, b) => a.price - b.price)
      case "DESCENDING":
        return [...filtered].sort((a, b) => b.price - a.price)
      case "RATING":
        return [...filtered].sort((a, b) => b.rating - a.rating)
      case "ALPHABET":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      default:
        return filtered
    }
  }, [products, state.search, state.category, state.minPrice, state.maxPrice, state.inStock, state.sortBy])

  useEffect(() => {
    const startTime = performance.now()
    const endTime = performance.now()
    setRenderTime((endTime - startTime).toFixed(5))
  }, [filteredAndSortedProducts])

  const stats = useMemo(() => {
    const products = filteredAndSortedProducts
    const count = products.length
    let totalPrice = 0
    let totalRating = 0
    let highestPrice = 0
    let lowestPrice = Infinity
    const categories = {}

    products.forEach(product => {
      totalPrice += product.price
      totalRating += product.rating
      highestPrice = Math.max(highestPrice, product.price)
      lowestPrice = Math.min(lowestPrice, product.price)
      const cat = product.category
      categories[cat] = (categories[cat] || 0) + 1
    })

    return {
      count,
      averagePrice: count === 0 ? 0 : (totalPrice / count).toFixed(2),
      averageRating: count === 0 ? 0 : (totalRating / count).toFixed(1),
      highestPrice: count === 0 ? 0 : highestPrice,
      lowestPrice: count === 0 ? 0 : lowestPrice,
      categories
    }
  }, [filteredAndSortedProducts])

  const handleAddToCompare = useCallback((product) => {
    setCompareList(prev => {
      const alreadyExists = prev.find(item => item.id === product.id)
      if (alreadyExists) return prev
      setIsCompareBarVisible(true)
      return [...prev, product]
    })
  }, [])

  const handleRemove = useCallback((productId) => {
    setCompareList(prev => prev.filter(item => item.id !== productId))
  }, [])

  const handleClear = useCallback(() => {
    setCompareList([])
  }, [])

  return (
    <div className="analytics-dashboard">
      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-grid">
          <div className="filter-group">
            <label className="filter-label">🔍 Search</label>
            <input
              type="text"
              className="filter-input"
              placeholder='Search for product...'
              value={state.search}
              onChange={(e) => dispatch({ type: "SEARCH", payload: { input: e.target.value } })}
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">📂 Category</label>
            <select
              className="filter-select"
              value={state.category}
              onChange={(e) => dispatch({ type: "CATEGORY", payload: { category: e.target.value } })}
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="home">Home</option>
              <option value="toys">Toys</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">💰 Min Price</label>
            <input
              type="number"
              className="filter-input"
              placeholder='0'
              min='0'
              onChange={(e) => dispatch({ type: "MINPRICE", payload: { minPrice: e.target.value } })}
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">💰 Max Price</label>
            <input
              type="number"
              className="filter-input"
              placeholder='1000'
              min='0'
              onChange={(e) => dispatch({ type: "MAXPRICE", payload: { maxPrice: e.target.value } })}
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">🔄 Sort By</label>
            <select
              className="filter-select"
              value={state.sortBy}
              onChange={(e) => dispatch({ type: "SORTBY", payload: { sortBy: e.target.value } })}
            >
              <option value="">None</option>
              <option value="ASCENDING">Price: Low to High</option>
              <option value="DESCENDING">Price: High to Low</option>
              <option value="RATING">Rating: High to Low</option>
              <option value="ALPHABET">Alphabetical</option>
            </select>
          </div>

          <div className="filter-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                onChange={(e) => dispatch({ type: "STOCK", payload: { instock: e.target.checked } })}
              />
              📦 In Stock Only
            </label>
          </div>
        </div>
      </div>

      {/* Stats Panel */}
      <div className="stats-panel">
        <h3 className="stats-title">📊 Dashboard Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.count}</div>
            <div className="stat-label">Total Products</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">${stats.averagePrice}</div>
            <div className="stat-label">Average Price</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.averageRating} ⭐</div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">${stats.lowestPrice} - ${stats.highestPrice}</div>
            <div className="stat-label">Price Range</div>
          </div>
        </div>

        <h4>By Category:</h4>
        <ul className="category-list">
          {Object.entries(stats.categories).map(([cat, count]) => (
            <li key={cat} className="category-item">
              <span>{cat}</span>
              <span className="category-count">{count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Product Grid */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="empty-state">No products found 😢 Try adjusting your filters</div>
      ) : (
        <div className="product-grid">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onCompare={handleAddToCompare}
              isComparing={compareList.some(item => item.id === product.id)}
            />
          ))}
        </div>
      )}

      {/* Compare Bar */}
      {compareList.length > 0 && isCompareBarVisible && (
         <CompareBar 
           selected={compareList}
           onRemove={handleRemove}
           onClear={() => {
             setCompareList([])
             setIsCompareBarVisible(false)
           }}
           onHide={() => setIsCompareBarVisible(false)}  // ← New prop
         />
       )}

      {/* Render Time Badge */}
      <div className={`render-time ${renderTime > 5 ? 'slow' : ''}`}>
        ⚡ Render: {renderTime} ms
      </div>
    </div>
  )
}

export default AnalyticsDashBoard