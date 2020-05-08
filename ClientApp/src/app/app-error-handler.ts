import { ToastrService } from 'ngx-toastr';
import { ErrorHandler, Inject, NgZone } from "@angular/core";

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
    }
}