import { Injectable } from '@angular/core';
import { AdditionalRole } from '../shared/model/additionalRole';
import { Message } from '../shared/model/Message';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private additionalRoles: AdditionalRole[] = [];
  constructor() { 
    this.additionalRoles = [new AdditionalRole(1, 'Detevtive', false,true),
                            new AdditionalRole(2, 'Boss', true, true),
                            new AdditionalRole(3, 'Kot', false, false)];
  }

  fetchAdditionalRoles(){
    return this.additionalRoles;
  }
  fetchGameMessages(){
    let messagesMap = new Map();
    messagesMap.set('MAF', new Message('Mafia'));
    messagesMap.set('ALL', new Message('Wszyscy'));
    return messagesMap;
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
