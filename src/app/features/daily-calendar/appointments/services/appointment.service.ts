import { Injectable } from "@angular/core";

import { generateUniqueId } from "@/app/core/utilities/generate-id.utility";
import { areDatesEqual } from "@/app/core/utilities/time.utility";

import { IAppointment, IAppointmentDto } from "../models/appointments.interface";

const localDateName: string = "payever/appointments";

@Injectable()
export class AppointmentService {
    private isTimeRangeValid(newAppointment: IAppointmentDto, existingAppointments: IAppointmentDto[]): boolean {
        const newStart = new Date(newAppointment.start).getTime();
        const newEnd = new Date(newAppointment.end).getTime();

        const filteredAppointments = newAppointment.id
            ? existingAppointments.filter((appointment) => appointment.id !== newAppointment.id)
            : existingAppointments;

        return !filteredAppointments.some((appointment) => {
            const appointmentStart = new Date(appointment.start).getTime();
            const appointmentEnd = new Date(appointment.end).getTime();
            return newStart < appointmentEnd && newEnd > appointmentStart;
        });
    }

    getAllAppointments(): IAppointmentDto[] {
        return JSON.parse(localStorage.getItem(localDateName) ?? "[]") as IAppointmentDto[];
    }

    getAppointmentsByDay(date: Date): IAppointmentDto[] {
        const appointments: IAppointmentDto[] = this.getAllAppointments();
        return appointments.filter((appointment) => areDatesEqual(new Date(appointment.start), date));
    }

    setNewAppointments(appointments: IAppointmentDto[]): void {
        localStorage.setItem(localDateName, JSON.stringify(appointments));
    }

    addAppointment(appointment: IAppointment) {
        const appointments: IAppointmentDto[] = this.getAllAppointments();
        if (!this.isTimeRangeValid(appointment as IAppointmentDto, appointments)) {
            throw ("New appointment has conflict");
        }
        appointments.push({
            ...appointment,
            id: generateUniqueId(),
        });
        this.setNewAppointments(appointments);
    }

    editAppointment(newAppointment: IAppointmentDto) {
        const appointments: IAppointmentDto[] = this.getAllAppointments();
        if (!this.isTimeRangeValid(newAppointment, appointments)) {
            throw ("Appointment has conflict");
        }
        const appointmentIdx = appointments.findIndex((el) => el.id === newAppointment.id);
        if (appointmentIdx !== -1) {
            appointments[appointmentIdx] = newAppointment;
        }
        this.setNewAppointments(appointments);
    }

    deleteAppointment(appointmentId: string) {
        let appointments: IAppointmentDto[] = this.getAllAppointments();
        appointments = appointments.filter((appointment) => appointment.id !== appointmentId);
        this.setNewAppointments(appointments);
    }
}
