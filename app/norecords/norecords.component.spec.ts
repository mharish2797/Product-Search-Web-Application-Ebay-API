import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorecordsComponent } from './norecords.component';

describe('NorecordsComponent', () => {
  let component: NorecordsComponent;
  let fixture: ComponentFixture<NorecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
