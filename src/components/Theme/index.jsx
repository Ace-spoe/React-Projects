import React, { useState } from 'react'
import "./Theme.css"
const Theme = () => {
 const [theme, setTheme] = useState(false)
 function change(){
    theme  ? setTheme(false) : setTheme(true)
 }
  
  return (
   <div className={theme ? "theme-container" : "mode"}>
     <div className="theme-card">
        <h1 className={theme ? "theme-title" : "theme-title textToWhite"}>Hello , Click Btn</h1>
        <button className={theme ? "theme-btn" : "theme-btn textToWhite"} onClick={change}>Click</button>
  </div>
</div>
  )
}

export default Theme

//A better way can be as follows :
// import React, { useState } from 'react'
// import "./Theme.css"

// const Theme = () => {
//   const [theme, setTheme] = useState(true)

//   function change() {
//     setTheme(prev => !prev)
//   }

//   return (
//     <div className={`theme-container ${theme ? "light" : "dark"}`}>
//       <div className="theme-card">
//         <h1 className="theme-title">Hello , Click Btn</h1>
//         <button className="theme-btn" onClick={change}>Click</button>
//       </div>
//     </div>
//   )
// }

// export default Theme

//Using localStorage there is another method , check it didnt paste it useLocalStroage.jsx file might be needed

// import useLocalStroage from "./useLocalStroage";
// import './theme.css'

// export default function LightDarkMode() {
//   const [theme, setTheme] = useLocalStroage("theme", "dark");

//   function handleToggleTheme() {
//     setTheme(theme === "light" ? "dark" : "light");
//   }

//   console.log(theme);

//   return (
//     <div className="light-dark-mode" data-theme={theme}>
//       <div className="container">
//         <p>Hello World !</p>
//         <button onClick={handleToggleTheme}>Change Theme</button>
//       </div>
//     </div>
//   );
// }