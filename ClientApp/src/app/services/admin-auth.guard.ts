import { AuthGuard } from './auth.guard';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard extends AuthGuard {
  constructor(auth: AuthService, private router: Router) {
    super(auth);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
    var isAuthenticated = super.canActivate(next, state);
    return isAuthenticated ? this.auth.isInRole('Admin') : false;
  }
}
