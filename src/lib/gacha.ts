import { Rarity } from '../data/types'

const BASE_RATES: Record<Rarity,number> = {
  common:0.55, uncommon:0.25, rare:0.12, epic:0.05, legendary:0.02, mythic:0.0095, ultimate:0.0005
}

export function weightedPick(weights: Record<Rarity,number>): Rarity{
  const keys = Object.keys(weights) as Rarity[]
  const total = keys.reduce((s,k)=>s+weights[k],0)
  let r = Math.random()*total
  for(const k of keys){
    r -= weights[k]
    if(r<=0) return k
  }
  return keys[keys.length-1]
}

export function drawRarityForPack(packRates: Partial<Record<Rarity,number>>, luck=0, pity=0){
  const rates: Record<Rarity,number> = { ...BASE_RATES }
  // apply pack modifiers (multiply by packRates if provided)
  for(const k of Object.keys(packRates) as Rarity[]){
    rates[k] = (rates[k] || 0) * (packRates[k] ?? 1)
  }
  // small luck influence
  const luckFactor = Math.min(luck/1000, 0.02)
  rates.mythic += luckFactor * 0.6 * (rates.mythic + rates.ultimate)
  rates.legendary += luckFactor * 0.3 * rates.legendary
  rates.epic += luckFactor * 0.1 * rates.epic

  // simple pity: if pity large, bump rare
  if(pity >= 10) { rates.rare += 0.2; rates.common = Math.max(0, rates.common - 0.15) }
  if(pity >= 50) { rates.epic += 0.12; rates.common = Math.max(0, rates.common - 0.08) }
  if(pity >= 100){ rates.legendary += 0.05; rates.epic = Math.max(0, rates.epic - 0.02) }

  return weightedPick(rates)
}
