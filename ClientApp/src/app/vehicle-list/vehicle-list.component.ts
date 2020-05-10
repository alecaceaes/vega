import { VehicleService } from './../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { Vehicle, KeyValuePair } from '../models/vehicle';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  allVehicles: Vehicle[];
  makes: KeyValuePair[];
  filter: any = {};

  constructor(private VehicleService: VehicleService) { }

  ngOnInit() {
    this.VehicleService.getMakes()
      .subscribe(makes => this.makes = makes);

    this.VehicleService.getVehicles()
      .subscribe(vehicles => this.vehicles = this.allVehicles = vehicles);
  }

  onFilterChange() {
    let vehicles = this.allVehicles;

    if (this.filter.makeId)
      vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);

    if (this.filter.model)
      vehicles = vehicles.filter(v => v.make.id == this.filter.modelId);

    this.vehicles = vehicles;
  }

  resetFilter() {
    this.filter = {};
    this.onFilterChange();
  }
}
