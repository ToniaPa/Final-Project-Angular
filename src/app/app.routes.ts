import { Routes } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';
import { RegistrationOfDataComponent } from './components/registration-of-data/registration-of-data.component';

export const routes: Routes = [
  { path: '', component: IntroComponent },
  { 
    path: 'registration-of-data',
    component: RegistrationOfDataComponent
  },
];
