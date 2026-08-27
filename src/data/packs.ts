import { PackDef } from './types'

export const PACKS: PackDef[] = [
  {
    id:'emotion_pack', name:'Emotion Pack', price:500, numCards:3,
    dropRates:{ common:0.65, uncommon:0.25, rare:0.09, epic:0.009, legendary:0.0009, mythic:0.0001, ultimate:0 },
  },
  { id:'ultra_pack', name:'Ultra Pack', price:5000, numCards:5, dropRates:{ common:0.35, uncommon:0.30, rare:0.20, epic:0.10, legendary:0.03, mythic:0.015, ultimate:0.0005 }, featured:['money_world_001'] }
]
