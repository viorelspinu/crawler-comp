import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RaceEventType } from '../model/race-event-type';
import { Tournament } from '../model/tournament';
import { ConfigurationService } from './configuration.service';
import { catchError, map, tap } from 'rxjs/operators';
import { PilotRaceEvent } from '../model/pilot-race-event';
import { PilotTournamentResults } from '../model/pilot-tournament-results';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  tournamentsUrl = '/api/tournament';
  activeTournamentsUrl = '/api/tournament/active';
  resultsUrl = '/api/tournament/results';

  tournamentAdminCounter = 0;
  activeTournament: Tournament;

  isAdmin() {
    return this.tournamentAdminCounter > 1;
  }

  incAdminCounter(): void {
    this.tournamentAdminCounter++;
  }

  constructor(
    public http: HttpClient,
    public configurationService: ConfigurationService
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

  getTournament(id: number): Observable<Tournament> {
    return this.http.get<Tournament>(this.tournamentsUrl + '/' + id);
  }

  getPilotTournamentEvents(
    pilotId: number
  ): Observable<PilotTournamentResults> {
    return this.http.get<PilotTournamentResults>(
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
