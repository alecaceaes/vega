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
  makes: KeyValuePair[];
  filter: any = {};

  constructor(private VehicleService: VehicleService) { }

  ngOnInit() {
    this.VehicleService.getMakes()
      .subscribe(makes => this.makes = makes);

    this.populateVehicles();
  }

  private populateVehicles() {
    this.VehicleService.getVehicles(this.filter)
      .subscribe(vehicles => this.vehicles = vehicles);
  }

  onFilterChange() {
    this.populateVehicles();
  }

  resetFilter() {
    this.filter = {};
    this.onFilterChange();
  }
}
