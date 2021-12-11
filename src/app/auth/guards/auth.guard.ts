import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      return this.authService.checkAuthentication()
        .pipe(
          tap( ifAuth => {
            if(!ifAuth){
              this.router.navigate(['./auth']);
            }
          })
        );

      // if( this.authService.auth.id ){
      //   return true;
      // }

      // console.log('Bloqueado por el AuthGuard - canActivate');

      // return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      // console.log('canLoad', true);
      // console.log(route);
      // console.log(segments);

      return this.authService.checkAuthentication()
        .pipe(
          tap( ifAuth => {
            if(!ifAuth){
              this.router.navigate(['./auth']);
            }
          })
        );

      // if( this.authService.auth.id ){
      //   return true;
      // }

      // console.log('Bloqueado por el AuthGuard - canLoad');

      // return false;
  }

}
