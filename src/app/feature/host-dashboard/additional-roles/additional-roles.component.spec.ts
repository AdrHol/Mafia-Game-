import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalRolesComponent } from './additional-roles.component';

describe('AdditionalRolesComponent', () => {
  let component: AdditionalRolesComponent;
  let fixture: ComponentFixture<AdditionalRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionalRolesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdditionalRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
