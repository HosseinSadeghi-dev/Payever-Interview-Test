import {ErrorHandler, Injectable} from "@angular/core";
import {environment} from "@/environments/environment";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    handleError(error: any) {
        if (!environment.production) {
            console.error('Error: ', error)
        }
    }
}
