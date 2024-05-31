import {
    CdkDrag, CdkDragEnd, CdkDragPlaceholder, CdkDropList
} from "@angular/cdk/drag-drop";
import { Component, inject, ViewChild } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";
import { CurrentDateService } from "@services/current-date.service";

import { addMinutesToDate, differenceInMinutes, setTime } from "@/app/core/utilities/time.utility";
import {
    AddAppointmentsComponent
} from "@/app/features/daily-calendar/appointments/components/add-appointments/add-appointments.component";
import {
    DeleteAppointmentsComponent
} from "@/app/features/daily-calendar/appointments/components/delete-appointments/delete-appointments.component";
import {
    IAppointmentDto,
    type IDailyAppointments
} from "@/app/features/daily-calendar/appointments/models/appointments.interface";
import { AppointmentService } from "@/app/features/daily-calendar/appointments/services/appointment.service";
import { BaseComponent } from "@/app/shared/base/base.component";
import { SnackbarType } from "@/app/shared/snackbar/models/snackbar.model";

@Component({
    selector: "app-appointments",
    standalone: true,
    imports: [
        MatDivider,
        CdkDropList,
        MatCardContent,
        MatCard,
        CdkDrag,
        CdkDragPlaceholder,
        AddAppointmentsComponent,
        DeleteAppointmentsComponent
    ],
    providers: [
        AppointmentService
    ],
    templateUrl: "./appointments.component.html",
    styleUrl: "./appointments.component.scss"
})
export class AppointmentsComponent extends BaseComponent {
    readonly #currentDateService: CurrentDateService = inject(CurrentDateService);
    readonly #appointmentService: AppointmentService = inject(AppointmentService);
    @ViewChild(AddAppointmentsComponent) addAppointmentsComponent!: AddAppointmentsComponent;
    dailyHours: IDailyAppointments[] = [];
    selectedDate: Date = this.#currentDateService.selectedDate.value;

    constructor() {
        super();
        this.generateHours();
        this.setSelectedDate();
    }

    setSelectedDate() {
        this.#currentDateService.selectedDate
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (date: Date) => {
                    this.selectedDate = date;
                    this.generateHours();
                }
            });
    }

    generateHours(): void {
        this.dailyHours = [];
        for (let i = 0; i < 24; i += 1) {
            const hour = `${i.toString().padStart(2, "0")}:00`;
            this.dailyHours.push({
                hour,
                appointment: null
            });
        }
        this.setAppointments();
    }

    setAppointments(): void {
        const appointments = this.#appointmentService.getAppointmentsByDay(this.selectedDate);
        appointments.forEach((appointment) => {
            appointment.start = new Date(appointment.start);
            appointment.end = new Date(appointment.end);
        });
        this.setDailyAppointments(appointments);
    }

    setDailyAppointments(appointments: IAppointmentDto[]): void {
        this.dailyHours.forEach((each) => {
            const found = appointments.find((f) => f.start.getHours() === +each.hour.split(":")[0]);
            if (found) {
                each.appointment = found;
            }
        });
    }

    addAppointments(hourIndex: number) {
        if (this.dailyHours[hourIndex].appointment) {
            return;
        }
        const appointment: IAppointmentDto = {
            start: setTime(this.selectedDate, this.dailyHours[hourIndex].hour)
        } as IAppointmentDto;
        this.addAppointmentsComponent.openDialog(appointment);
    }

    editAppointment(hourIndex: number) {
        this.addAppointmentsComponent.openDialog(this.dailyHours[hourIndex].appointment as IAppointmentDto);
    }

    editAppointmentPosition(appointment: IAppointmentDto): void {
        this.#appointmentService.editAppointment(appointment);
        this.snackbarService.show("Appointment Successfully Edited", SnackbarType.Success, 2500);
        this.generateHours();
    }

    drop(event: CdkDragEnd, appointment:IAppointmentDto) {
        try {
            const minutesToChange: number = event.distance.y;
            appointment.start = new Date(addMinutesToDate(appointment.start, minutesToChange));
            appointment.end = new Date(addMinutesToDate(appointment.end, minutesToChange));
            appointment.length = differenceInMinutes(appointment.start, appointment.end);
            this.editAppointmentPosition(appointment);
        } catch (error) {
            this.snackbarService.show(error as string, SnackbarType.Error, 2500);
            event.source._dragRef.reset();
        }
    }

    cardHeight(height: number): number {
        return Math.max(height, 50);
    }
}
