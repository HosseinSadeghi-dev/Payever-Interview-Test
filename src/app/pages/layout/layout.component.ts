import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SnackbarComponent} from "@/app/shared/snackbar/snackbar.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SnackbarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
}
