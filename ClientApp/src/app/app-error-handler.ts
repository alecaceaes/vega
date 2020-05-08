import { ToastrService } from 'ngx-toastr';
import { ErrorHandler, Inject } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {
    constructor(@Inject(ToastrService) private toastrService: ToastrService) {        
    }

    handleError(error: any): void {
        this.toastrService.error(            
            'An unexpected error happened.',
            'Error')
    }
}