import {Routes} from '@angular/router';
import {NotFoundComponent} from "@/app/shared/not-found/not-found.component";
import {LayoutComponent} from "@/app/features/layout/layout.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('@/app/features/daily-calendar/daily-calendar.component').then(c => c.DailyCalendarComponent),
      },
      {
        path: ':year/:month/:day',
        loadComponent: () => import('@/app/features/daily-calendar/daily-calendar.component').then(c => c.DailyCalendarComponent),
      },
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];
