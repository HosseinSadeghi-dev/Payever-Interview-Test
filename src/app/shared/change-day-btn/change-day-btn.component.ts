import {Component, inject} from '@angular/core';
import {BaseComponent} from "../base/base.component";
import {CurrentDateService} from "@services/current-date.service";
import {addDaysToDate} from "../../core/utilities/time.utility";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-change-day-btn',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton
  ],
  template: `
    <div class="d-flex flex-row justify-content-center align-items-center">
      <button mat-icon-button (click)="goToDate(-1)">
        <mat-icon>arrow_back_ios</mat-icon>
      </button>
      <button mat-icon-button (click)="goToDate(1)">
        <mat-icon>arrow_forward_ios</mat-icon>
      </button>
    </div>
  `
})
export class ChangeDayBtnComponent extends BaseComponent {

  readonly #currentDateService: CurrentDateService = inject(CurrentDateService);

  goToDate(toChange: number): void {
    const date = addDaysToDate(this.#currentDateService.selectedDate.value, toChange)
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.router.navigate([`${year}/${month}/${day}`], {relativeTo: this.route});
  }
}
