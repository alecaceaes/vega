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
    this.uploadProgress.next(progress);
      
  }

  endTracking() {
    if(this.uploadProgress)
      this.uploadProgress.complete();  
  }
}

@Injectable()
export class BrowserXhrWithProgress implements HttpInterceptor {
  constructor(private service: ProgressService) {  }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.reportProgress) {
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
    else {
      return next.handle(req);
    }    
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
        break;
      case HttpEventType.Response:
        this.service.endTracking();  
        break;             
    }
  }
}