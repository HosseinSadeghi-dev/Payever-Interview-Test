import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {BaseComponent} from "@/app/shared/base/base.component";

@Component({
  selector: 'app-today-btn',
  standalone: true,
  imports: [
    MatButton
  ],
  template: '<button mat-stroked-button color="primary" (click)="goToday()">Today</button>',
})
export class TodayBtnComponent extends BaseComponent {

  goToday(): void {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.router.navigate([`${year}/${month}/${day}`], {relativeTo: this.route});
  }
}
