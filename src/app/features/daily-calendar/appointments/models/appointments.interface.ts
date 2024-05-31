export interface IAppointment {
  title: string,
  length: number,
  start: Date,
  end: Date,
  description?: string,
}

export interface IAppointmentDto extends IAppointment {
  id: string,
}

export interface IDailyAppointments {
  hour: string,
  appointment: IAppointmentDto | null,
}
