import { Component, OnInit } from '@angular/core';
import { RaceService } from '../race.service';
import { RaceEventType } from '../race-event-type';
import { RaceEventService } from '../race-event.service';
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
    private raceEventService: RaceEventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (!this.raceService.activePilot) {
      this.router.navigateByUrl('/tournament');
    }
  }

  addRaceEvent(id: number, points: number, name: string): void {
    this.raceService.addRaceEvent(new RaceEventType(id, points, name));
  }

  removeLastRaceEvent(): void {
    this.raceService.removeLastRaceEvent();
  }

  finishRace(): void {
    this.router.navigateByUrl('/tournament');
  }
}
