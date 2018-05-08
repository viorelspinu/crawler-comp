import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pilot } from './pilot';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class PilotService {
  private pilotsUrl = '/api/pilot';

  constructor(
    private http: HttpClient,
    private configurationService: ConfigurationService
  ) {
    this.pilotsUrl = configurationService.baseURL + this.pilotsUrl;
  }

  getPilots(): Observable<Pilot[]> {
    return this.http.get<Pilot[]>(this.pilotsUrl);
  }

  savePilot(pilotName: string, tournamentId: number): Observable<Pilot[]> {
    return this.http.post<Pilot[]>(this.pilotsUrl, {
      pilotName: pilotName,
      tournamentId: tournamentId
    });
  }
}
