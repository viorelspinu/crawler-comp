import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RaceEventType } from './race-event-type';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class RaceEventService {
  private raceEventTypeUrl = '/api/mistake-type';
  private mistakeUrl = '/api/mistake';

  raceEventTypes: RaceEventType[] = [];

  constructor(
    private http: HttpClient,
    private configurationService: ConfigurationService
  ) {
    this.raceEventTypeUrl =
      this.configurationService.baseURL + this.raceEventTypeUrl;
    this.mistakeUrl = this.configurationService.baseURL + this.mistakeUrl;
    this.initRaceEventTypes();
  }

  initRaceEventTypes(): void {
    this.http
      .get<RaceEventType[]>(this.raceEventTypeUrl)
      .subscribe(raceEventTypes => (this.raceEventTypes = raceEventTypes));
  }

  saveMistake(
    raceEventTypeId: number,
    pilotId: number,
    tournamentId: number,
    raceId: number
  ): Observable<number> {
    return this.http.post<number>(this.mistakeUrl, {
      raceEventTypeId: raceEventTypeId,
      tournamentId: tournamentId,
      pilotId: pilotId,
      raceId: raceId
    });
  }
}
