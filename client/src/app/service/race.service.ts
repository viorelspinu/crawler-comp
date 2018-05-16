import { Injectable } from '@angular/core';
import { RaceEventType } from '../model/race-event-type';
import { RaceEvent } from '../model/race-event';
import { Pilot } from '../model/pilot';
import { RaceEventService } from './race-event.service';
import { PilotService } from './pilot.service';
import { TournamentService } from './tournament.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  raceEvents: RaceEvent[] = [];
  points = 0;
  activePilot: Pilot;
  raceIndex = 0;

  raceUrl = '/api/race';

  constructor(
    public raceEventService: RaceEventService,
    public tournamentService: TournamentService,
    public http: HttpClient,
    public configurationService: ConfigurationService,
    public pilotService: PilotService,
    public router: Router
  ) {
    this.raceUrl = this.configurationService.baseURL + this.raceUrl;
  }

  addRaceEvent(raceEvent: RaceEvent): void {
    this.raceEvents.push(raceEvent);
    this.points = this.points + raceEvent.points;

    this.raceEventService
      .saveRaceEvent(
        raceEvent.seconds,
        raceEvent.eventTypeId,
        this.activePilot.id,
        this.tournamentService.activeTournament.id,
        this.activePilot.lastRaceIndex
      )
      .subscribe();
  }

  removeLastRaceEvent(): void {
    if (this.raceEvents.length > 0) {
      const lastRaceEvent = this.raceEvents.pop();
      this.points = this.points - lastRaceEvent.points;
    }
  }

  startRaceForPilot(pilotId: number): void {
    this.pilotService.getPilotById(pilotId).subscribe(pilot => {
      this.activePilot = pilot;
      this.activePilot.lastRaceIndex = this.activePilot.lastRaceIndex + 1;
      this.pilotService
        .updatePilotTryCount(
          this.activePilot.id,
          this.activePilot.lastRaceIndex
        )
        .subscribe();
      this.raceEvents = [];
      this.points = 0;
      this.router.navigateByUrl('/race');
    });
  }
}
