import { Component, OnInit } from '@angular/core';
import { RaceService } from '../race.service';
import { RaceEventType } from '../race-event-type';
import { MistakeService } from '../mistake.service';
import { Pilot } from '../pilot';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {
  constructor(
    private raceService: RaceService,
    private mistakeService: MistakeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (!this.raceService.activePilot) {
      this.router.navigateByUrl('/tournament');
    }
  }

  addMistake(id: number, points: number, name: string): void {
    this.raceService.addMistake(new RaceEventType(id, points, name));
  }

  removeLastMistake(): void {
    this.raceService.removeLastMistake();
  }
}
