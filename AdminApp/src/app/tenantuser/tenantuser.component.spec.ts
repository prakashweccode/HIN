import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantuserComponent } from './tenantuser.component';

describe('TenantuserComponent', () => {
  let component: TenantuserComponent;
  let fixture: ComponentFixture<TenantuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
