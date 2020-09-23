import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {  AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') AddForm: NgForm;
   private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
   newUser: any;
  constructor(private auth : AuthService,private firestore: AngularFirestore,private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.AddForm.value.email,this.AddForm.value.password)
    /*this.afAuth.createUserWithEmailAndPassword(this.AddForm.value.email,this.AddForm.value.password)
    .then( userCredential =>{
      this.newUser= this.AddForm.value;
      console.log(userCredential);

      this.auth.insertUserData(userCredential)
      .then(() => {
          console.log('successful');
      }).catch(error => {
        console.log(error);
        this.eventAuthError.next(error);
      })
    })*/
    this.auth.createUser(this.AddForm.value);
     
    this.AddForm.reset();
  }

  

}
