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

  private checkedRoles: number[] = [];
  
  isVisible: boolean = false;
  appliedStyles = {
    'visible' : this.isVisible,
    'hidden' : !this.isVisible
  }

  constructor(){
    // this.roles = [];
  }

  switchVisibility(){
    this.isVisible = !this.isVisible;
    this.appliedStyles = {
      'visible' : this.isVisible,
      'hidden' : !this.isVisible
    }
  }

  onCheckboxChange(roleId: number){
    if(this.checkedRoles.includes(roleId)){
      this.checkedRoles = this.checkedRoles.filter(element => element !== roleId);
    } else {
      this.checkedRoles.push(roleId);
    }
  }
  getCheckedRoles(){
    return this.checkedRoles;
  }
}
