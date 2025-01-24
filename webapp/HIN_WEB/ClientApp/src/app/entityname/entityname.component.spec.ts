import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitynameComponent } from './entityname.component';

describe('EntitynameComponent', () => {
  let component: EntitynameComponent;
  let fixture: ComponentFixture<EntitynameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitynameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitynameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
