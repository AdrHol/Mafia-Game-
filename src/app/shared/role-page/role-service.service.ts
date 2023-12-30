import { Injectable } from '@angular/core';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {
  roles: Role[] = [
    {
      id: 1,
      name: 'Mafia',
      description: 'Test'
    },
    {
      id: 2,
      name: 'Obywatel',
      description: 'Test'
    },
    {
      id: 3,
      name: 'Detektyw',
      description: 'Test'
    },
    {
      id: 4,
      name: 'Test',
      description: 'Test'
    },
    {
      id: 5,
      name: 'Kot',
      description: 'Test'
    },
    {
      id: 6,
      name: 'Pies',
      description: 'Test'
    },
    {
      id: 6,
      name: 'Pies',
      description: 'Test'
    },
    {
      id: 6,
      name: 'Pies',
      description: 'Test'
    },
  ];
  constructor() { }

  getRoles(){
    return this.roles;
  }
}
