import { NgClass, NgFor } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { AdditionalRole } from '../../../shared/model/additionalRole';

@Component({
  selector: 'app-additional-roles',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './additional-roles.component.html',
  styleUrl: './additional-roles.component.css'
})
export class AdditionalRolesComponent {

  @ViewChild('additionalRoles')
  additionalRoles: any;
  
  @Input()
  roles!: AdditionalRole [];

  private checkedRoles: AdditionalRole[] = [];
  
  isVisible: boolean = false;
  appliedStyles = {
    'visible' : this.isVisible,
    'hidden' : !this.isVisible
  }

  constructor(){
    // this.roles = 
  }

  switchVisibility(){
    this.isVisible = !this.isVisible;
    this.appliedStyles = {
      'visible' : this.isVisible,
      'hidden' : !this.isVisible
    }
  }

  onCheckboxChange(role: AdditionalRole){
    const findRole = this.checkedRoles.findIndex(element => element.id === role.id);

    if(findRole >= 0){
      this.checkedRoles = this.checkedRoles.filter(roleElement => roleElement.id !== role.id);
    } else {
      this.checkedRoles.push(role);
    }

  }
  getCheckedRoles(){
    return this.checkedRoles;
  }
}
