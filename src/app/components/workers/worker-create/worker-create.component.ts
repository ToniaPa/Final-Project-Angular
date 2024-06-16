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
import { WorkerService } from 'src/app/shared/services/worker.service';
import { Worker } from 'src/app/shared//interfaces/mongo-backend';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-worker-create',
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
  templateUrl: './worker-create.component.html',
  styleUrl: './worker-create.component.css'
})
export class WorkerCreateComponent {

  workerService = inject(WorkerService);

  registrationStatus: { success: boolean; message: string } = {
    success: false, //initial value
    message: 'Not attempted yet', //initial value
  };

  form = new FormGroup({
    givenName: new FormControl('', Validators.required),
    surName: new FormControl('', Validators.required),
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

    const worker = this.form.value as Worker
    this.workerService.createWorker(worker).subscribe({
      next: (response) => {
        this.form.reset();
        this.registrationStatus = { success: true, message: response.msg };
        // alert("Worker created")
      },
      error: (response) => {
        const message = response.error.msg;
        console.error('There was an error in adding a Worker!', message);
        this.registrationStatus = { success: false, message }; 
      }
    })       
  }


  addAnotherWorker() {   
    this.form.reset(); 
    this.registrationStatus = { success: false, message: 'Not attempted yet' };
  }

  addAgainWorker() {       
    this.registrationStatus = { success: false, message: 'Not attempted yet' };
  }
}
