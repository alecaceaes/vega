import { VehicleService } from './../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../models/vehicle';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];

  constructor(private VehicleService: VehicleService) { }

  ngOnInit() {
    this.VehicleService.getVehicles()
      .subscribe(vehicles => this.vehicles = vehicles);
  }

}
