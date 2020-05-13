import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class ProgressService {
  private uploadProgress: Subject<any>;

  startTracking() { 
    this.uploadProgress = new Subject();
    return this.uploadProgress;
  }

  notify(progress) {
    this.uploadProgress.next(progress);
  }

  endTracking() {
    setTimeout(() => {
      if(this.uploadProgress)
        this.uploadProgress.complete();
    }, 1500);    
  }
}

@Injectable()
export class BrowserXhrWithProgress implements HttpInterceptor {
  constructor(private service: ProgressService, private http: HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return Observable.create((observer) => {
        next.handle(req).subscribe(
          event => {
            this.getEventMessage(event);
            observer.next(event)
          }
        )
    });
  }

  private createProgress(event) {
    return {
        total: event.total,
        percentage: Math.round(event.loaded / event.total * 100)
    };
  }

  private getEventMessage(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        this.service.notify(this.createProgress(event));
  
      case HttpEventType.Response:
        this.service.endTracking();               
    }
  }
}