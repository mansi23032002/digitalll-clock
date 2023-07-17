import React from 'react';

const Alert = ({ message, onClose }) => {
  return (
    <div className="alert">
      <div className="alert-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Alert;
