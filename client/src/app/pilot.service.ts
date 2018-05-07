import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pilot } from './pilot';

@Injectable({
  providedIn: 'root'
})
export class PilotService {
  private pilotsUrl = 'http://ec2-34-205-125-209.compute-1.amazonaws.com:8000/api/pilot';

  constructor(private http: HttpClient) {}

  getPilots(): Observable<Pilot[]> {
    return this.http.get<Pilot[]>(this.pilotsUrl);
  }
}
