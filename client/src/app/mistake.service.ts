import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RaceEventType } from './race-event-type';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class MistakeService {
  private mistakeTypeUrl = '/api/mistake-type';
  private mistakeUrl = '/api/mistake';

  mistakeTypes: RaceEventType[] = [];

  constructor(
    private http: HttpClient,
    private configurationService: ConfigurationService
  ) {
    this.mistakeTypeUrl =
      this.configurationService.baseURL + this.mistakeTypeUrl;
    this.mistakeUrl = this.configurationService.baseURL + this.mistakeUrl;
    this.initRaceEventTypes();
  }

  initRaceEventTypes(): void {
    this.http
      .get<RaceEventType[]>(this.mistakeTypeUrl)
      .subscribe(mistakeTypes => (this.mistakeTypes = mistakeTypes));
  }

  saveMistake(
    mistakeTypeId: number,
    pilotId: number,
    tournamentId: number,
    raceId: number
  ): Observable<number> {
    return this.http.post<number>(this.mistakeUrl, {
      mistakeTypeId: mistakeTypeId,
      tournamentId: tournamentId,
      pilotId: pilotId,
      raceId: raceId
    });
  }
}
