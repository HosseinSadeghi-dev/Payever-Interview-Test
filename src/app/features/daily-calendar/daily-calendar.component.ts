import { Component, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatDivider } from "@angular/material/divider";
import { CurrentDateService } from "@services/current-date.service";

import { AppointmentsComponent } from "@/app/features/daily-calendar/appointments/appointments.component";
import { BaseComponent } from "@/app/shared/base/base.component";

import { HourListComponent } from "./hour-list/hour-list.component";

interface IParams {
    year: number,
    month: number,
    day: number,
}

@Component({
    selector: "app-daily-calendar",
    standalone: true,
    imports: [
        HourListComponent,
        MatDivider,
        AppointmentsComponent
    ],
    templateUrl: "./daily-calendar.component.html",
    styleUrl: "./daily-calendar.component.scss"
})
export class DailyCalendarComponent extends BaseComponent {
    readonly #currentDateService: CurrentDateService = inject(CurrentDateService);

    constructor() {
        super();
        this.checkDayChanged();
    }

    checkDayChanged(): void {
        this.route.params
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((prm) => {
                const params = prm as IParams;
                if (!params || !params.year || !params.month || !params.day) {
                    this.#currentDateService.selectedDate = new Date();
                    return;
                }
                this.#currentDateService.selectedDate = new Date(params.year, params.month - 1, params.day);
            });
    }
}
