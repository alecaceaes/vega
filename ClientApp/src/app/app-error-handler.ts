import * as Sentry from "@sentry/browser";
import { ToastrService } from 'ngx-toastr';
import { ErrorHandler, Inject, NgZone } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {
    constructor(
        private ngZone: NgZone,
        @Inject(ToastrService) private toastrService: ToastrService) {        
    }

    handleError(error: any): void {
        Sentry.captureException(error.originalError || error);

        this.ngZone.run(() => {
            this.toastrService.error(            
                'An unexpected error happened.',
                'Error')
        })        
    }
}