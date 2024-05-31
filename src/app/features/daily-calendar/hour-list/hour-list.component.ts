import { Component } from '@angular/core';

@Component({
  selector: 'app-hour-list',
  standalone: true,
  imports: [],
  templateUrl: './hour-list.component.html',
  styleUrl: './hour-list.component.scss'
})
export class HourListComponent {
  hours: string[] = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0') + ':00');
}
