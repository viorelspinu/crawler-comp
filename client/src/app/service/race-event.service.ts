import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RaceEventType } from '../model/race-event-type';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class RaceEventService {
  raceEventTypeUrl = '/api/race-event-type';
  raceEventUrl = '/api/race-event';

  raceEventTypes: RaceEventType[] = [];

  constructor(
    public http: HttpClient,
    public configurationService: ConfigurationService
  ) {
    this.raceEventTypeUrl =
      this.configurationService.baseURL + this.raceEventTypeUrl;
    this.raceEventUrl = this.configurationService.baseURL + this.raceEventUrl;
    this.initRaceEventTypes();
  }

  initRaceEventTypes(): void {
    this.http
      .get<RaceEventType[]>(this.raceEventTypeUrl)
      .subscribe(raceEventTypes => (this.raceEventTypes = raceEventTypes));
  }

  saveRaceEvent(
    seconds: number,
    raceEventTypeId: number,
    pilotId: number,
    tournamentId: number,
    raceId: number
  ): Observable<number> {
    return this.http.post<number>(this.raceEventUrl, {
      raceEventTypeId: raceEventTypeId,
      tournamentId: tournamentId,
      pilotId: pilotId,
      raceId: raceId,
      seconds: seconds
    });
  }
}
