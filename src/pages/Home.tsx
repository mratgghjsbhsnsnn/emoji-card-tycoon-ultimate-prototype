import React from 'react'
import { useUI } from '../state/store'
import { PACKS } from '../data/packs'
import PackCard from '../components/PackCard'
import { usePlayer } from './playerStore'

export default function Home(){
  const setPage = useUI(s => s.setPage)
  const player = usePlayer(s=>s.player)
  const buy = usePlayer(s=>s.buyPack)

  return (
    <div>
      <header className="mb-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500">Coins</div>
            <div className="text-2xl font-bold">{player.coins}¢</div>
          </div>
          <div>
            <button onClick={()=>setPage('open')} className="bg-black text-white px-4 py-2 rounded-full">Open Pack</button>
          </div>
        </div>
      </header>

      <section>
        <h3 className="text-lg font-semibold mb-2">Featured Packs</h3>
        <div className="flex gap-3 overflow-auto">
          {PACKS.map(p=> <PackCard key={p.id} pack={p} onBuy={(pack)=>buy(pack)} />)}
        </div>
      </section>
    </div>
  )
}
