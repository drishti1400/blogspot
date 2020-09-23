import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
@ViewChild('f') AddForm: NgForm;
  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.firestore.collection('news').add(this.AddForm.value);
    this.AddForm.reset();
  }

}
