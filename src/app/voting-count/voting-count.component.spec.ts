import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingCountComponent } from './voting-count.component';

describe('VotingCountComponent', () => {
  let component: VotingCountComponent;
  let fixture: ComponentFixture<VotingCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
