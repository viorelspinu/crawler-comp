import { Injectable } from '@angular/core';
import { Mistake } from './mistake';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  mistakes: Mistake[] = [];
  missPoints = 0;

  constructor() {}

  addMistake(mistake: Mistake): void {
    this.mistakes.push(mistake);
    this.missPoints = this.missPoints + mistake.points;
  }

  removeLastMistake(): void {
    if (this.mistakes.length > 0) {
      const lastMistake = this.mistakes.pop();
      this.missPoints = this.missPoints - lastMistake.points;
    }
  }
}
