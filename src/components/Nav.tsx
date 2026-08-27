import React from 'react'
import { useUI } from '../state/store'

export default function Nav(){
  const setPage = useUI(s=>s.setPage)
  const page = useUI(s=>s.page)
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-3xl px-4 py-2 flex gap-4">
      <button aria-label="Home" onClick={()=>setPage('home')} className={`px-4 py-2 rounded-full ${page==='home'? 'bg-gray-100':''}`}>Home</button>
      <button aria-label="Open" onClick={()=>setPage('open')} className={`px-4 py-2 rounded-full ${page==='open'? 'bg-gray-100':''}`}>Open</button>
      <button aria-label="Binder" onClick={()=>setPage('binder')} className={`px-4 py-2 rounded-full ${page==='binder'? 'bg-gray-100':''}`}>Binder</button>
    </div>
  )
}
