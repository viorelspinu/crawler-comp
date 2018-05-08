import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MistakeType } from './mistaketype';
import { Tournament } from './tournament';
import { ConfigurationService } from './configuration.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private tournamentsUrl = '/api/tournament';
  private activeTournamentsUrl = '/api/tournament/active';

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

  saveTournament(tournamentName: string): Observable<number> {
    return this.http.post<number>(this.tournamentsUrl, {
      tournamentName: tournamentName
    });
  }
}
