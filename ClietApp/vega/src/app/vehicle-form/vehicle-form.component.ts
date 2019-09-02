import { VehicleService } from '../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { SaveVehicle, Vehicle } from '../models/vehicle';
import * as _ from 'underscore';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes;
  models: any[];
  features;
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      email: '',
      phone: ''
    }
  };

  constructor(
    private toastrService: ToastrService,
    private route: ActivatedRoute, // for route parameteres
    private router: Router, // navigate user to different page if passed invalid id
    private vehicleService: VehicleService
  ) {
    route.params.subscribe(p => {
      this.vehicle.id = +p['id'];
    });
  }

  ngOnInit() {

    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];

    if (this.vehicle.id)
      sources.push(this.vehicleService.getVehicle(this.vehicle.id))

    forkJoin(sources).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];

      if (this.vehicle.id) {
        this.setVehicle(<any>data[2]);
        this.populateModels();
      }


    }, err => {
      if (err.status == 404)
        this.router.navigate(['/home']);
    });

    // this.vehicleService.getVehicle(this.vehicle.id)
    //   .subscribe(v => {
    //     this.vehicle = v;
    //   }, err => {
    //     if(err.status == 404)
    //       this.router.navigate(['/home']);
    //   });

    // this.vehicleService.getMakes().subscribe(makes => {
    //   this.makes = makes;

    //   console.log("MAKES", this.makes);

    //   this.vehicleService.getFeatures()
    //   .subscribe(features => this.features = features);
    // });


  }


  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id');
  }




  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

  onFeatureToggle(featureId, $event) {
    if ($event.target.checked)
      this.vehicle.features.push(featureId);
    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    if (this.vehicle.id) {
      this.vehicleService.update(this.vehicle)
        .subscribe(x => {
          this.toastrService.success('The vehicle was successfully updated');
        })
    }
    else {
      this.vehicleService.create(this.vehicle)
        .subscribe(x => console.log(x));
    }

  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          console.log(x)
        });
    }
  }



}
