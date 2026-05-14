import React, { useState } from 'react'
import useFetch from "./index"
import styles from "./RickandMorty.module.css" // 1. IMPORT AS AN OBJECT

const RickandMorty = () => {
    const [input, setInput] = useState("");
    const { data, loading, error } = useFetch(`https://rickandmortyapi.com/api/character/?name=${input}`);

    return (
        <div className={styles.container}> {/* 2. USE STYLES OBJECT */}
            <h1 className={styles.title}>Rick and Morty Explorer</h1>
            
            <div className={styles.searchBox}>
                <input 
                    type="text" 
                    className={styles.searchInput}
                    value={input}
                    placeholder="Search for a character (e.g. Rick)..."
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>

            {loading && <p className={styles.statusMsg}>Searching the multiverse...</p>}
            
            {error && !loading && (
                <p className={styles.errorMsg}>
                    No characters found matching "{input}".
                </p>
            )}

            <div className={styles.characterGrid}>
                {input.trim() !== "" && data && data.results && data.results.length > 0 && error == "" &&
                    data.results.map((item) => (
                        <div key={item.id} className={styles.card}>
                            <img src={item.image} alt={item.name} className={styles.cardImg} />
                            <div className={styles.cardInfo}>
                                <h3>{item.name}</h3>
                                <p><span>Species:</span> {item.species}</p>
                                <p><span>Status:</span> {item.status}</p>
                                <p><span>Location:</span> {item.location.name}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RickandMorty