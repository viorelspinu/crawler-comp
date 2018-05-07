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

  closedTournaments : Tournament[];
  inProgressTournaments : Tournament[];

  constructor(private http: HttpClient) { 

  }

  initTournaments(): void {
    //this.loadMistakeTypes().subscribe(mistakes => this.mistakeTypes = mistakes);
  }

  loadTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.tournamentsUrl);
  }
}
