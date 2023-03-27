import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataWorld } from '../redux/actions/actions'
const World = () => {
  const world = useSelector((state) => state.world)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDataWorld())
  })
  console.log(world)
  return <div>{}</div>
}

export default World
