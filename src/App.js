import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './component/Header'
import SideNavBar from './component/SideNavBar'
import NotFound from './screens/NotFound'
import AboutUs from './screens/AboutUs'
import Home from './screens/Home'
import World from './screens/World'
import India from './screens/India'
import { useDispatch } from 'react-redux'
import { getDataWorld, getDataIndia } from './redux/actions/actions'

function App() {
  const dispatch = useDispatch()
  dispatch(getDataWorld())
  dispatch(getDataIndia())
  return (
    <Router>
      <div className='App'>
        <SideNavBar />
        <div className='mainContent'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/world' element={<World />} exact />
            <Route path='/india' element={<India />} exact />
            <Route path='/aboutus' element={<AboutUs />} exact />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
