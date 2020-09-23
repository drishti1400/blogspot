import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthgGuard implements CanActivate {
  
  constructor(private auth : AuthService, private router: Router){}

  /*canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean |UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>  {
      const currentUser = this.auth.currentUser;
    return this.auth.xuser.pipe(map(xuser=>{
            const isauth = !!xuser;
            if(isauth ){return true;}
            return this.router.createUrlTree(['/']);
    }));
  }*/

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    const currentUser = this.auth.currentUser;
    if(currentUser){
      //check if the route is retricted by role
      if(next.data.roles && next.data.roles.indexOf(currentUser.role) === -1){
        //role not authorized
        return false;
        this.router.navigateByUrl("/notelist");          
      }else{
        return true;
        this.router.navigateByUrl('/edit');
      }
     }
  }
  
}
