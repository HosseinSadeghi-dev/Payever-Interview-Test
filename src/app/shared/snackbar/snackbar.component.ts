import {
    animate, style, transition, trigger
} from "@angular/animations";
import { AsyncPipe, NgClass, NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";

import { SnackbarService } from "@/app/shared/snackbar/services/snackbar.service";

@Component({
    selector: "app-snackbar",
    templateUrl: "./snackbar.component.html",
    styleUrls: ["./snackbar.component.scss"],
    animations: [
        trigger("state", [
            transition(":enter", [
                style({
                    opacity: 0,
                }),
                animate("0.5s ease-out", style({
                    opacity: 1,
                })),
            ]),
            transition(":leave", [
                style({
                    opacity: 1,
                }),
                animate("0.5s ease", style({
                    opacity: 0,
                })),
            ]),
        ])
    ],
    imports: [
        NgIf,
        NgClass,
        AsyncPipe
    ],
    standalone: true
})
export class SnackbarComponent {
    readonly snackbarService: SnackbarService = inject(SnackbarService);
}
