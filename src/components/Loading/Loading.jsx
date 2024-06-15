import React from 'react';
import './Loading.css'; 

function Loading() {
  return (
    <div className="loader-container">
      <div className="loader">
        <img src="https://media4.giphy.com/media/ycfHiJV6WZnQDFjSWH/200w.webp?cid=ecf05e47b6r5za8u0sa9khb01fi8iifs9bqj5tquz9i0z9ek&ep=v1_gifs_related&rid=200w.webp&ct=g" alt="loading" className="loading-image" />
      </div>
    </div>
  );
}

export default Loading;