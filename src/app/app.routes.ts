import {Routes} from '@angular/router';
import {NotFoundComponent} from "@/app/shared/not-found/not-found.component";
import {LayoutComponent} from "@/app/pages/layout/layout.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: []
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];
