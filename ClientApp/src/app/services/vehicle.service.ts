import { SaveVehicle } from './../models/vehicle';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal//operators/map';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly vehiclesEndpoint ='/api/vehicles';
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
    return this.http.post(this.vehiclesEndpoint, vehicle).pipe(
      map(response => response)
    )
  }

  getVehicle(id) {
    return this.http.get<any>(this.vehiclesEndpoint + '/' + id).pipe(
      map(response => response)
    )
  }

  update(vehicle: SaveVehicle) {
    return this.http.put(this.vehiclesEndpoint + '/' + vehicle.id, vehicle).pipe(
      map(response => response)
    )
  }

  delete(id) {
    return this.http.delete(this.vehiclesEndpoint + '/' + id).pipe(
      map(response => response)
    )
  }

  getVehicles(filter) {
    return this.http.get<any>(this.vehiclesEndpoint + '?' + this.toQueryString(filter)).pipe(
      map(response => response)
    );
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
}
