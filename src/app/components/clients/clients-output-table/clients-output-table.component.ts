import { Component, Inject, inject } from '@angular/core';
import { ClientUpdateComponent } from '../client-update/client-update.component';
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClientService } from 'src/app/shared/services/client.service';
import { SharedataService } from 'src/app/shared/data/sharedata.service';
import { Client } from 'src/app/shared/interfaces/mongo-backend';
import { MatDialog } from '@angular/material/dialog';
import { ClientOutputDetailsComponent } from '../client-output-details/client-output-details.component';
import { ConfirmYesnoDialogComponent } from '../../confirm-yesno-dialog/confirm-yesno-dialog.component';
import { sortBy } from 'lodash';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clients-output-table',
  standalone: true,
  imports: [
    DialogModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterLink,   
    ClientUpdateComponent,
    FormsModule ,
    MatSnackBarModule,
  ],
  templateUrl: './clients-output-table.component.html',
  styleUrl: './clients-output-table.component.css'
})
export class ClientsOutputTableComponent {
  // router = inject(Router);
  clientService = inject(ClientService);
  sharedataService = inject(SharedataService);

  clients: Client[];
  filteredClients: any[] = [];
  searchInput: string;

  constructor(
    public dialog: Dialog,
    public matDialog: MatDialog,    
  ) {};
 
  snackBar = inject(MatSnackBar)

  get_all_clients() {
    this.clientService.getAllClients().subscribe({
      next: (response) => {
        console.log("clients-output-table.ts (get_all_clients) success");
        this.clients = response;
        this.filteredClients = this.clients
        console.log("clients =", this.clients)      
      },
      error: (response) => {
        const message = response.error.msg;
        console.log("clients-output-table.ts (get_all_clients)  error: ", message);
        // this.form.get('email').setErrors({ duplicateEmail: true });
      },
    });
  }
 
  delete_client(client: Client) {
    console.log("onClientDeleteClicked() from clients-output-table.ts: ", client)
    let afm: string = ''
    afm = client.afm
    // afm = client.afm
    console.log("onClientDeleteClicked() from clients-output-table.ts, AFM: ", afm)
    // this.clientService.deleteClient(client.afm).subscribe({
      this.clientService.deleteClient(afm).subscribe({
      next: (response) => {        
        console.log(`Client: ${client.brandName}, with Afm: ${client.afm} was deleted successfully`);  
        console.log(response);
        this.snackBar.open('Client deleted successfully!', 'Close', {
          duration: 3000, // Duration in milliseconds (3 seconds)  
        });
        this.get_all_clients();
      },
      error: (response) => {
        const message = response.error.msg;
        console.error(`There was an error in deleting Client ${client.brandName} with Afm ${client.afm}`, message);       
      }
    });
  }

  //Sorting
  sortOrder = {
    brandName: 'none',    
    email: 'none',
    afm: 'none',
  };

  sortData(sortKey: string) { //εναλλαγή μεταξύ asc και desc:
    if (this.sortOrder[sortKey] === 'asc') { // το sortOrder είναι object
      this.sortOrder[sortKey] = 'desc';
      this.filteredClients = sortBy(this.filteredClients, sortKey).reverse(); //sortBy είναι μέθοδος της lodash, η reverse είναι μεθοδος της typescript      
    } else {
      this.sortOrder[sortKey] = 'asc';
      this.filteredClients = sortBy(this.filteredClients, sortKey); //sortBy είναι μέθοδος της lodash
    };

    for (let key in this.sortOrder) {
      if (key !== sortKey) {
        this.sortOrder[key] = 'none'; //= init all other fields, except the one for sorting
      }
    };
  };

  sortSign(sortKey: string) {
    if (this.sortOrder[sortKey] === 'asc') {
      return '↑';
    } else if (this.sortOrder[sortKey] === 'desc') {
      return '↓';
    } else {
      return '';
    };
  };
  //end of Sorting

  //Search
  filterClients(): void {
    this.filteredClients = this.clients;  
    // alert(this.searchInput);    
    const lowerCaseQuery = this.searchInput.toLowerCase().trim();
    this.filteredClients = this.clients.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(lowerCaseQuery)
      )
    );
    // console.log("filter:", lowerCaseQuery)
    // console.log("filtered clients: ", this.filteredClients);
  }

  clearFilterClients(): void {
    this.searchInput = '';
    this.filteredClients = this.clients;
  }
  //end of Search

  //
  ngOnInit(): void {    
    this.get_all_clients();
    // this.filteredClients = this.clients;
  }

  onClientDetailsClicked(client: Client) { 
    console.log("dblclicked/clicked for details: ", client)   
    this.dialog.open(ClientDialogComponent, {     
      data: client,
    });
  };
 
  onClientEditClicked(client: Client) { 
    // console.log("clicked for edit: ", client)   
    this.sharedataService.sendClient(client); // μέσω του SharedataService
  };

  onClientDeleteClicked(client: Client) { 
    console.log("clicked for delete: ", client)
    const dialogRef = this.matDialog.open(ConfirmYesnoDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete client: ${client.brandName}?`}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Perform the deletion action
        this.delete_client(client);
        console.log('Yes clicked');
      } else {
        // Cancel the deletion action
        console.log('No clicked');
      }
    });       
  };

}
// end of class ClientsOutputTableComponent
  

//χειρoκίνητο component, το φτιάχνουμε εμείς
@Component({
  imports: [ClientOutputDetailsComponent],
  standalone: true,
  template: `
  <!-- <app-client-output-details [client]="client"></app-client-output-details>     -->
   <app-client-output-details [client]="client"></app-client-output-details>
    <button class="btn btn-light btn-sm bg-dark-subtle" (click)="dialogRef.close()">
      Close
    </button>
  `,
  styles: [
    `
      :host {
        display: block;
        background: #fff;
        border-radius: 8px;
        padding: 16px;
        max-width: 500px;
      }
    `,
  ],
})
class ClientDialogComponent {
  constructor(
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public client: Client,
  ) {}
}

