import {inject, Injectable, NgZone} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SnackbarModel, SnackbarType} from '../models/snackbar.model';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackbar$: BehaviorSubject<SnackbarModel> = new BehaviorSubject<SnackbarModel>({} as SnackbarModel);
  readonly zone: NgZone = inject(NgZone);

  constructor() {
  }

  set snackbar(data: SnackbarModel) {
    this.snackbar$.next(data);
  }

  get snackbar(): BehaviorSubject<SnackbarModel> {
    return this.snackbar$;
  }

  private setAutoHideSnackbar(timeout: number): void {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => this.hideSnackbar(), timeout);
    });
  }

  private hideSnackbar(): void {
    this.zone.run(() => {
      this.snackbar = {
        show: false,
        message: '',
        type: undefined
      };
    });
  }

  show(message: string, type?: SnackbarType, timeout = 3000): void {
    this.snackbar = {
      show: true,
      message,
      type
    };
    if (timeout) {
      this.setAutoHideSnackbar(timeout);
    }
  }
}
