import React, { useState, useEffect } from 'react'
import './LoadingModal.css'

function LoadingModal() {

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 4000); // 5 seconds

    return () => clearTimeout(timer); // cleanup in case component unmounts
  }, []);

  return (
    <div className="modal-container loading" >
      <span class="loader"></span>
      {showMessage && <p>Please allow 1-2 minutes, backend is booting up!</p>}
    </div>
  )
}

export default LoadingModal