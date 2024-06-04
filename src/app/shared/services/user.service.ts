import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Credentials, LoggedInUser, User } from '../interfaces/mongo-backend';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

const API_URL = `${environment.apiURL}/user`; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http: HttpClient = inject(HttpClient); //εγώ είμαι ο HttpClient

  //*** User Login: ***//
  user = signal<LoggedInUser | null>(null) //Signals are getter functions - calling them reads their value => ΓΡΑΦΟΝΤΑΣ ΚΑΠΟΥ user() ΟΥΣΙΑΣΤΙΚΑ ΓΡΑΦΟΥΜΕ ΤΗΝ Getter function ΚΑΙ ΠΑΙΡΝΟΥΜΕ ΤΗΝ ΤΙΜΗ ΤΟΥ SIGNAL (σημ.: η user() έχει παρενθέσεις -> είναι η getter)
  // Signals, introduced in Angular 16, they are a wrapper around a value that can notify interested consumers when the value changes. 

  router: Router = inject(Router); 

  constructor() { //είμαι στον constructor
    // login με:
    // username: tonia@aueb.gr, adonis@aueb.gr
    // password: 1234

    const access_token = localStorage.getItem('access_token'); //localStorage = μας το δίνει η angular -> There are essentially three ways to store information for usage in your Angular app: as variable, as local storage, or on a database. Local Storage in Angular JS allows the developers to store some data in the browser itself to access it almost instantly without any HTTP request. 
    if(access_token) { //έχει κωδικοποιημένη την πληροφορία για το ποιος είναι ο User που έχει access
      const decodedTokenSubject = jwtDecode(access_token).sub as unknown as LoggedInUser; 
      this.user.set({ //EΔΩ ΕΙΝΑΙ Η Setter function ΤΟΥ SIGNAL με SET we change it directly, Υπάρχει και το update to compute a new value from the previous one: this.user.update(value => value + 1);
        fullname: decodedTokenSubject.fullname, 
        email: decodedTokenSubject.email
      });
    }

    //το EFFECT έχει πρόσβαση σε όλα τα signals -> διαβάζουμε το παραπάνω signal
    //στον constructor (υπάρχει λόγος). Στο help της angular γραφει ότι τα EFFECT δεν πολυχρησιμοποιούνται, εκτός εξαιρέσεων. μία εξαίρεση είναι το logging (όπως εδώ).
    // Effects always execute asynchronously, during the change detection process
    effect(() => { 
      if (this.user()) {//= getter του signal
        console.log('User Logged In: ', this.user().fullname)
      } else {
        console.log('No user Logged In')
      }
    })
  }
  
  //*** User Registration: ***//  
  registerUser(user: User) {
    console.log('user.service.ts (registerUser) στοιχεία του user (step 1): ', user)
    console.log(`'user.service.ts (registerUser) url (step 1): ${API_URL}/register`);
    //πηγαίνει στο user_blueprint.py:
    return this.http.post<{ msg: string }>(`${API_URL}/register`, user); //κάνουμε return για να πάρουμε το response, την απάντηση από τον server
  }

  check_duplicate_email(email: string) {
    console.log(`check_duplicate_email url: ${API_URL}/check_duplicate_email/${email}`);
    return this.http.get<{ msg: string }>(      
      `${API_URL}/check_duplicate_email/${email}`,
    );
  }

  loginUser(credentials: Credentials) {  
    console.log(`loginUser url: ${API_URL}/login, from user.services.ts`);    
    //το access_token έχει έρθει από την εκτέλεση της @user.route("/login", methods=["POST"]) στο user_blueprint.py => από εκεί έρχεται εδώ και από εδώ πηγαίνει στο onSubmit() της user-login.ts, μέσα στο next
    return this.http.post<{ access_token: string }>(
      `${API_URL}/login`, 
      credentials,
    );
  };
  
  logoutUser() {
    this.user.set(null); // κάνουμε Null το signal 
    localStorage.removeItem('access_token'); 
    this.router.navigate(['login']); 
  }
}


