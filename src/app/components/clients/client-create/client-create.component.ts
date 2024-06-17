import { Component, inject } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/shared/services/client.service';
import { Client } from 'src/app/shared/interfaces/mongo-backend';

@Component({
  selector: 'app-client-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,    
    CommonModule,
  ],
  templateUrl: './client-create.component.html',
  styleUrl: './client-create.component.css'
})
export class ClientCreateComponent {
  router = inject(Router);
  clientService = inject(ClientService);

  registrationStatus: { success: boolean; message: string } = {
    success: false, //initial value
    message: 'Not attempted yet', //initial value
  };

  form = new FormGroup({
    brandName: new FormControl('', Validators.required),   
    email: new FormControl('', [Validators.required, Validators.email]),
    afm: new FormControl('', [Validators.required, 
                              Validators.minLength(9),
                              Validators.maxLength(9),
                              Validators.pattern('^[0-9]*$'),
                             ]
                        ),
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
                                   Validators.maxLength(5)]),
      city: new FormControl('', Validators.required),
      country: new FormControl('Greece', [Validators.required, 
                                          Validators.minLength(5)]),
      zipCode: new FormControl('', Validators.required),
    }),
  });

  // o χρήστης μπορεί να προσθέσει αρ. τηλεφώνου δυναμικά
  // όταν βάζει ένα τηλέφωνο ενεργοποιείται ένα + στα δεξιά
  //όπου μπορεί να βαλει κι άλλο τηλέφωνο
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

//   <div class="d-flex gap-2">
//   <button                   
//     (click)="submit(form.value)"
//     [disabled]="form.invalid"
//   >
//     Submit
//   </button>
//   <button mat-button style ="color: gray; font-style: italic;" (click)="form.reset()">
//     Reset
//   </button>
// </div>
  // στο submit μιλάμε με το service
  submit(value: any) {
    console.log(this.form.value);

    const client = this.form.value as Client
    this.clientService.createClient(client).subscribe({
      next: (response) => {
        this.form.reset();
        this.registrationStatus = { success: true, message: response.msg };
        // alert("Client created")
      },
      error: (response) => {
        const message = response.error.msg;
        console.error('There was an error in adding a Client!', message);
        this.registrationStatus = { success: false, message }; 
      }
    })       
  }


  addAnotherClient() {   
    this.form.reset(); 
    this.registrationStatus = { success: false, message: 'Not attempted yet' };
  }

  addAgainClient() {       
    this.registrationStatus = { success: false, message: 'Not attempted yet' };
  }

}
