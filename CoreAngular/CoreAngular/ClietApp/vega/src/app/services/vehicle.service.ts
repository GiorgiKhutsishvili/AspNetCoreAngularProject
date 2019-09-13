import { Vehicle, KeyValuePair } from './../models/vehicle';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { SaveVehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private readonly vehiclesEndpoint = 'https://localhost:44320/api/vehicles';
  private readonly featuresEndpoint = 'https://localhost:44320/api/features';
  private readonly makesEndpoint = 'https://localhost:44320/api/makes';

  constructor(private http: HttpClient) { }

  getFeatures() {
    return this.http.get(this.featuresEndpoint);
  }

  getMakes() {
    return this.http.get<KeyValuePair[]>(this.makesEndpoint);
  }

  create(vehicle) {
    return this.http.post(this.vehiclesEndpoint, vehicle);
  }

  getVehicle(id) {
    return this.http.get(this.vehiclesEndpoint + '/' + id);
  }



  getVehicles(filter) {
    console.log(filter);
    console.log(this.toQueryString(filter));
    console.log(this.vehiclesEndpoint + '?' + this.toQueryString(filter));
    return this.http.get<Vehicle[]>(this.vehiclesEndpoint + '?' + this.toQueryString(filter));
  }

  toQueryString(obj) {
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }

    return parts.join('&');
  }

  update(vehicle: SaveVehicle) {
    return this.http.put(this.vehiclesEndpoint + '/' + vehicle.id, vehicle);
  }

  delete(id) {
    return this.http.delete(this.vehiclesEndpoint + '/' + id);
  }

}
