import create from 'zustand'
import { CardInstance } from '../data/types'
import { SAMPLE_CARDS } from '../data/cards'
import { PACKS } from '../data/packs'
import { drawRarityForPack } from '../lib/gacha'
import { saveState, loadState } from '../lib/save'

function uid(){return Math.random().toString(36).slice(2,9)}

interface Player{
  username:string
  coins:number
  dust:number
  luck:number
  level:number
  xp:number
  inventory:CardInstance[]
  packs:Record<string,number>
  stats:any
}

interface PlayerStore{ player:Player; buyPack:(p:any)=>void; openPack:(packId:string)=>Promise<CardInstance[]>; load:()=>void }

export const usePlayer = create<PlayerStore>((set,get)=>({
  player: {
    username:'Player', coins:5000, dust:0, luck:0, level:1, xp:0,
    inventory:[], packs: {'emotion_pack':1}, stats:{packsOpened:0,pity:0}
  },
  buyPack:(p)=>{
    set(state=>{
      if(state.player.coins < p.price) return state
      state.player.coins -= p.price
      state.player.packs[p.id] = (state.player.packs[p.id] || 0) + 1
      saveState({player:state.player})
      return state
    })
  },
  openPack: async (packId)=>{
    const state = get()
    const pack = PACKS.find(x=>x.id===packId)
    if(!pack) return []
    if((state.player.packs[packId]||0) <= 0) return []
    // consume pack
    set(s=>{ s.player.packs[packId] = (s.player.packs[packId]||0) - 1; return s })
    const drawn:CardInstance[] = []
    for(let i=0;i<pack.numCards;i++){
      const rarity = drawRarityForPack(pack.dropRates, state.player.luck, state.player.stats.pity)
      // pick a random card from SAMPLE_CARDS matching rarity, otherwise fallback
      const pool = SAMPLE_CARDS.filter(c=>c.rarity===rarity)
      const card = pool.length? pool[Math.floor(Math.random()*pool.length)] : SAMPLE_CARDS[Math.floor(Math.random()*SAMPLE_CARDS.length)]
      const inst:CardInstance = { instanceId: uid(), cardId: card.id, serialNumber: Date.now(), condition:'good', dateAcquired:Date.now() }
      drawn.push(inst)
    }
    // update inventory
    set(s=>{ s.player.inventory.push(...drawn); s.player.stats.packsOpened += 1; s.player.stats.pity += 1; saveState({player:s.player}); return s })
    return drawn
  },
  load:()=>{
    const d = loadState()
    if(d && d.player) set(()=>({player:d.player}))
  }
}))
