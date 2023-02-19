import React from 'react'
import SideNav, {
  Toggle,
  NavItem,
  NavIcon,
  NavText,
} from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'

const SideNavBar = () => {
  return (
    <SideNav
      onSelect={(selected) => {
        console.log(selected)
      }}
    >
      <Toggle />
      <SideNav.Nav defaultSelected='home'>
        <NavItem>
          <NavIcon>
            <i className='fa fa-fw fa-home' style={{ fontSize: '1.5em' }} />
          </NavIcon>
          <NavText>Home</NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  )
}

export default SideNavBar
