import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getFeatures() {
    return this.http.get('https://localhost:44320/api/features');
  }

  getMakes() {
    return this.http.get('https://localhost:44320/api/makes');
  }

}
