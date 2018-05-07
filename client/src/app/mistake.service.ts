import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mistake } from './mistake';

@Injectable({
  providedIn: 'root'
})
export class MistakeService {

  private mistakesUrl = '/assets/mistakes.json';

  mistakeTypes: Mistake[] = [];

  constructor(private http: HttpClient) {
    this.initMistakes();
  }

  initMistakes(): void {
    this.loadMistakeTypes().subscribe(mistakes => this.mistakeTypes = mistakes);
  }

  loadMistakeTypes(): Observable<Mistake[]> {
    return this.http.get<Mistake[]>(this.mistakesUrl);
  }
}
