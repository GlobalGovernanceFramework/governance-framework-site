// src/lib/stores/expandedSections.js
import { writable } from 'svelte/store';

// Initialize from localStorage if available, otherwise default to an empty object
const initialExpandedSections = typeof localStorage !== 'undefined'
  ? JSON.parse(localStorage.getItem('expandedSections') || '{}')
  : {};

export const expandedSections = writable(initialExpandedSections);

// Debounced localStorage saving with batching
let saveTimeout;
let pendingValue = null;
const SAVE_DELAY = 250; // Reduced delay for better responsiveness

function debouncedSave(value) {
  if (typeof localStorage === 'undefined') return;
  
  // Store the latest value
  pendingValue = value;
  
  // Clear existing timeout
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }
  
  // Set new timeout with the latest value
  saveTimeout = setTimeout(() => {
    if (pendingValue !== null) {
      try {
        localStorage.setItem('expandedSections', JSON.stringify(pendingValue));
        pendingValue = null;
      } catch (error) {
        console.warn('Failed to save expanded sections to localStorage:', error);
      }
    }
  }, SAVE_DELAY);
}

// Subscribe to changes and save to localStorage with debouncing
expandedSections.subscribe(value => {
  debouncedSave(value);
});
