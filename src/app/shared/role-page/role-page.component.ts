import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RoleDTO } from '../model/roleDTO';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RoleServiceService } from './role-service.service';
@Component({
  selector: 'app-role-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './role-page.component.html',
  styleUrl: './role-page.component.css'
})
export class RolePageComponent implements OnInit {
  roles: RoleDTO[] = [];

  selectedRole : RoleDTO | undefined;  

  constructor(private roleService : RoleServiceService){}

  ngOnInit(){
    this.getRoles();
  }

  selectRole(role : RoleDTO){
    this.selectedRole = role;
  }
  private getRoles(){
    this.roleService.fetchRoles().subscribe(callFromSub => this.roles = callFromSub);
  }
}
