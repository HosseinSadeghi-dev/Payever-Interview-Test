import {
    Component, inject, input, output
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatIconButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";

import { BaseComponent } from "@/app/shared/base/base.component";
import { ConfirmDialogComponent } from "@/app/shared/confirm-dialog/confirm-dialog.component";
import { SnackbarType } from "@/app/shared/snackbar/models/snackbar.model";

import { AppointmentService } from "../../services/appointment.service";

@Component({
    selector: "app-delete-appointments",
    standalone: true,
    imports: [
        MatIconButton,
        MatIcon
    ],
    providers: [AppointmentService],
    template: `
    <button mat-icon-button color="warn" (click)="$event.stopPropagation();$event.preventDefault();openConfirmDialog()">
      <mat-icon>delete</mat-icon>
    </button>`,
})
export class DeleteAppointmentsComponent extends BaseComponent {
    appointmentId = input.required<string>();
    updateAppointments = output<boolean>();
    readonly #appointmentService: AppointmentService = inject(AppointmentService);

    constructor(public dialog: MatDialog) {
        super();
    }

    openConfirmDialog(): void {
        this.dialog.open(ConfirmDialogComponent, {
            data: {
                message: "Do you really want to delete this appointment?"
            },
            minWidth: 300,
            maxWidth: "95%",
        })
            .afterClosed()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((result) => {
                if (result) {
                    this.#appointmentService.deleteAppointment(this.appointmentId());
                    this.snackbarService.show("Appointment Successfully Deleted", SnackbarType.Success, 2500);
                    this.updateAppointments.emit(true);
                }
            });
    }
}
