import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SnackbarComponent} from "@/app/shared/snackbar/snackbar.component";
import {HeaderComponent} from "@/app/features/header/header.component";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SnackbarComponent,
    HeaderComponent,
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
}
