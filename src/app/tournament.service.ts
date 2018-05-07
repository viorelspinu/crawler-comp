import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mistake } from './mistake';
import { Tournament } from './tournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private tournamentsUrl = '';

  constructor(private http: HttpClient) { 

  }

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.tournamentsUrl);
  }
}
