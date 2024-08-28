import React from 'react'
import Navbar from '../components/Navbar'
import { connect } from 'react-redux'
import { checkAuth, load_user, googleAuthenticate } from '../actions/auth'

const Layout = (props) => {

  return (
    <div>
          <Navbar></Navbar>
          {props.children}
    </div>
  )
}

export default connect(null, {checkAuth, load_user, googleAuthenticate})(Layout);
