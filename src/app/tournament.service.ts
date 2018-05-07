import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mistake } from './mistake';
import { Tournament } from './tournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private tournamentsUrl = '/assets/tournaments.json';
  private activeTournamentsUrl = '/assets/active-tournament.json';


  constructor(private http: HttpClient) {}

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.tournamentsUrl);
  }

  getActiveTournament(): Observable<Tournament> {
    return this.http.get<Tournament>(this.activeTournamentsUrl);
  }
}
