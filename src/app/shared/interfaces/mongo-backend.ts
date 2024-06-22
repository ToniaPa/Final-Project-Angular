// All interfaces for MongoDB backend

import { Time } from "@angular/common";

// *** User Login***//
export interface User {
  givenName: string;
  surName: string;
  email: string;
  password: string;
}

export interface Credentials { //τα διεπιστευτήρια ενός χρήστη, από αυτά εξαρτάται εάν θα γίνει logged in ή όχι
  email: string;
  password: string;
}

export interface LoggedInUser { //εδώ κρατάω την πληροφορία για τον User που μου στέλνει το backend δηλ το ποιός έχει κάνει Login (ποιος είναι)
  fullname: string;
  email: string;
  //δες final-project-angular-backend -> src -> user_blueprint.py
  //συγκεκριμένα το @user.route("/login", methods=["POST"])
  //εκεί βλέπω τι μου επιστρέφει το backend στο Login του user
}
//*** end of User Login***//


export interface Address {
  street: string;
  number: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface PhoneNumber{
  number: string;
  type: string;
}

//*** Worker ***//
export interface Worker {
  // id: string;
  givenName: string;
  surName: string;
  email: string;
  afm: string;
  phoneNumbers: PhoneNumber[]
  address: Address 
 }
//*** end of Worker ***//

//*** Client ***//
export interface Client {
  // id: string;
  brandName: string;    
  email: string;
  afm: string;
  phoneNumbers: PhoneNumber[]
  address: Address 
 }
//*** end of Client ***//

//*** Timesheet ***//

export interface Timesheet {
  dateOfWork: Date;
  // dateOfWork: string;
  workerGivenName: string;
  workerSurName: string;   
  workerAfm: string;
  clientBrandName: string; 
  clientAfm: string;     
  typeOfWork: string; 
  // hourFrom: Time;
  // hourTo: Time; 
  hourFrom: string;
  hourTo: string;   
}

// export interface HourRecord{
//   hour: number;
//   minute: number;
// }

// export interface WorkerClientWorkHours {
//   workerGivenName: string;
//   workerSurName: string;   
//   workerAfm: string;
//   clientBrandName: string; 
//   clientAfm: string;     
//   typeOfWork: string; 
//   hourFrom: HourRecord;
//   hourTo: HourRecord; 
//   additionalInfo: string; 
// }

// export interface Timesheet {
//   dateOfWork: Date;
//   detailsOfWork: WorkerClientWorkHours[];
// }
//*** end of Timesheet ***//