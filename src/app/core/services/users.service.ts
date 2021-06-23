import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  public isLogged(idUsuario: number) {
    return idUsuario > 3;
  }

  public isAdmin(idUsuario: number) {
    return idUsuario > 5;
  }
}
