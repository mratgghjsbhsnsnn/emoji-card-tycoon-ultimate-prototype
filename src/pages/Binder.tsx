import React from 'react'
import { usePlayer } from './playerStore'
import { SAMPLE_CARDS } from '../data/cards'

export default function Binder(){
  const player = usePlayer(s=>s.player)
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Binder</h2>
      <div className="text-sm text-gray-500 mb-3">Collected: {player.inventory.length}</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {player.inventory.map(i=>{
          const def = SAMPLE_CARDS.find(c=>c.id===i.cardId)
          return (
            <div key={i.instanceId} className="p-3 bg-white border rounded-3xl flex flex-col items-center">
              <div style={{fontSize:32}}>{def?.emoji}</div>
              <div className="text-sm font-medium mt-2">{def?.name}</div>
              <div className="text-xs text-gray-500">{def?.rarity}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
