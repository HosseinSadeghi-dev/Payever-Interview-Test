import {Component, output, OutputEmitterRef} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {TodayBtnComponent} from "@/app/shared/today-btn/today-btn.component";
import {ChangeDayBtnComponent} from "@/app/shared/change-day-btn/change-day-btn.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    TodayBtnComponent,
    ChangeDayBtnComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  toggleSidenav: OutputEmitterRef<boolean> = output<boolean>()
}
