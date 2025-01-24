import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeventshowComponent } from './listeventshow.component';

describe('ListeventshowComponent', () => {
  let component: ListeventshowComponent;
  let fixture: ComponentFixture<ListeventshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeventshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeventshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
