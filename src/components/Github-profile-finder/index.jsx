import React, { useEffect, useState } from "react";
import "./github.css";

const GitHub = () => {
    const [userName, setUserName] = useState("sangammukherjee");
    const [userData, setUserData] = useState('')
    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

   async function fetchProfile(){
    try {
        setLoading(true)
        const res = await fetch(`https://api.github.com/users/${userName}`)
        const data = await res.json();
        setUserData(data)
         setLoading(false);
         console.log(data)

    } catch (err) {
        setLoading(false);
        setError(err.message);
        
    }
        
    }
    useEffect(() => {
      fetchProfile();
    }, [query])
    

    function search (){
        setQuery(userName)
    }
   
  return (
    
    <div className="profile-finder-container">
        <div className="title">
            GitHub Profile Finder 
        </div>
      {/* Search Box */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Enter GitHub Username"
          value={userName}
         onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={search} className="search-button">Search</button>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={userData.avatar_url}// Placeholder avatar, you’ll update this dynamically
            alt="Profile Avatar"
            className="profile-avatar"
          />
          <div className="profile-info">
            <h2 className="profile-username">{userData.name}</h2>
            <p className="profile-join-date">Joined: {userData.created_at}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="profile-stats">
          <div className="stats-item">
            <h3>Public Repos</h3>
            <p>{userData.public_repos
}</p> {/* Placeholder, you’ll replace this with actual API data */}
          </div>
          <div className="stats-item">
            <h3>Followers</h3>
            <p>{userData.followers}</p> {/* Placeholder */}
          </div>
          <div className="stats-item">
            <h3>Following</h3>
            <p>{userData.following}</p> {/* Placeholder */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHub;