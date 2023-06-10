import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './component/Header'
import SideNavBar from './component/SideNavBar'
import NotFound from './screens/NotFound'
import AboutUs from './screens/AboutUs'
import Home from './screens/Home'
import State from './screens/State'
import { useDispatch } from 'react-redux'
import {
  getDataWorld,
  getDataIndia,
  getDataIndiaNew,
} from './redux/actions/actions'

function App() {
  const dispatch = useDispatch()
  dispatch(getDataWorld())
  dispatch(getDataIndia())
  dispatch(getDataIndiaNew())
  return (
    <Router>
      <div className='App'>
        <SideNavBar />
        <div className='mainContent'>
          <Header />
          <Routes>
            <Route path='/state/:id' element={<State />} exact />
            <Route path='/' element={<Home />} exact />
            <Route path='/aboutus' element={<AboutUs />} exact />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
