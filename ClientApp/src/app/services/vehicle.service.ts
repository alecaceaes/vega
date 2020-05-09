import { SaveVehicle } from './../models/vehicle';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal//operators/map';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getMakes() {
    return this.http.get<any>('/api/makes').pipe(
      map(response => response)
    );
  }

  getFeatures() {
    return this.http.get<any>('/api/features').pipe(
      map(response => response)
    );
  }

  create(vehicle) {
    return this.http.post('/api/vehicles', vehicle).pipe(
      map(response => response)
    )
  }

  getVehicle(id) {
    return this.http.get<any>('/api/vehicles/' + id).pipe(
      map(response => response)
    )
  }

  update(vehicle: SaveVehicle) {
    return this.http.put('/api/vehicles/' + vehicle.id, vehicle).pipe(
      map(response => response)
    )
  }

  delete(id) {
    return this.http.delete('/api/vehicles/' + id).pipe(
      map(response => response)
    )
  }

  getVehicles() {
    return this.http.get<any>('/api/vehicles').pipe(
      map(response => response)
    );
  }
}
