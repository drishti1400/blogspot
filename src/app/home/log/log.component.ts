import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {  AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
@ViewChild('f') AddForm: NgForm;

constructor(private auth : AuthService,private firestore: AngularFirestore,private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.auth.login(this.AddForm.value.email,this.AddForm.value.password);
    this.router.navigate(["/notelist"])
     this.AddForm.reset();
  }


}
