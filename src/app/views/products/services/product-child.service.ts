import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root'
})
export class ProductChildService implements CanActivateChild {

  constructor(private userService: UsersService) { }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userService.isLogged(6);
  }
}
