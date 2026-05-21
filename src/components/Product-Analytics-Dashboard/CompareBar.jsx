import React from 'react'

const CompareBar = ({ selected, onRemove, onClear, onHide}) => {
  if (selected.length === 0) return null

  return (
    <div className="compare-bar">
      <div className="compare-header">
        <h3 className="compare-title">🔄 Compare Products ({selected.length})</h3>
        <div className="header-buttons">
          {/* <button className="hide-btn" onClick={onHide}>
            🙈 Hide
          </button> */}
          <button className="clear-btn" onClick={onClear}>
            🗑️ Clear All
          </button>
        </div>
      </div>

      <div className="compare-table-container">
        <table className="compare-table">
          <thead>
            <tr>
              <th>Feature</th>
              {selected.map(product => (
                <th key={product.id}>
                  {product.name}
                  <button 
                    className="remove-btn-header" 
                    onClick={() => onRemove(product.id)}
                  >
                    ✕
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="feature-label">💰 Price</td>
              {selected.map(product => (
                <td key={product.id} className="feature-value">
                  ${product.price}
                </td>
              ))}
            </tr>
            <tr>
              <td className="feature-label">⭐ Rating</td>
              {selected.map(product => (
                <td key={product.id} className="feature-value">
                  {product.rating}/5 {'⭐'.repeat(Math.floor(product.rating))}
                </td>
              ))}
            </tr>
            <tr>
              <td className="feature-label">📦 Category</td>
              {selected.map(product => (
                <td key={product.id} className="feature-value">
                  {product.category}
                </td>
              ))}
            </tr>
            <tr>
              <td className="feature-label">📊 In Stock</td>
              {selected.map(product => (
                <td key={product.id} className="feature-value">
                  {product.inStock ? '✅ Yes' : '❌ No'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="feature-label">🆔 Product ID</td>
              {selected.map(product => (
                <td key={product.id} className="feature-value">
                  #{product.id}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="compare-footer">
        <button className="close-bar-btn" onClick={onHide}>
          👁️ Hide
        </button>
      </div>
    </div>
  )
}

export default CompareBar