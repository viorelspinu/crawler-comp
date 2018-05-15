import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

//  baseURL = 'http://ec2-34-205-125-209.compute-1.amazonaws.com:8000';
   baseURL = 'http://localhost:8000';
  constructor() {}
}
