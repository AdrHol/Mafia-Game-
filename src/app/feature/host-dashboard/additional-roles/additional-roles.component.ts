import { NgClass } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AdditionalRolesService } from './additional-roles.service';

@Component({
  selector: 'app-additional-roles',
  standalone: true,
  imports: [NgClass],
  templateUrl: './additional-roles.component.html',
  styleUrl: './additional-roles.component.css'
})
export class AdditionalRolesComponent {

  @ViewChild('additionalRoles')
  additionalRoles: any;
  
  roles: string [];

  isVisible: boolean = false;
  appliedStyles = {
    'visible' : this.isVisible,
    'hidden' : !this.isVisible
  }

  constructor(private additionalRolesService AdditionalRolesService){
    this.roles = additionalRolesService.load();
  }

  switchVisibility(){
    this.isVisible = !this.isVisible;
    this.appliedStyles = {
      'visible' : this.isVisible,
      'hidden' : !this.isVisible
    }
  }
}
