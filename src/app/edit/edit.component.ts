import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { NgForm } from '@angular/forms';
import { WuserService } from '../wuser.service';
import { Article } from '../article';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
 @ViewChild('f') AddForm: NgForm;
  results: Article[];
  cid : any;

  constructor(private service: WuserService,private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.service.getArticles().subscribe(data =>{
      this.results=data.map(item =>{
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()} as Article;
      })
      });
      console.log(this.results);
  }

  onEdit(){
      this.firestore.collection('news').doc(this.cid)
       .set(this.AddForm.value);
    this.AddForm.reset();
    this.closeForm(); 
  }

  onDelete(id){
    this.firestore.doc('news/'+id).delete();
  }

   openForm(result) {
    document.getElementById("myForm").style.display = "block";
   this.AddForm.setValue({
      title: result.title,
      article: result.article,
      publisher: result.publisher,
      id: result.id
    });
    this.cid=this.AddForm.value.id;
  }

 closeForm() {
  document.getElementById("myForm").style.display = "none";
}

onSubmit(){
    this.AddForm.reset();
   }


}
