import { useEffect, useState } from "react";
import "./image.css";

export default function ImageSlider({ url, limit = 5 }) {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) return;

    async function fetchImages() {
      try {
        setLoading(true);
        const res = await fetch(`${url}?limit=${limit}`);
        const data = await res.json();
        setImages(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }

    fetchImages();
  }, [url, limit]);

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;
  if (!images.length) return <p>No images found.</p>;

  return (
    <div className="container">
        <div className="slider">
      <img
        src={images[currentIndex].download_url}
        alt="slider"
        className="slider-image"
      />

      <div className="buttons">
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>Next</button>
      </div>

      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
    </div>
  );
}