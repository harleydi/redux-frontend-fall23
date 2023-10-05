import React from 'react'
import {Outlet} from 'react-router-dom'

import NavBar from '../components/NavBar'

const Root = () => {
  return (
        <> {/* equivalent to <React.Fragment>*/}
            <NavBar />
            <Outlet />
        </>
    )
}

export default Root