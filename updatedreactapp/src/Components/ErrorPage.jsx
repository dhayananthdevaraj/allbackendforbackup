// ErrorPage.js
import React from 'react';
import './ErrorPage.css'; // Import the CSS file

const ErrorPage = () => {
  return (
    <div className="container"> {/* Use className instead of style */}
      <h1 className="heading">Oops! Something Went Wrong</h1>
      <p>Please try again later.</p>
      <img
        src='./alert.png'
        alt='Error Alert'
        width={300}
        height={300}
        className="image" 
      />
    </div>
  );
};

export default ErrorPage;
