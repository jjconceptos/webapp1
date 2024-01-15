import React from 'react';

const Tooltip = ({ text, isVisible, top, left }) => {
  console.log('Tooltip Rendered:', isVisible, top, left);

  const tooltipStyle = {
    display: isVisible ? 'block' : 'none',
    position: 'absolute',
    top: top + 'px',
    left: left + 'px',
    backgroundColor: '#fff',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  };

  return <div style={tooltipStyle}>{text}</div>;
};

export default Tooltip;
