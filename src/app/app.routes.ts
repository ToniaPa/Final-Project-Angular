import { Routes } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';
import { WorkersDashboardComponent } from './components/workers/workers-dashboard/workers-dashboard.component';
import { ClientsDashboardComponent } from './components/clients/clients-dashboard/clients-dashboard.component';
import { WorkTypesDashboardComponent } from './components/work-types/work-types-dashboard/work-types-dashboard.component';
import { TimeSheetsDashboardComponent } from './components/time-sheets/time-sheets-dashboard/time-sheets-dashboard.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { WorkerCreateComponent } from './components/workers/worker-create/worker-create.component';


export const routes: Routes = [
  { path: '', component: IntroComponent },
  {
    path: 'workers',
    component: WorkersDashboardComponent,
  },
  {
    path: 'clients',
    component: ClientsDashboardComponent,
  },
  {
    path: 'work-types',
    component: WorkTypesDashboardComponent,
  },
  {
    path: 'time-sheet',
    component: TimeSheetsDashboardComponent,
  },
  {
    path: 'user-login',
    component: UserLoginComponent,
  },
  {
    path: 'user-registration',
    component: UserRegistrationComponent,
  },
  {
    path: 'workers-dashboard',
    component: WorkersDashboardComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'workers-dashboard/create',
    component: WorkerCreateComponent,
    // canActivate: [authGuard], 
  },
  // {
  //   path: 'workers-dashboard/read',
  //   component: CrudReadExampleComponent,
  //   // canActivate: [authGuard], 
  // },
  // {
  //   path: 'workers-dashboard/update',
  //   component: CrudUpdateExampleComponent,
  //   // canActivate: [authGuard], 
  // },
  // {
  //   path: 'workers-dashboard/delete',
  //   component: CrudDeleteExampleComponent,
  //   // canActivate: [authGuard], 
  // },
];
