import { NgZone } from '@angular/core';
import { VehicleService } from './../services/vehicle.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserXhrWithProgress, ProgressService } from '../services/progress.service';

@Component({
  templateUrl: './view-vehicle.component.html',
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BrowserXhrWithProgress, multi: true },
    ProgressService,
  ],
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
  vehicle: any;
  vehicleId: number;
  photos: any[];
  progress: any;

  constructor(
    // private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private progressService: ProgressService,
    private photoService: PhotoService,
    private vehicleService: VehicleService) { 
      route.params.subscribe(p => {
        this.vehicleId = +p['id'];
        if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
          router.navigate(['/vehicles']);
          return;
        }
      });
    }

  ngOnInit() {
    this.photoService.getPhotos(this.vehicleId) 
      .subscribe(photos => this.photos = photos);
      
    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return;
          }
        })
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicleId)
        .subscribe(x => {
          this.router.navigate(['/vehicles']);
        })
    }
  }

  uploadPhoto() {
    this.progressService.startTracking().subscribe(progress => {
        // this.zone.run(() => {
          this.progress = progress;
        // })        
      },
      null,
      () => {this.progress = null;});

    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;  
    var file = nativeElement.files[0];
    nativeElement.value = ''; 

    this.photoService.upload(this.vehicleId, file)
      .subscribe(photo => {
        this.photos.push(photo);
      },
      err => {
        this.toastr.error(err.error, 'Error');
      })
  }

  cancelUpload() {
    // this.uploadingProgress.unsubscribe();
    this.progress = null;
  }
}
