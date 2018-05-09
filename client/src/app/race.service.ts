import { Injectable } from '@angular/core';
import { RaceEventType } from './race-event-type';
import { Pilot } from './pilot';
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
  raceEvents: RaceEventType[] = [];
  points = 0;
  activePilot: Pilot;
  raceIndex = 0;

  private raceUrl = '/api/race';

  constructor(
    private raceEventService: RaceEventService,
    private tournamentService: TournamentService,
    private http: HttpClient,
    private configurationService: ConfigurationService,
    private pilotService: PilotService,
    private router: Router
  ) {
    this.raceUrl = this.configurationService.baseURL + this.raceUrl;
  }

  addRaceEvent(raceEvent: RaceEventType): void {
    this.raceEvents.push(raceEvent);
    this.points = this.points + raceEvent.points;

    this.raceEventService
      .saveRaceEvent(
        raceEvent.id,
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
      this.activePilot = pilot[0];
      this.activePilot.lastRaceIndex = this.activePilot.lastRaceIndex + 1;
      console.log(this.activePilot.lastRaceIndex);
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