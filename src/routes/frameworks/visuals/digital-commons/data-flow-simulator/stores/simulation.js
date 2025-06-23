// src/routes/frameworks/visuals/digital/data-flow-simulator/stores/simulation.js
import { writable } from 'svelte/store';

function createSimulationStore() {
  const initialState = {
    running: false,
    speed: 5, // 1-10 scale
    sovereigntyMode: true,
    stats: {
      transfers: 0,
      sovereigntyChecks: 0,
      efficiency: 95,
      startTime: null
    },
    packetSpeed: 3 // seconds per full animation
  };
  
  const { subscribe, set, update } = writable(initialState);
  
  return {
    subscribe,
    start: () => update(state => ({ ...state, running: true })),
    pause: () => update(state => ({ ...state, running: false })),
    reset: () => set(initialState),
    setSpeed: (speed) => update(state => ({ 
      ...state, 
      speed,
      packetSpeed: 6 - (speed * 0.3) // Adjust animation speed inversely
    })),
    setSovereigntyMode: (mode) => update(state => ({ ...state, sovereigntyMode: mode })),
    incrementTransfers: () => update(state => ({
      ...state, 
      stats: {
        ...state.stats,
        transfers: state.stats.transfers + 1
      }
    })),
    incrementSovereigntyChecks: () => update(state => ({
      ...state, 
      stats: {
        ...state.stats,
        sovereigntyChecks: state.stats.sovereigntyChecks + 1
      }
    })),
    updateEfficiency: (value) => update(state => ({
      ...state, 
      stats: {
        ...state.stats,
        efficiency: value
      }
    }))
  };
}

export const simulationStore = createSimulationStore();
