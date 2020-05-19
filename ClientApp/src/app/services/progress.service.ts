import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';

@Injectable()
export class ProgressService {
  private uploadProgress: Subject<any>;

  startTracking() { 
    this.uploadProgress = new Subject();
    return this.uploadProgress;
  }

  notify(progress) {
    if (this.uploadProgress)
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
  constructor(private service: ProgressService) {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return Observable.create((observer) => {
        next.handle(req).subscribe(
          event => {
            this.getEventMessage(event);
            observer.next(event)
          },
          err => {
            observer.error(err);
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