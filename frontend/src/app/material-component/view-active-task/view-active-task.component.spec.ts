import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActiveTaskComponent } from './view-active-task.component';

describe('ViewActiveTaskComponent', () => {
  let component: ViewActiveTaskComponent;
  let fixture: ComponentFixture<ViewActiveTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewActiveTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewActiveTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
