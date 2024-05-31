import {Component, DestroyRef, inject, NgZone} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {SnackbarService} from "../snackbar/services/snackbar.service";

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

  constructor() {
  }

  runOutsideAngularWithDelay(action: () => void, delay: number): void {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => this.zone.run(action), delay);
    });
  }

}
