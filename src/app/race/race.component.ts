import { Component, OnInit } from '@angular/core';
import { RaceService } from '../race.service';
import { Mistake } from '../mistake';
import { MistakeService } from '../mistake.service';


@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {


  constructor(private raceService: RaceService, private mistakeService: MistakeService) { }


  ngOnInit() {
  }

  addMistake(id: number, points: number, name: string): void {
    this.raceService.addMistake(new Mistake(id, points, name));
  }

  removeLastMistake(): void {
    this.raceService.removeLastMistake();
  }

}
