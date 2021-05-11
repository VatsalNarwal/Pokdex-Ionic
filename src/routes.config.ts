import { Routes } from '@angular/router';

export const routes:Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./app/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home/:id',
    loadChildren: () =>
      import('./app/details/details.module').then((m) => m.DetailsPageModule),
  },
];
