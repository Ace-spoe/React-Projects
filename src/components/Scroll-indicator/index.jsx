import React, { useEffect, useState, useRef } from "react";
import "./scroll.css";

const ScrollIndicator = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [SP, setSP] = useState(0);
  const scrollRef = useRef(null);

  // Fetch data from the API
  async function fetchData(getUrl) {
    try {
      setLoading(true);
      const res = await fetch(getUrl);
      const dataAPI = await res.json();
      dataAPI.products && setData(dataAPI.products);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchData(url);
  }, [url]);

  // Scroll handler
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight;
    const clientHeight = el.clientHeight;

    const maxScroll = scrollHeight - clientHeight;

    if (maxScroll <= 0) {
      setSP(0);
      return;
    }

    const percent = (scrollTop / maxScroll) * 100;
    setSP(percent);
    // console.log(scrollTop);
    // console.log(scrollHeight);
    // console.log(clientHeight);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="scroll-page" ref={scrollRef}>
      {/* Progress bar */}
      <div className="scroll-bar">
        <div className="scroll-progress" style={{ width: `${SP}%` }}></div>
      </div>

      {/* Content */}
      <div className="scroll-content">
        <h1>Custom Scroll Indicator</h1>
        <p className="scroll-source">Source: {url}</p>

        {/* Render the fetched content */}
        <div className="scroll-body">
          {data.map((product) => (
            <p key={product.id}>{product.title}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicator;