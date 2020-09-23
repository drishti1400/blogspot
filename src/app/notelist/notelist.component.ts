import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { NgForm } from '@angular/forms';
import { WuserService } from '../wuser.service';
import { Article } from '../article';


@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.component.html',
  styleUrls: ['./notelist.component.css']
})
export class NotelistComponent implements OnInit {
  results: Article[];

  constructor(private service: WuserService) { }

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

}
