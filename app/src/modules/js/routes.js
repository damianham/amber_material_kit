import React from 'react'
import {Home} from '../../views/home/js/home'

import LandingPage from "views/LandingPage/LandingPage.jsx"
import Components from "views/Components/Components.jsx"
import ProfilePage from "views/ProfilePage/ProfilePage.jsx"
import LoginPage from "views/LoginPage/LoginPage.jsx"

let routes = []

export default routes

routes.push({
  path: '/',
  exact: true,
  type: 'index',
  name: 'Components',
  main: Components,
  icon: 'Home'
})

routes.push({
  path: '/landing-page',
  exact: true,
  type: 'index',
  name: 'Landing Example',
  main: LandingPage,
  icon: 'Info'
})

// append routes
