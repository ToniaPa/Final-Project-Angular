import { AfterViewInit, Component, Input, OnInit, inject, HostListener, Inject } from '@angular/core';
import { Subscription, async } from 'rxjs';
import { SharedataService } from 'src/app/shared/data/sharedata.service';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { timer } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ClientService } from 'src/app/shared/services/client.service';
import { Client } from 'src/app/shared/interfaces/mongo-backend';

@Component({
  selector: 'app-client-update',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,    
    MatSnackBarModule,

  ],
  templateUrl: './client-update.component.html',
  styleUrl: './client-update.component.css'
})
export class ClientUpdateComponent {

  router = inject(Router);
  snackBar = inject(MatSnackBar)
 
  @HostListener('window:load', ['$event'])
  onPageLoad(event: Event) {
    console.log('loaded');
    this.initial_form_values();
  }
 
  sharedataService = inject(SharedataService);
  clientService = inject(ClientService);

  client: any;  

  constructor(){
    console.log('constructor');
    this.sharedataService.clientData$.subscribe((clientData) => {    
      // παίρνω τα data του client δια μέσω του SharedataService
      // αυτό επειδή δεν την κρατάει εκτός του .subscribe, 
      // ενώ εδώ μέσα την έχω μετά που τελειώνει η τιμή εξαφανίζεται => δεν έχω τα data δηλ δεν έχω τον client 
      // (ΔΕΝ ΞΕΡΩ ΓΙΑΤΙ)
      this.sharedataService.clientData = clientData; //εδώ έχω τα data (είμαι μέσα στο .subscribe) => τα στέλνω στο SharedataService
    });   
    this.client = this.sharedataService.clientData //τα (ξανα)παίρνω πίσω ΑΠΟ ΤΟ SharedataService   
    this.initial_form_values();
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this.initial_form_values();  
  }

  ngOnInit(): void {
    console.log('ngOnInit');    
    this.initial_form_values();  
    // this.delayedFunction(); //ΔΕΝ ΕΧΕΙ ΝΑ ΚΑΝΕΙ ΜΕ DELAY => την 1η φορά που εμφανίζεται το component ΔΕΝ έχω τα data...
  }

  async delayedFunction() {
    console.log('Before delay');
    await this.delay(2000); // Wait for 2000 milliseconds (2 seconds)
    console.log('After delay');
    this.initial_form_values(); 
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
//****************//
  form = new FormGroup({    
    brandName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    afm: new FormControl({ value: '', disabled: true }, 
                          [Validators.required, 
                           Validators.minLength(9),
                           Validators.maxLength(9),
                           Validators.pattern('^[0-9]*$'),]),
    phoneNumbers: new FormArray([ //FormArray
      new FormGroup({
        number: new FormControl('', [Validators.required,
                                     Validators.minLength(10),
                                     Validators.pattern('^[0-9+]*$'),]),
        type: new FormControl('', Validators.required),
      }),
    ]),
    address: new FormGroup({
      street: new FormControl('', Validators.required),
      number: new FormControl('', [Validators.required, 
                                   Validators.pattern('^[1-9][0-9a-zA-Z]*$'),
                                   Validators.minLength(1),
                                   Validators.maxLength(5)]
                             ),
      city: new FormControl('', Validators.required),
      country: new FormControl('Greece', Validators.required),
      zipCode: new FormControl('', [Validators.required, Validators.minLength(5)])
    }),
  });

  // o χρήστης μπορεί να προσθέσει αρ. τηλεφώνου δυναμικά
  // όταν βάζει ένα τηλέφωνο ενεργοποιείται ένα + στα δεξιά
  // όπου μπορεί να βαλει κι άλλο τηλέφωνο
  phoneNumbers = this.form.get('phoneNumbers') as FormArray;

  addPhoneNumber() { 
    this.phoneNumbers.push(
      new FormGroup({
        number: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
      }),
    );
  }

  removePhoneNumber(index: number) {
    this.phoneNumbers.removeAt(index);
  }

  update(value: any) {
    console.log(this.form.value);
    const client = this.form.value as Client
    // let afm: string = ''
    // afm = client.afm   
    this.clientService.updateClientByAfm(client.afm, client).subscribe({
      next: (response) => {
        this.router.navigate(['clients-dashboard']);
        this.snackBar.open('Client updated successfully!', 'Close', {
          duration: 3000, // Duration in milliseconds (3 seconds)  
        });

      },
      error: (response) => {
        const message = response.error.msg;
        console.error('There was an error in adding a Client!', message);   
      }    
    })       

  }
  
  initial_form_values(): void {
    if (this.client == null) {
      console.log("null client")      
      this.form.disable()
      this.snackBar.open('THE FIRST TIME I DO NOT HAVE DATA, PLEASE TRY AGAIN!', 'Close', {
        duration: 3000, // Duration in milliseconds (3 seconds)  
        // horizontalPosition: 'right',
        verticalPosition: 'bottom',        
        panelClass: 'custom-snackbar"',
      })
    } else {
      this.form.enable()
      // this.form.get('afm').disable(); δεν δουλεύει το update!!!
      this.form.patchValue({              
        brandName: this.client.brandName,
        email: this.client.email,
        afm: this.client.afm,      
        phoneNumbers: [
          {type: this.client.phoneNumbers[0].type , number: this.client.phoneNumbers[0].number},        
        ],
        address: {
          street: this.client.address.street,
          number: this.client.address.number,
          city: this.client.address.city,
          country: this.client.address.country,
          zipCode: this.client.address.zipCode
        }                    
      }      
     );      
    }
  }

  undo_changes() {
    this.initial_form_values();
  }

  disable_afm() {
    // this.form.get('afm').disable(); δεν δουλεύει το update!!!
  }

}
