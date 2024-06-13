import { AfterViewInit, Component, Input, OnInit, inject, HostListener } from '@angular/core';
import { Subscription, async } from 'rxjs';
import { SharedataService } from 'src/app/shared/data/sharedata.service';
import { Worker } from 'src/app/shared/interfaces/mongo-backend';
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
import { timer } from 'rxjs';

@Component({
  selector: 'app-worker-update',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,  
    ],
  templateUrl: './worker-update.component.html',
  styleUrl: './worker-update.component.css'
})
export class WorkerUpdateComponent implements OnInit, AfterViewInit{

 
  @HostListener('window:load', ['$event'])
  onPageLoad(event: Event) {
    console.log('loaded');
    this.set_form_values();
  }
 
  sharedataService = inject(SharedataService);
  workerService = inject(WorkerService);

  worker: any;

  constructor(){
    console.log('constructor');
    this.sharedataService.workerData$.subscribe((workerData) => {    
      // παίρνω τα data του worker δια μέσω του SharedataService
      // αυτό επειδή δεν την κρατάει εκτός του .subscribe, 
      // ενώ εδώ μέσα την έχω μετά που τελειώνει η τιμή εξαφανίζεται => δεν έχω τα data δηλ δεν έχω τον worker 
      // (ΔΕΝ ΞΕΡΩ ΓΙΑΤΙ)
      this.sharedataService.workerData = workerData; //εδώ έχω τα data (είμαι μέσα στο .subscribe) => τα στέλνω στο SharedataService
    });   
    this.worker = this.sharedataService.workerData //τα (ξανα)παίρνω πίσω ΑΠΟ ΤΟ SharedataService
    // this.set_form_values();
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this.set_form_values();  
  }

  ngOnInit(): void {
    console.log('ngOnInit');    
    this.set_form_values();  
    // this.delayedFunction(); //ΔΕΝ ΕΧΕΙ ΝΑ ΚΑΝΕΙ ΜΕ DELAY => την 1η φορά που εμφανίζεται το component ΔΕΝ έχω τα data...
  }

  async delayedFunction() {
    console.log('Before delay');
    await this.delay(2000); // Wait for 2000 milliseconds (2 seconds)
    console.log('After delay');
    this.set_form_values(); 
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
//****************//
  form = new FormGroup({
    givenName: new FormControl('', Validators.required),
    surName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    afm: new FormControl('', Validators.required),
    phoneNumbers: new FormArray([ //FormArray
      new FormGroup({
        number: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
      }),
    ]),
    address: new FormGroup({
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required),
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
    // console.log(this.form.value);

    // const worker = this.form.value as Worker
    // this.workerService.createWorker(worker).subscribe({
    //   next: (response) => {
    //     this.form.reset();
    //     // this.registrationStatus = { success: true, message: response.msg };
    //     // alert("Worker created")
    //   },
    //   error: (response) => {
    //     const message = response.error.msg;
    //     console.error('There was an error in adding a Worker!', message);
    //     // this.registrationStatus = { success: false, message }; 
    //   }
    // })       
  }
  
  set_form_values(): void {
    if (this.worker == null) {
      console.log("null worker")      
      this.form.disable()
    } else {
      this.form.enable()
      this.form.patchValue({      
        givenName: this.worker.givenName,
        surName: this.worker.surName,
        email: this.worker.email,
        afm: this.worker.afm,      
        phoneNumbers: [
          {type: this.worker.phoneNumbers[0].type , number: this.worker.phoneNumbers[0].number},        
        ],
        address: {
          street: this.worker.address.street,
          number: this.worker.address.number,
          city: this.worker.address.city,
          country: this.worker.address.country,
          zipCode: this.worker.address.zipCode
        }          
      });
    }
  }

  undo_changes() {
    this.set_form_values();
  }

}
