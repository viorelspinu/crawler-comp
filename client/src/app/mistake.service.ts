import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MistakeType } from './mistaketype';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class MistakeService {
  private mistakeTypeUrl = '/api/mistake-type';
  private mistakeUrl = '/api/mistake';

  mistakeTypes: MistakeType[] = [];

  constructor(
    private http: HttpClient,
    private configurationService: ConfigurationService
  ) {
    this.mistakeTypeUrl =
      this.configurationService.baseURL + this.mistakeTypeUrl;
    this.mistakeUrl = this.configurationService.baseURL + this.mistakeUrl;
    this.initMistakeTypes();
  }

  initMistakeTypes(): void {
    this.http
      .get<MistakeType[]>(this.mistakeTypeUrl)
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
