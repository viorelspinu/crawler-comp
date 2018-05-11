import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RaceEventType } from './race-event-type';
import { Tournament } from './tournament';
import { ConfigurationService } from './configuration.service';
import { catchError, map, tap } from 'rxjs/operators';
import { PilotRaceEvent } from './pilot-race-event';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private tournamentsUrl = '/api/tournament';
  private activeTournamentsUrl = '/api/tournament/active';
  private resultsUrl = '/api/tournament/results';

  activeTournament: Tournament;
  stillAddingPilots = true;

  constructor(
    private http: HttpClient,
    private configurationService: ConfigurationService
  ) {
    this.tournamentsUrl =
      this.configurationService.baseURL + this.tournamentsUrl;
    this.activeTournamentsUrl =
      this.configurationService.baseURL + this.activeTournamentsUrl;
    this.resultsUrl = this.configurationService.baseURL + this.resultsUrl;
  }

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.tournamentsUrl);
  }

  getActiveTournament(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.activeTournamentsUrl).pipe(
      tap(t => {
        this.activeTournament = t[0];
      })
    );
  }

  getPilotTournamentEvents(pilotId: number): Observable<PilotRaceEvent[]> {
    return this.http.get<PilotRaceEvent[]>(
      this.resultsUrl + '?pilotId=' + pilotId
    );
  }

  saveTournament(tournamentName: string): Observable<number> {
    return this.http.post<number>(this.tournamentsUrl, {
      tournamentName: tournamentName
    });
  }

  endActiveTournament(): Observable<any> {
    return this.http.post(this.tournamentsUrl + '/end', {
      tournamentId: this.activeTournament.id
    });
  }
}
