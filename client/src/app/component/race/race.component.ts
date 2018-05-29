import { Component, OnInit, OnDestroy } from '@angular/core';
import { RaceService } from '../../service/race.service';
import { TournamentService } from '../../service/tournament.service';
import { RaceEventType } from '../../model/race-event-type';
import { RaceEvent } from '../../model/race-event';
import { RaceEventService } from '../../service/race-event.service';
import { Pilot } from '../../model/pilot';
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
  raceStarted = false;
  raceFinished = false;

  constructor(
    public raceService: RaceService,
    public raceEventService: RaceEventService,
    public tournamentService: TournamentService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (!this.raceService.activePilot) {
      this.router.navigateByUrl('/tournament');
    }
  }

  addRaceEvent(eventTypeId: number, points: number, name: string): void {
    this.raceService.addRaceEvent(
      new RaceEvent(eventTypeId, this.raceService.raceDuration, points, name)
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
    this.clockSubscription = this.clock$.subscribe(
      t => (this.raceService.raceDuration = t)
    );
    this.raceStarted = true;
    this.raceFinished = false;
    this.raceService.startRaceForActivePilot();
  }

  finishRace(): void {
    if (!this.raceStarted) {
      return;
    }
    if (this.raceFinished) {
      return;
    }

    this.unsubscribeClock();
    this.raceStarted = true;
    this.raceFinished = true;

    if (this.raceService.raceDuration > 180) {
      const timeOverEvent = this.raceEventService.raceEventTypes.find(event => {
        return event.code === 'TIME_EVENT';
      });
      this.addRaceEvent(
        timeOverEvent.id,
        timeOverEvent.points,
        timeOverEvent.name
      );
    }
    this.raceService.endRaceForActivePilot();
  }

  deleteRace(): void {
    this.raceService.deleteCurrentRace().subscribe(raceId => {
      this.router.navigateByUrl(
        '/tournament/' + this.tournamentService.activeTournament.id
      );
    });
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
