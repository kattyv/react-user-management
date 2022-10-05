import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

export const LayoutAdmin: FC = () => {
  return (
    <>
        <Header />
        <main className="pg-main">
          <div className="container">
            <Outlet />
          </div>
        </main>
        <Footer />
    </>
  )
}
