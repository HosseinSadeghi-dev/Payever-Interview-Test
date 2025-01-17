import { Component, Inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";

@Component({
    selector: "app-confirm-dialog",
    standalone: true,
    imports: [
        MatDialogActions,
        MatButton,
        MatDialogContent,
        MatDialogTitle
    ],
    templateUrl: "./confirm-dialog.component.html",
    styleUrl: "./confirm-dialog.component.scss"
})
export class ConfirmDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { message: string } = {
            message: "Do you really want to perform this action?"
        }
    ) {}

    onConfirm(): void {
        this.dialogRef.close(true);
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
