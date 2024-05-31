import {Component, DestroyRef, inject, NgZone} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {fromEvent, map, merge, of} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {SnackbarService} from "@/app/shared/snackbar/services/snackbar.service";
import {SnackbarType} from "@/app/shared/snackbar/models/snackbar.model";

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [CommonModule],
  template: ''
})
export class BaseComponent {
  readonly destroyRef: DestroyRef = inject(DestroyRef);
  readonly route: ActivatedRoute = inject(ActivatedRoute);
  readonly router: Router = inject(Router);
  readonly snackbarService: SnackbarService = inject(SnackbarService);
  readonly zone: NgZone = inject(NgZone);
  isMobile = false;

  constructor() {
    this.checkIsMobile();
    this.checkNetworkStatus();
  }

  checkIsMobile(): void {
    this.isMobile = window.innerWidth < 756;
  }

  runOutsideAngularWithDelay(action: () => void, delay: number): void {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => this.zone.run(action), delay);
    });
  }

  checkNetworkStatus() {
    merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(status => {
        if (status) {
          this.snackbarService.show('', SnackbarType.Error, 1);
          return
        }
        this.snackbarService.show('Check Your Internet Connection', SnackbarType.Error, 0)
      });
  }

}
