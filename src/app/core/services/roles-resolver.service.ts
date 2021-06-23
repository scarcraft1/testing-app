import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleType } from '../types';
import { UsersService } from './users.service';

@Injectable({ providedIn: 'root' })
export class RolesResolverService implements Resolve<RoleType[]> {
  constructor(private service: UsersService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<RoleType[]> | Promise<RoleType[]> | RoleType[] {
    return [RoleType.Developer, RoleType.Admin];
  }
}
