import { Component, OnInit } from '@angular/core';
import { RaceService } from '../race.service';
import { Mistake } from '../mistake';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {

  constructor(private raceService: RaceService) { }

  ngOnInit() {
  }

  addMistake(points: number, type: string): void {
    this.raceService.addMistake(new Mistake(points, type));
  }

  removeLastMistake():void{
    this.raceService.removeLastMistake();
  }

}
