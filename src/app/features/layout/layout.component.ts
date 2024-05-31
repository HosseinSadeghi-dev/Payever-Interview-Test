import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SnackbarComponent} from "@/app/shared/snackbar/snackbar.component";
import {HeaderComponent} from "@/app/features/header/header.component";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {CalendarComponent} from "@/app/features/calendar/calendar.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SnackbarComponent,
    HeaderComponent,
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    CalendarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
}
