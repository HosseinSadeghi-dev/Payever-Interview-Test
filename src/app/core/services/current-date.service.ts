import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class CurrentDateService {
    #selectedDate: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());

    set selectedDate(date: Date | null) {
        if (date instanceof Date) {
            this.#selectedDate.next(date);
        }
    }

    get selectedDate(): BehaviorSubject<Date> {
        return this.#selectedDate;
    }
}
