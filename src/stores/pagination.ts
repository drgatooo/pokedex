import { atom } from 'nanostores';

export const offset = atom(0);

export function increment() {
  offset.set(offset.get() + 1);
}

export function decrement() {
  offset.set(offset.get() - 1);
}
