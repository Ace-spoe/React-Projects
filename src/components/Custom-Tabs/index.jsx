import React, { useState } from "react";
import "./Tab.css";

const Tabs = () => {
    const [tab, setTab] = useState(1)
    function tabAssigner(num){
        setTab(num)
    }
    const Tabs = [1,2,3];
    
  return (
    
    <div className="tabs-container">
      
      {/* Tabs header */}
      <div className="tabs-header">
        {Tabs.map((_,i)=>(
            <button onClick={()=>tabAssigner(i + 1)} className= {`tab-btn ${tab == i + 1 ? "active": ""} `}>Tab {i + 1}</button>))}
        
      </div>

      {/* Content area */}
      <div className="tabs-content">
       { Tabs.map((_,i)=> (
            <div className= {`tab-panel ${tab == i + 1 ? "active": ""} `}>
          <h2>Tab {i + 1} Content</h2>
          <p>This is content for tab {i + 1}</p>
        </div>
        ))}
      </div>

    </div>
  );
};

export default Tabs;