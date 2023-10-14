import React from 'react'
import Link from 'react'
import veryNice from '../assets/PWD_logo_404.png'

const PageNotFound = () => {
  return (
    <div>
        <h1>Oops! You seem to be lost.</h1>
        <h1>404 Page Not Found</h1>
        <img src={veryNice} alt="You broke it!"></img>
    </div>
  )
}

export default PageNotFound