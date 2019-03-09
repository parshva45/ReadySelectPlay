import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRmNameComponent } from './set-rm-name.component';

describe('SetRmNameComponent', () => {
  let component: SetRmNameComponent;
  let fixture: ComponentFixture<SetRmNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetRmNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRmNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
