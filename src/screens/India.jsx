import React from 'react'
import { useSelector } from 'react-redux'
const India = () => {
  const india = useSelector((state) => state.india)
  console.log(india)
  return <div>India</div>
}

export default India
