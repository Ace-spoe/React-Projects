import React, { useState } from "react";
import data from "./data";
import "./style.css";

function App() {

    const [openIds , setOpenIds] = useState([])
    const [isDoubleMode, setIsDoubleMode] = useState(false);


    function handleClick(id){

      //
       if (!isDoubleMode) {
         (openIds.includes(id)) ? 
         (setOpenIds([])) : 
         (setOpenIds([id])) 
            
        
        }
        else{
        (openIds.includes(id)) ? 
          setOpenIds(openIds.filter((openId) => openId !== id)) : 
         (setOpenIds([...openIds, id]))

        }
        }
        
  return (
    <div className="center-container">
      <div className="card">
        <div className="header">
          <h2 className="title">Accordion</h2>
          <button  className= {!isDoubleMode ? "double-btn" : "double"}
          onClick={()=> {setIsDoubleMode(!isDoubleMode) }}>Double Selection</button>
        </div>

        {data.map((item) => (
          <div key={item.id} className="qa-item">
            <div className="question-row">
              <h3 className="question">{item.question}</h3>
              <button onClick={() => {handleClick(item.id)}} className="toggle-btn ">{openIds.includes(item.id) ?"-" :"+"}</button>
            </div>

            {/* Answer hidden for now */}
            {openIds.includes(item.id) && <p>{item.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;