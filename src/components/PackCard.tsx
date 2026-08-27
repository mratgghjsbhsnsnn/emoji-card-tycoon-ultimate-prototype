import React from 'react'
import { PackDef } from '../data/types'

export default function PackCard({pack, onBuy}:{pack:PackDef, onBuy:(p:PackDef)=>void}){
  return (
    <div className="p-4 bg-white shadow rounded-3xl border" style={{minWidth:220}}>
      <div className="font-semibold">{pack.name}</div>
      <div className="text-sm text-gray-500">{pack.numCards} cards</div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-lg font-bold">{pack.price}¢</div>
        <button onClick={()=>onBuy(pack)} className="bg-black text-white px-3 py-1 rounded-full">Buy</button>
      </div>
    </div>
  )
}
