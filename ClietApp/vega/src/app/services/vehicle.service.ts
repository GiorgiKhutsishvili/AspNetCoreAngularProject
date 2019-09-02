import { Vehicle } from './../models/vehicle';
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

  getVehicles(){
    return this.http.get<Vehicle[]>('https://localhost:44320/api/vehicles');
  }

  update(vehicle: SaveVehicle){
    return this.http.put('https://localhost:44320/api/vehicles/' + vehicle.id, vehicle);
  }

  delete(id){
    return this.http.delete('https://localhost:44320/api/vehicles/' + id)
  }

}
