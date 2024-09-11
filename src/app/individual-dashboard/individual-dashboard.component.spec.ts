import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualDashboardComponent } from './individual-dashboard.component';

describe('IndividualDashboardComponent', () => {
  let component: IndividualDashboardComponent;
  let fixture: ComponentFixture<IndividualDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndividualDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
