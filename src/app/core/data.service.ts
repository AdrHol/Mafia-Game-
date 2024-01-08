import { Injectable } from '@angular/core';
import { AdditionalRole } from '../shared/model/additionalRole';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private additionalRoles: AdditionalRole[] = [];
  constructor() { 
    this.additionalRoles = [new AdditionalRole(1, 'Detevtive', false), new AdditionalRole(2, 'Boss', true)];
  }

  fetchAdditionalRoles(){
    return this.additionalRoles;
  }
}
