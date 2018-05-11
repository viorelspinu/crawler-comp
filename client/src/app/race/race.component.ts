import { Component, OnInit, OnDestroy } from '@angular/core';
import { RaceService } from '../race.service';
import { RaceEventType } from '../race-event-type';
import { RaceEvent } from '../race-event';
import { RaceEventService } from '../race-event.service';
import { Pilot } from '../pilot';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit, OnDestroy {
  clock$: Observable<number>;
  clockSubscription: Subscription;
  seconds = 0;
  raceStarted = false;

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

  addRaceEvent(eventTypeId: number, points: number, name: string): void {
    this.raceService.addRaceEvent(
      new RaceEvent(eventTypeId, this.seconds, points, name)
    );
  }

  removeLastRaceEvent(): void {
    this.raceService.removeLastRaceEvent();
  }

  startRace(): void {
    if (this.raceStarted) {
      return;
    }
    this.clock$ = timer(0, 1000);
    this.clockSubscription = this.clock$.subscribe(t => (this.seconds = t));
    this.raceStarted = true;
  }

  finishRace(): void {
    if (!this.raceStarted) {
      return;
    }
    this.unsubscribeClock();
    this.raceStarted = false;

    // this.router.navigateByUrl('/tournament');
  }

  ngOnDestroy(): void {
    this.unsubscribeClock();
  }

  unsubscribeClock(): void {
    if (this.clockSubscription) {
      this.clockSubscription.unsubscribe();
    }
  }
}
