import React from 'react';

function SimpleModal({ isOpen, onClose, children }) {
  const onWrapperCLick = (event) => {
    if (event.target.classList.contains("simpleModal-wrapper")) onClose();
  };
  return (
    <>
      {isOpen && (
        <div className="simpleModal">
          <div className="simpleModal-wrapper" onClick={onWrapperCLick}>
            <div className="simpleModal-content">
              <button className="simpleModal-close-btn"
                onClick={() => onClose()}>
                X
              </button>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SimpleModal
