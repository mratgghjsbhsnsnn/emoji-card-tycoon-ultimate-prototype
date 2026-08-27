export type Rarity = 'common'|'uncommon'|'rare'|'epic'|'legendary'|'mythic'|'ultimate'

export interface CardDef{
  id:string
  name:string
  emoji:string
  rarity:Rarity
  element:string
  hp:number
  power:number
  description:string
  basePrice:number
  demand:number
  category:string
  edition?:string
}

export interface CardInstance{
  instanceId:string
  cardId:string
  serialNumber:number
  condition:'mint'|'excellent'|'good'|'damaged'
  dateAcquired:number
}

export interface PackDef{
  id:string
  name:string
  price:number
  numCards:number
  dropRates:Partial<Record<Rarity,number>>
  featured?:string[]
}
