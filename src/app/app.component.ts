import { Component } from '@angular/core';
import { AuthService } from './home/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user';
  validUser: boolean;
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authservice.xuser.subscribe(user =>{
        this.isAuthenticated = !!user;
    });
    this.authservice.userv.subscribe(data=>{
         if(data=='admin'){
          this.validUser=false;           
         }else{
          this.validUser=true;
         }
    })
  }

  onloggOut(){
    this.authservice.logout();
    this.router.navigateByUrl('/');
  }

  getUservalue(isUser){
  if(isUser=="user"){
     this.validUser=true;
  }else{
     this.validUser=false;
  }
  console.log(this.validUser)
  }
  
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
