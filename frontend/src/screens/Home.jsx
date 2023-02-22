import React from 'react'
import './Home.styles.css'
const Home = () => {
  return (
    <div className='home'>
      <div className='homeContent'>
        <div className='basicDetails'> some basic details</div>
        <div className='indiaMap'>India chart map</div>
      </div>
      <div className='homeTable'>
        <div style={{ backgroundColor: 'cyan', height: '100%' }}>
          Table of covid data
        </div>
      </div>
    </div>
  )
}

export default Home
