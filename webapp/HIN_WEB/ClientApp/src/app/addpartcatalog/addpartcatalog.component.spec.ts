import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpartcatalogComponent } from './addpartcatalog.component';

describe('AddpartcatalogComponent', () => {
  let component: AddpartcatalogComponent;
  let fixture: ComponentFixture<AddpartcatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpartcatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpartcatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
