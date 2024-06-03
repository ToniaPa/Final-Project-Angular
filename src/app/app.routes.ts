import { Routes } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';


export const routes: Routes = [
  { path: '', 
    component: IntroComponent 
  },
  { 
    // path: 'registrations-of-data',
    // component: RegistrationsOfDataComponent
  },
  {
    // path: 'registrations-of-data/worker-create',
    // component: WorkerCreateComponent,
    // canActivate: [authGuard], //πρώτα κάνουμε login και μετά μπαίνουμε στην CRUD οθόνη (αυτή είναι η λογική της εφαρμογής)
  },
];
