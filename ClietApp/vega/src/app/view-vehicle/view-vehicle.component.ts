import { Photo } from './../models/vehicle';
import { PhotoService } from './../services/photo.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';


@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef
  vehicle: any;
  vehicleId: number;
  photos: Photo[];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private photoService: PhotoService,
    private vehicleService: VehicleService
  ) {
    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return;
      }
    })
  }

  ngOnInit() {


    this.photoService.getPhotos(this.vehicleId)
      .subscribe(photos => this.photos = photos);
      

    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(v => this.vehicle = v,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return;
          }
        });
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/vehicles']);
        });
    }
  }


  uploadPhoto() {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;

    this.photoService.upload(this.vehicleId, nativeElement.files[0]);
  }


}
