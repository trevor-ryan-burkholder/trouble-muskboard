import { SignalsSchema } from './schema';
import { signals as mock } from '../data/mock';
import type { Signal } from '../types';

const KEY = 'trouble.muskboard.signals';

export function loadSignals(): Signal[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return mock;
    const parsed = JSON.parse(raw);
    return SignalsSchema.parse(parsed);
  } catch {
    return mock;
  }
}

export function saveSignals(data: Signal[]) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
