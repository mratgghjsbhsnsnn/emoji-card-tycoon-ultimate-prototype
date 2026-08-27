import React from 'react'
import Home from './pages/Home'
import OpenPack from './pages/OpenPack'
import Binder from './pages/Binder'
import Nav from './components/Nav'
import { useUI } from './state/store'

export default function App(){
  const page = useUI(state => state.page)
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-4">
        {page === 'home' && <Home />}
        {page === 'open' && <OpenPack />}
        {page === 'binder' && <Binder />}
      </div>
      <Nav />
    </div>
  )
}
