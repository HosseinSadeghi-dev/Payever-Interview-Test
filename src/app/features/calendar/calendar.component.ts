import {Component, inject, ViewChild} from '@angular/core';
import {provideNativeDateAdapter} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {CurrentDateService} from "@services/current-date.service";
import {AsyncPipe} from "@angular/common";
import {BaseComponent} from "@/app/shared/base/base.component";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {
  AddAppointmentsComponent
} from "@/app/features/daily-calendar/appointments/components/add-appointments/add-appointments.component";
import {IAppointmentDto} from "@/app/features/daily-calendar/appointments/models/appointments.interface";
import {setTime} from "@/app/core/utilities/time.utility";

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  providers: [
    provideNativeDateAdapter()
  ],
  imports: [
    MatCardModule,
    MatDatepickerModule,
    AsyncPipe,
    MatIcon,
    MatFabButton,
    AddAppointmentsComponent
  ],
})
export class CalendarComponent extends BaseComponent {
  readonly currentDateService: CurrentDateService = inject(CurrentDateService);
  @ViewChild(AddAppointmentsComponent) addAppointmentsComponent!: AddAppointmentsComponent;

  addAppointments() {
    const appointment: IAppointmentDto = {
      start: setTime(this.currentDateService.selectedDate.value, '00:00')
    } as IAppointmentDto;
    this.addAppointmentsComponent.openDialog(appointment);
  }

  updateAppointments() {
    this.currentDateService.selectedDate = new Date(this.currentDateService.selectedDate.value);
  }

  changeDate(date: Date | null): void {
    if (!date) {
      return
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.router.navigate([`${year}/${month}/${day}`]);
  }
}
