import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpartcatalogComponent } from './listpartcatalog.component';

describe('ListpartcatalogComponent', () => {
  let component: ListpartcatalogComponent;
  let fixture: ComponentFixture<ListpartcatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListpartcatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpartcatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
