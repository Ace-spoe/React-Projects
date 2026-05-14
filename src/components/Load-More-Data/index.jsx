import React, { useEffect, useState } from "react";
import "./load.css";

function LoadMoreData({url , limit}) {
    const [loading, setLoading] = useState(false);
    const [loadedData, setLoadedData] = useState([]);
    const [error, setError] = useState(false);
    const [skip, setSkip] = useState(0)

    async function fetchProduct(){
      
         if (!url) return;
       try{
        setLoading(true)
        const res = await fetch(`${url}?limit=${limit}&skip=${skip}`)
        const data = await res.json()
        setLoadedData(prev => ([...prev,...data.products]));
        setSkip(prev => (prev + limit))
        setLoading(false)
        }
       catch(err){
        setError(true)
        setLoading(false)
       }
    }

    useEffect(() => {
      fetchProduct()
    }, [])
    
   console.log(loadedData) 

   function LoadMore(){
    fetchProduct()
   }
  return (
    <div className="load-container">
      <header className="load-header">
        <h1>Product Explorer</h1>
        <p>Browse and load more products</p>
      </header>

      <div className="products-grid">
        {loadedData.map((product,i)=>{
            return (
                <div className="product-card" key={product.id}>
          <div className="image-wrapper">
            <img src={product.images[0]} alt="conncection" />
          </div>
          <div className="product-info">
            <h3>{product.title}</h3>
          </div>

        </div>
            )
        })}
        {/* Map your products here */}

        {/* Example card structure */}
        {/*
        <div className="product-card">
          <div className="image-wrapper">
            <img src="" alt="" />
          </div>
          <div className="product-info">
            <h3>Product Title</h3>
          </div>
        </div>
        */}
       {loading && (
  <div className="spinner-wrapper">
    <div className="spinner"></div>
  </div>
)}
{error && <p>Error fetching products</p>}
      </div>

      <div className="button-wrapper">
        {!loading &&
         <button className="load-button"
        onClick={LoadMore}
        >
          Load More
        </button>}
      </div>
    </div>
  );
}

export default LoadMoreData;