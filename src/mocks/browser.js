// src/mocks/browser.js
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Starta MSW med handlers
export const worker = setupWorker(...handlers);
