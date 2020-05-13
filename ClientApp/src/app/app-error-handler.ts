import * as Sentry from "@sentry/browser";
import { ToastrService } from 'ngx-toastr';
import { ErrorHandler, Inject, NgZone, isDevMode } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {
    constructor(
        private ngZone: NgZone,
        @Inject(ToastrService) private toastrService: ToastrService) {        
    }

    handleError(error: any): void {
        this.ngZone.run(() => {
            this.toastrService.error(            
                'An unexpected error happened.',
                'Error')
        })       
        
        if(!isDevMode())
            Sentry.captureException(error.originalError || error);
        else 
            throw error; 
    }
}