import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Role } from '../model/role';
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
  roles: Role[] = [];

  selectedRole : Role | undefined;  

  constructor(private roleService : RoleServiceService){}

  ngOnInit(){
    this.roles = this.roleService.getRoles();
  }

  selectRole(role : Role){
    this.selectedRole = role;
  }

}
