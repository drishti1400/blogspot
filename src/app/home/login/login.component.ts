import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {  AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isUser:string; 
  @Output() outputUserData = new EventEmitter<string>();
  @ViewChild('f') AddForm: NgForm;
   private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
   newUser: any;
  constructor(private auth : AuthService,private firestore: AngularFirestore,private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    return this.auth.login(this.AddForm.value.email,this.AddForm.value.password);
   // this.outputUserData.emit(this.isUser);
    this.router.navigate(["/notelist"]);
    this.isUser=this.auth.currentUser.role;
    this.outputUserData.emit(this.isUser);
     this.AddForm.reset();
  }

}
