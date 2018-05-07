import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pilot } from './pilot';

@Injectable({
  providedIn: 'root'
})
export class PilotService {
  private pilotsUrl = '/assets/pilots.json';

  constructor(private http: HttpClient) {}

  getPilots(): Observable<Pilot[]> {
    return this.http.get<Pilot[]>(this.pilotsUrl);
  }
}
