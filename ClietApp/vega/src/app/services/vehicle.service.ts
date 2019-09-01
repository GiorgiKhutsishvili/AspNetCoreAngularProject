import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { SaveVehicle } from '../models/vehicle';

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

  create(vehicle) {
    return this.http.post('https://localhost:44320/api/vehicles', vehicle);
  }

  getVehicle(id) {
    return this.http.get('https://localhost:44320/api/vehicles/' + id);
  }

  update(vehicle: SaveVehicle){
    return this.http.put('https://localhost:44320/api/vehicles/' + vehicle.id, vehicle);
  }

}
