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
    return this.http.get<any>('/api/makes').pipe(
      map(response => response)
    );
  }
}
