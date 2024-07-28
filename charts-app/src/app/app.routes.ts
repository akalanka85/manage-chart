import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeResolver } from './home/home.resolver';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent, resolve: { record: HomeResolver }, },
      { path: 'settings', component: SettingsComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];
