import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnedriveExplorerComponent } from './onedrive-explorer.component';

describe('OnedriveExplorerComponent', () => {
  let component: OnedriveExplorerComponent;
  let fixture: ComponentFixture<OnedriveExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnedriveExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnedriveExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
