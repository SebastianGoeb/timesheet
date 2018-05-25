import {Equatable} from './equatable';

export function safeEquals(a: Equatable, b: Equatable): boolean {
  if (a === b) {
    return true;
  }

  if (a != undefined) {
    return a.equals(b);
  }

  return false;
}
