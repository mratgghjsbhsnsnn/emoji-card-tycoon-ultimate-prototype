import React, { useState } from 'react'
import { PACKS } from '../data/packs'
import { usePlayer } from './playerStore'
import { CardDef, CardInstance } from '../data/types'
import { SAMPLE_CARDS } from '../data/cards'
import { useUI } from '../state/store'

export default function OpenPack(){
  const player = usePlayer(s=>s.player)
  const openPack = usePlayer(s=>s.openPack)
  const [opening, setOpening] = useState<CardInstance[] | null>(null)
  const [revealed, setRevealed] = useState<Record<string,boolean>>({})
  const setPage = useUI(s=>s.setPage)

  async function buyAndOpen(packId:string){
    // if player has no pack, try buy
    if((player.packs[packId]||0) <= 0){
      const pack = PACKS.find(p=>p.id===packId)
      if(pack && player.coins >= pack.price){
        // simple buy
      }
    }
    setOpening(null)
    const drawn = await openPack(packId)
    setRevealed({})
    setOpening(drawn)
  }

  function reveal(i:number){
    if(!opening) return
    const inst = opening[i]
    setRevealed(r=>({ ...r, [inst.instanceId]: true }))
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Open Packs</h2>
      <div className="flex gap-3 overflow-auto mb-4">
        {PACKS.map(p=> (
          <div key={p.id} className="p-3 bg-white border rounded-3xl">
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-gray-500">{p.numCards} cards</div>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-lg font-bold">{p.price}¢</div>
              <button onClick={()=>buyAndOpen(p.id)} className="bg-black text-white px-3 py-1 rounded-full">Open</button>
            </div>
            <div className="text-xs mt-2">Owned: {player.packs[p.id]||0}</div>
          </div>
        ))}
      </div>

      {opening && (
        <div className="grid grid-cols-3 gap-3">
          {opening.map((c,idx)=>{
            const def = SAMPLE_CARDS.find(x=>x.id===c.cardId)
            const isRevealed = revealed[c.instanceId]
            return (
              <div key={c.instanceId} className="p-3">
                <div className={`relative w-32 h-44 perspective`}> 
                  <div className={`absolute inset-0 transition-transform duration-200 ${isRevealed? 'rotate-y-180':''}`}>
                    {/* back */}
                    <div className="card-back w-full h-full flex items-center justify-center">?</div>
                  </div>
                  <div className={`absolute inset-0 transition-opacity ${isRevealed? 'opacity-100':'opacity-0'}`}>
                    {/* front */}
                    <div className="card-front w-full h-full flex flex-col items-center justify-center">
                      <div style={{fontSize:32}}>{def?.emoji}</div>
                      <div className="mt-2 text-sm font-semibold text-center">{def?.name}</div>
                      <div className="text-xs text-gray-500">{def?.rarity}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <button onClick={()=>reveal(idx)} className="px-2 py-1 bg-gray-100 rounded-full text-sm">Reveal</button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="mt-4">
        <button onClick={()=>setPage('home')} className="text-sm text-gray-600">Back</button>
      </div>
    </div>
  )
}
