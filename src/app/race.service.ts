import { Injectable } from '@angular/core';
import { Mistake } from './mistake';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  mistakes: Mistake[] = [];
  missPoints: number = 0;

  constructor() { }

  addMistake(mistake: Mistake) {
    this.mistakes.push(mistake);
    this.missPoints = this.missPoints + mistake.points;
  }

  removeLastMistake(){
    let lastMistake = this.mistakes.pop();
    this.missPoints = this.missPoints - lastMistake.points;
  }
}