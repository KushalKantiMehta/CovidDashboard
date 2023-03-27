import React, { useEffect } from 'react'
import { getDataWorld } from '../redux/actions/actions'
const World = () => {
  const world = useSelector((state) => state.world)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDataWorld())
  }, [])
  console.log(world)
  return <div>{world}</div>
}

export default World
