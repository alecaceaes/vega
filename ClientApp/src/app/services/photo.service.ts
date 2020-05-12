import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  upload(vehicleId, photo) {
    var formData = new FormData();
    formData.append('file', photo);
    return this.http.post(`/api/vehicles/${vehicleId}/photos`, formData).pipe(
      map(res => res)
    )
  }

  getPhotos(vehicleId) {
    return this.http.get<any>(`/api/vehicles/${vehicleId}/photos`).pipe(
      map(res => res)
    )      
  }
}
