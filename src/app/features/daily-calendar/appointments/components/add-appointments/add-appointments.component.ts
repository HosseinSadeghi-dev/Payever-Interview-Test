import { CdkDrag } from "@angular/cdk/drag-drop";
import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import {
    AfterViewInit,
    Component,
    inject,
    OnDestroy,
    output,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from "@angular/core";
import {
    AbstractControl,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule, ValidationErrors,
    ValidatorFn,
    Validators
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { provideNativeDateAdapter } from "@angular/material/core";
import {
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerModule,
    MatDatepickerToggle
} from "@angular/material/datepicker";
import { MatDialogActions, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import {
    MatError, MatFormField, MatFormFieldModule, MatLabel
} from "@angular/material/form-field";
import { MatInput, MatInputModule } from "@angular/material/input";
import { IFormGroup } from "@models/form.interface";

import { differenceInMinutes, getHourAndMinutes, setTime } from "@/app/core/utilities/time.utility";
import { BaseComponent } from "@/app/shared/base/base.component";
import { SnackbarType } from "@/app/shared/snackbar/models/snackbar.model";

import { IAppointment, IAppointmentDto } from "../../models/appointments.interface";
import { AppointmentService } from "../../services/appointment.service";

const timeRangeValidator = (): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
    let startTime: string | number = control.get("start")?.value;
    let endTime: string | number = control.get("end")?.value;

    const setError = () => {
        control.get("end")?.setErrors(
            { timeRangeInvalid: true }
        );
        return { timeRangeInvalid: true };
    };

    if (endTime === "00:00") {
        return setError();
    }

    if (startTime === "23:59") {
        return setError();
    }

    if (startTime) {
        if (typeof startTime !== "number") {
            startTime = +startTime.replace(":", "");
        }
    }

    if (endTime) {
        if (typeof endTime !== "number") {
            endTime = +endTime.replace(":", "");
        }
    }

    if (startTime && endTime && startTime >= endTime) {
        return setError();
    }

    return null;
};

@Component({
    selector: "app-add-appointments",
    standalone: true,
    imports: [
        CdkDrag,
        MatDialogTitle,
        MatDialogContent,
        MatFormField,
        MatInput,
        MatLabel,
        MatDialogActions,
        MatButton,
        FormsModule,
        ReactiveFormsModule,
        MatError,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatDatepicker,
        MatFormFieldModule, MatInputModule, MatDatepickerModule
    ],
    providers: [
        AppointmentService,
        provideNativeDateAdapter()
    ],
    templateUrl: "./add-appointments.component.html",
    styleUrl: "./add-appointments.component.scss"
})
export class AddAppointmentsComponent extends BaseComponent implements AfterViewInit, OnDestroy {
    @ViewChild(TemplateRef) dialogTemplate!: TemplateRef<any>;
    #overlayRef!: OverlayRef;
    #portal!: TemplatePortal;
    readonly #overlay: Overlay = inject(Overlay);
    readonly #viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
    readonly #appointmentService: AppointmentService = inject(AppointmentService);
    appointmentForm: IFormGroup<IAppointment> = new FormGroup({
        title: new FormControl("", [Validators.required]),
        date: new FormControl("", [Validators.required]),
        start: new FormControl("", [Validators.required]),
        end: new FormControl("", [Validators.required]),
        description: new FormControl("")
    }, { validators: timeRangeValidator() }) as IFormGroup<IAppointment>;
    id!: string;
    updateAppointments = output<boolean>();

    ngAfterViewInit() {
        this.createDialogOverlay();
    }

    createDialogOverlay(): void {
        this.#portal = new TemplatePortal(this.dialogTemplate, this.#viewContainerRef);
        this.#overlayRef = this.#overlay.create({
            positionStrategy: this.#overlay.position().global().centerHorizontally().centerVertically(),
            hasBackdrop: true,
        });
        this.#overlayRef.backdropClick().subscribe(() => this.closeDialog());
    }

    openDialog(appointment: IAppointmentDto) {
        this.appointmentForm.controls["date"].setValue(appointment.start);
        this.appointmentForm.controls.start.setValue(getHourAndMinutes(appointment.start));
        if (appointment.title) {
            this.appointmentForm.controls.title.setValue(appointment.title);
        }
        if (appointment.end) {
            this.appointmentForm.controls.end.setValue(getHourAndMinutes(appointment.end));
        }
        if (appointment.description) {
            this.appointmentForm.controls.description?.setValue(appointment.description);
        }
        this.id = appointment.id;
        this.#overlayRef.attach(this.#portal);
    }

    setAppointment(): IAppointment {
        const date: Date = this.appointmentForm.controls["date"].value;
        const title: string = this.appointmentForm.controls.title.value;
        const description: string = this.appointmentForm.controls.description?.value;
        const start: Date = setTime(date, this.appointmentForm.controls.start.value);
        const end: Date = setTime(date, this.appointmentForm.controls.end.value);
        const length: number = differenceInMinutes(start, end);
        return {
            title,
            description,
            length,
            start,
            end,
        };
    }

    submitForm(): void {
        if (this.appointmentForm.invalid) {
            return;
        }
        const newAppointmentValue: IAppointment = this.setAppointment();
        if (this.id) {
            this.editAppointment({
                ...newAppointmentValue,
                id: this.id
            });
        } else {
            this.newAppointment(newAppointmentValue);
        }
        this.updateAppointments.emit(true);
        this.closeDialog();
    }

    newAppointment(appointment: IAppointment): void {
        try {
            this.#appointmentService.addAppointment(appointment);
            this.snackbarService.show("Appointment Successfully Added", SnackbarType.Success, 2500);
        } catch (error) {
            this.snackbarService.show(error as string, SnackbarType.Error, 2500);
        }
    }

    editAppointment(appointment: IAppointmentDto): void {
        try {
            this.#appointmentService.editAppointment(appointment);
            this.snackbarService.show("Appointment Successfully Edited", SnackbarType.Success, 2500);
        } catch (error) {
            this.snackbarService.show(error as string, SnackbarType.Error, 2500);
        }
    }

    closeDialog(): void {
        this.#overlayRef.detach();
        this.appointmentForm.reset();
    }

    ngOnDestroy() {
        this.#overlayRef.dispose();
    }
}
