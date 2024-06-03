import { Routes } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';
import { WorkersComponent } from './components/workers/workers.component';
import { ClientsComponent } from './components/clients/clients.component';
import { WorkTypesComponent } from './components/work-types/work-types.component';
import { TimeSheetComponent } from './components/time-sheet/time-sheet.component';


export const routes: Routes = [
  { path: '', component: IntroComponent },
  {
    path: 'workers',
    component: WorkersComponent,
  },
  {
    path: 'clients',
    component: ClientsComponent,
  },
  {
    path: 'work-types',
    component: WorkTypesComponent,
  },
  {
    path: 'time-sheet',
    component: TimeSheetComponent,
  },
];
