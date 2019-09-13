import { Photo } from './../models/vehicle';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class PhotoService {


    constructor(private http: HttpClient) { }

  getFilePath() {
    return this.http.get('/assets/config.json');
  }
    getPhotos(vehicleId){
        return this.http.get<Photo[]>(`https://localhost:44320/api/vehicles/${vehicleId}/photos`);
    }

    upload(vehicleId, photo) {
        var formData = new FormData();
        formData.append('file', photo);
        return this.http
          .post(`https://localhost:44320/api/vehicles/${vehicleId}/photos`, formData);
    }
}
