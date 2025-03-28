import { ref, computed } from 'vue';
import type { GameState, Player, Card, NPC } from '../types/game';

const initialPlayer: Player = {
  health: 100,
  maxHealth: 100,
  money: 50,
  endurance: 3,
  maxEndurance: 3,
  deck: [],
  experience: 0,
  level: 1,
};

export const useGameStore = () => {
  const gameState = ref<GameState>({
    currentDay: 1,
    currentHour: 1,
    player: { ...initialPlayer },
    availableNPCs: [],
    shopInventory: [],
  });

  const isGameOver = computed(() => gameState.value.player.endurance <= 0);
  
  const startNewGame = () => {
    gameState.value = {
      currentDay: 1,
      currentHour: 1,
      player: { ...initialPlayer },
      availableNPCs: generateInitialNPCs(),
      shopInventory: generateShopInventory(),
    };
  };

  const advanceHour = () => {
    if (gameState.value.currentHour >= 3) {
      // Time for battle
      gameState.value.currentHour = 1;
      gameState.value.currentDay++;
      gameState.value.player.money += 25; // Base money increase per day
    } else {
      gameState.value.currentHour++;
    }
  };

  const generateInitialNPCs = (): NPC[] => {
    // Placeholder - implement NPC generation logic
    return [];
  };

  const generateShopInventory = (): Card[] => {
    // Placeholder - implement shop inventory generation logic
    return [];
  };

  return {
    gameState,
    isGameOver,
    startNewGame,
    advanceHour,
  };
};