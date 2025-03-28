import { ref, computed } from 'vue'
import type { GameState, Player, Card, Character } from '../types/game'

const API_ENDPOINT =
  'https://kjart-m8sgm95y-eastus2.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2025-01-01-preview'
const API_KEY =
  'AZfdpy01OnBVOKsvgdSAXZ9WHYXA2xxAHtBhTcDWBhHcwHpOVWTqJQQJ99BCACHYHv6XJ3w3AAAAACOGwcq3' // Replace with your actual API key

async function getChatResponse() {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Replace with your actual model
        messages: [
          { role: 'system', content: 'You are an AI assistant.' },
          { role: 'user', content: 'Hello, how can you assist me today?' },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log(data)
    const aiMessage = data.choices[0].message.content
    console.log('AI Response:', aiMessage)
  } catch (error: any) {
    console.error('Error:', error.message)
  }
}
getChatResponse()

const defaultEndurance = 100

const initialPlayer: Player = {
  id: 'player',
  name: 'Bob',
  health: 100,
  maxHealth: 100,
  money: 50,
  interest: 5,
  endurance: defaultEndurance,
  deck: [],
  experience: 0,
  level: 1,
  inventory: [],
  skills: [],
}

export const useGameStore = () => {
  const gameState = ref<GameState>({
    currentDay: 1,
    currentHour: 1,
    player: initialPlayer,
    maxEndurance: defaultEndurance,
    availableNPCs: [],
    shopInventory: [],
  })

  const isGameOver = computed(() => gameState.value.player.endurance <= 0)

  const startNewGame = () => {
    gameState.value = {
      currentDay: 1,
      currentHour: 1,
      maxEndurance: defaultEndurance,
      player: initialPlayer,
      availableNPCs: generateInitialNPCs(),
      shopInventory: generateShopInventory(),
    }
  }

  const advanceHour = () => {
    gameState.value.player.money += gameState.value.player.interest
    // Time for battle?
    if (gameState.value.currentHour >= 3) {
      gameState.value.currentHour = 1
      gameState.value.currentDay++
    } else {
      gameState.value.currentHour++
    }
  }

  const generateInitialNPCs = (): Character[] => {
    // Placeholder - implement NPC generation logic
    return []
  }

  const generateShopInventory = (): Card[] => {
    // Placeholder - implement shop inventory generation logic
    return []
  }

  return {
    gameState,
    isGameOver,
    startNewGame,
    advanceHour,
  }
}
