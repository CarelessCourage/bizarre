type CardTypes = 'tool' | 'weapon' | 'armor' | 'spell' | 'friend'

export interface Card {
  id: string
  name: string
  stats: CardStats
  level: number
  maxLevel: number
  description: string
  rarity: number
  baseCost: number
  cost: number
  type: CardTypes
}

export interface CardStats {
  attack: number
  shield: number
  heal: number
  burn: number
  poison: number
  actionRate: number // in seconds
}

export interface Player extends Character {
  money: number
  interest: number
  endurance: number
  inventory: Card[]
  experience: number
  level: number
}

export interface Character {
  id: string
  name: string
  health: number
  maxHealth: number
  deck: Card[]
  skills: Skills[]
}

export interface Skills {
  name: string
  description: string
  effect: () => void
}

export interface GameState {
  currentDay: number
  currentHour: number
  player: Player
  availableNPCs: Character[]
  shopInventory: Card[]
  maxEndurance: number
}
