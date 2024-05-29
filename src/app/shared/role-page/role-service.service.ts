import { Injectable } from '@angular/core';
import { RoleDTO } from '../model/roleDTO';

import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {

  private API_URL = 'http://localhost:8080/data';
  
  constructor(private htmlClient: HttpClient) { }

  fetchRoles(): Observable<RoleDTO[]> {
    let array = this.htmlClient.get<RoleDTO[]>(this.API_URL);
    return array;
  }
}
