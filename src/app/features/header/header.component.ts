import { Component, output, OutputEmitterRef } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatToolbar } from "@angular/material/toolbar";

import { ChangeDayBtnComponent } from "@/app/shared/change-day-btn/change-day-btn.component";
import { TodayBtnComponent } from "@/app/shared/today-btn/today-btn.component";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [
        MatToolbar,
        MatIcon,
        MatIconButton,
        TodayBtnComponent,
        ChangeDayBtnComponent
    ],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss"
})
export class HeaderComponent {
    toggleSidenav: OutputEmitterRef<boolean> = output<boolean>();
}
