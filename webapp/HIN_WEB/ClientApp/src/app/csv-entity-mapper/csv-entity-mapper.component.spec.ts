import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvEntityMapperComponent } from './csv-entity-mapper.component';

describe('CsvEntityMapperComponent', () => {
  let component: CsvEntityMapperComponent;
  let fixture: ComponentFixture<CsvEntityMapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvEntityMapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvEntityMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
