import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationgridComponent } from './paginationgrid.component';

describe('PaginationgridComponent', () => {
  let component: PaginationgridComponent;
  let fixture: ComponentFixture<PaginationgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationgridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
