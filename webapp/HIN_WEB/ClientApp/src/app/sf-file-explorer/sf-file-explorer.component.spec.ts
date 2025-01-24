import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfFileExplorerComponent } from './sf-file-explorer.component';

describe('SfFileExplorerComponent', () => {
  let component: SfFileExplorerComponent;
  let fixture: ComponentFixture<SfFileExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfFileExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfFileExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
