import React from 'react';
import { Header } from './'

const Layout = ({ children }) => {
    // children will render whatever is in Layout
  return (
   <>
    <Header />
    {children}
   </>
  )
}

export default Layout