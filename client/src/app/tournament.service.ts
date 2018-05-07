import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mistake } from './mistake';
import { Tournament } from './tournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private tournamentsUrl = 'http://ec2-34-205-125-209.compute-1.amazonaws.com:8000/api/tournament';
  private activeTournamentsUrl = '/assets/active-tournament.json';


  constructor(private http: HttpClient) {}

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.tournamentsUrl);
  }

  getActiveTournament(): Observable<Tournament> {
    return this.http.get<Tournament>(this.activeTournamentsUrl);
  }
}
