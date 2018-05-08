import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pilot } from './pilot';
import { ConfigurationService } from './configuration.service';
import { RaceService } from './race.service';
import { TournamentService } from './tournament.service';

@Injectable({
  providedIn: 'root'
})
export class PilotService {
  private pilotsUrl = '/api/pilot';

  constructor(
    private http: HttpClient,
    private configurationService: ConfigurationService,
    private raceService: RaceService,
    private tournamentService: TournamentService
  ) {
    this.pilotsUrl = configurationService.baseURL + this.pilotsUrl;
  }

  getPilots(tournamentId: number): Observable<Pilot[]> {
    return this.http.get<Pilot[]>(
      this.pilotsUrl + '?tournamentId=' + tournamentId
    );
  }

  getPilotById(pilotId: number): Observable<Pilot[]> {
    return this.http.get<Pilot[]>(this.pilotsUrl + '/' + pilotId);
  }

  savePilot(pilotName: string, tournamentId: number): Observable<number> {
    return this.http.post<number>(this.pilotsUrl, {
      pilotName: pilotName,
      tournamentId: tournamentId
    });
  }

  updatePilotTryCount(
    pilotId: number,
    lastRaceIndex: number
  ): Observable<number> {
    return this.http.patch<number>(this.pilotsUrl + '/' + pilotId, {
      lastRaceIndex: lastRaceIndex
    });
  }
}
