import React from 'react'
import PAGENOTFOUND from '../assets/PAGENOTFOUND.svg'
import './NotFound.styles.css'
const NotFound = () => {
  return (
    <div className='notFound'>
      <img src={PAGENOTFOUND} alt='Page Not Found' />
    </div>
  )
}

export default NotFound
