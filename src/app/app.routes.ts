import { Routes } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';
import { WorkersDashboardComponent } from './components/workers/workers-dashboard/workers-dashboard.component';
import { ClientsDashboardComponent } from './components/clients/clients-dashboard/clients-dashboard.component';
import { WorkTypesDashboardComponent } from './components/work-types/work-types-dashboard/work-types-dashboard.component';
import { TimeSheetsDashboardComponent } from './components/time-sheets/time-sheets-dashboard/time-sheets-dashboard.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { WorkerCreateComponent } from './components/workers/worker-create/worker-create.component';
import { WorkersOutputTableComponent } from './components/workers/workers-output-table/workers-output-table.component';
import { WorkerUpdateComponent } from './components/workers/worker-update/worker-update.component';
import { authGuard } from './shared/guards/auth.guard';
import { ClientsOutputTableComponent } from './components/clients/clients-output-table/clients-output-table.component';
import { ClientCreateComponent } from './components/clients/client-create/client-create.component';
import { ClientUpdateComponent } from './components/clients/client-update/client-update.component';
import { TimeSheetsCreateComponent } from './components/time-sheets/time-sheets-create/time-sheets-create.component';


export const routes: Routes = [
  { path: '', component: IntroComponent },
  {
    path: 'workers',
    component: WorkersDashboardComponent,
    canActivate: [authGuard], 
  },
  {
    path: 'clients',
    component: ClientsDashboardComponent,
    canActivate: [authGuard], 
  },
  // {
  //   path: 'work-types',
  //   component: WorkTypesDashboardComponent,
  //   canActivate: [authGuard], 
  // },
  {
    path: 'time-sheet',
    component: TimeSheetsDashboardComponent,
    canActivate: [authGuard], 
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
    path: 'workers-dashboard/show-all-workers',
    component: WorkersOutputTableComponent,
    // canActivate: [authGuard], 
  },
  {
    path: 'workers-dashboard/create',
    component: WorkerCreateComponent,
    // canActivate: [authGuard], 
  },
  {
    path: 'workers-dashboard/update',
    component: WorkerUpdateComponent,
    // canActivate: [authGuard], 
  },
  {
    path: 'clients-dashboard',
    component: ClientsDashboardComponent,
    // canActivate: [authGuard],
  },  
  {
    path: 'clients-dashboard/show-all-clients',
    component: ClientsOutputTableComponent,
    // canActivate: [authGuard], 
  },
  {
    path: 'clients-dashboard/create',
    component: ClientCreateComponent,
    // canActivate: [authGuard], 
  },
  {
    path: 'clients-dashboard/update',
    component: ClientUpdateComponent,
    // canActivate: [authGuard], 
  },
  {
    path: 'time-sheets-dashboard',
    component: TimeSheetsDashboardComponent,
    // canActivate: [authGuard],
  },  
  //{
  //   path: 'time-sheets-dashboard/show-all-timesheets',
  //   component: ,
  //   // canActivate: [authGuard], 
  // },
  {
    path: 'time-sheets-dashboard/create',
    component: TimeSheetsCreateComponent,
    // canActivate: [authGuard], 
  },
  // {
  //   path: 'time-sheets-dashboard/update',
  //   component: ,
  //   // canActivate: [authGuard], 
  // },


];
