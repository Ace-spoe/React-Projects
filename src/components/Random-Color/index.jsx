import React, { useState } from 'react'
import "./color.css"

const RandomColor = () => {
  const [color, setColor] = useState(null)
  const [type, setType] = useState('hex') // Track type to help formatting

  function hex() {
    const kit = "0123456789ABCDEF".split("")
    const kitArr = [];
    for (let i = 0; i < 6; i++) {
      // Fixed: Math.random() * 16 to include index 15 ('F')
      kitArr.push(kit[Math.floor(Math.random() * 16)])
    }
    const hexColor = "#" + kitArr.join("")
    setColor(hexColor)
    setType('hex')
  }

  function rgb(){
   const rgbArr = [];
    for (let i = 0; i < 3; i++) {
      rgbArr.push(Math.floor(Math.random() * 256))
    }
    const rgbColor = `rgb(${rgbArr.join(",")})`
    setColor(rgbColor)
    setType('rgb')
  }
  
  function random(){
  
    type === 'hex' ? rgb() : hex();
  }
 
  return (
    // Applied background color dynamically
    <div
  className="container"
  style={{
    background: `linear-gradient(0deg, ${color}, #fed6e3)` || `linear-gradient(135deg, #a8edea, #fed6e3)`

  }}
>
      <h1 className="title">Color Generator</h1>

      <div className="button-group">
        <button className="btn hex" onClick={hex} >Create HEX Color</button>
        <button className="btn rgb" onClick={rgb} >RGB Color</button>
        <button className="btn random" onClick={random} >Generate Random Color</button>
      </div>
 
      <div className="color-display" >
        {/* Displaying the color string */}
        <span className="color-text" style={{ fontSize: "2rem", fontWeight: "bold" }}>
          {color}
        </span>
      </div>
    </div>
  )
}
export default RandomColor