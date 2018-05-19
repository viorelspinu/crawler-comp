import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pilot } from '../model/pilot';
import { ConfigurationService } from './configuration.service';
import { TournamentService } from './tournament.service';

@Injectable({
  providedIn: 'root'
})
export class PilotService {
  pilotsUrl = '/api/pilot';

  constructor(
    public http: HttpClient,
    public configurationService: ConfigurationService,
    public tournamentService: TournamentService
  ) {
    this.pilotsUrl = configurationService.baseURL + this.pilotsUrl;
  }

  getPilots(tournamentId: number, sortType: number): Observable<Pilot[]> {
    let url = this.pilotsUrl + '?tournamentId=' + tournamentId;
    if (sortType === 1) {
      url = url + "&sortOnScore=1";
    }
    return this.http.get<Pilot[]>(
      url
    );
  }

  getPilotById(pilotId: number): Observable<Pilot> {
    return this.http.get<Pilot>(this.pilotsUrl + '/' + pilotId);
  }

  savePilot(pilotName: string, tournamentId: number): Observable<number> {
    return this.http.post<number>(this.pilotsUrl, {
      pilotName: pilotName,
      tournamentId: tournamentId
    });
  }
}
