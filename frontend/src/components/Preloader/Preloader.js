import React from 'react'
import './Preloader.css'

const Preloader = ({ active }) => {
  return (
    <div className={`preloader ${active && "preloader_active"}`}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  )
};

export default Preloader
