import { Injectable } from '@angular/core';
import { AdditionalRole } from '../shared/model/additionalRole';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private additionalRoles: AdditionalRole[] = [];
  constructor() { 
    this.additionalRoles = [new AdditionalRole(1, 'Detevtive', false), new AdditionalRole(2, 'Boss', true), new AdditionalRole(3, 'Kot', false)];
  }

  fetchAdditionalRoles(){
    return this.additionalRoles;
  }
  fetchGameMessages(){
    return {
      everyoneSleep: 'Wszyscy spia',
      mafiaWake: 'Mafia się budzi',
      citizensWake: 'Budzą się mieszkancy'
    }
  }
  loadMafiaCounts(){
    const mafiaCounts = new Map();
    mafiaCounts.set("TIER0", 1);
    mafiaCounts.set("TIER1", 2);
    mafiaCounts.set("TIER2", 3);
    mafiaCounts.set("TIER3", 4);
    mafiaCounts.set("TIER4", 5);
    return mafiaCounts;
  }
}
