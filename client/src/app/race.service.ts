import { Injectable } from '@angular/core';
import { RaceEventType } from './race-event-type';
import { Pilot } from './pilot';
import { MistakeService } from './mistake.service';
import { TournamentService } from './tournament.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  mistakes: RaceEventType[] = [];
  mistakePoints = 0;
  activePilot: Pilot;
  raceIndex = 0;

  private raceUrl = '/api/race';

  constructor(
    private mistakeService: MistakeService,
    private tournamentService: TournamentService,
    private http: HttpClient,
    private configurationService: ConfigurationService
  ) {
    this.raceUrl = this.configurationService.baseURL + this.raceUrl;
  }

  addMistake(mistakeType: RaceEventType): void {
    this.mistakes.push(mistakeType);
    this.mistakePoints = this.mistakePoints + mistakeType.points;

    this.mistakeService
      .saveMistake(
        mistakeType.id,
        this.activePilot.id,
        this.tournamentService.activeTournament.id,
        this.activePilot.lastRaceIndex
      )
      .subscribe();
  }

  removeLastMistake(): void {
    if (this.mistakes.length > 0) {
      const lastMistake = this.mistakes.pop();
      this.mistakePoints = this.mistakePoints - lastMistake.points;
    }
  }
}
