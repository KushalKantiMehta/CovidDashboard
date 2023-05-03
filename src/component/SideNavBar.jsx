import React from 'react'
import SideNav, {
  Toggle,
  NavItem,
  NavIcon,
  NavText,
} from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import './SideNavBar.styles.css'
import { useNavigate } from 'react-router'
import indiaIcon from '../assets/india.svg'

const SideNavBar = () => {
  const naviagate = useNavigate()
  return (
    <SideNav
      onSelect={(selected) => {
        naviagate('/' + selected)
      }}
      className='sideNavBar'
    >
      <Toggle />
      <SideNav.Nav defaultSelected=''>
        <NavItem eventKey=''>
          <NavIcon
            style={{
              padding: '8px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img src={indiaIcon} alt='india-icon' />
          </NavIcon>
          <NavText>India</NavText>
        </NavItem>
        <NavItem eventKey='world'>
          <NavIcon>
            <i
              className='fa-solid fa-earth-asia'
              style={{ fontSize: '1.5em' }}
            />
          </NavIcon>
          <NavText>World</NavText>
        </NavItem>
        <NavItem eventKey='aboutus'>
          <NavIcon>
            <i
              className='fa-solid fa-circle-info'
              style={{ fontSize: '1.5em' }}
            />
          </NavIcon>
          <NavText>About Us</NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  )
}

export default SideNavBar
