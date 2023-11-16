import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsAutomobileComponent } from './details-automobile.component';

describe('DetailsAutomobileComponent', () => {
  let component: DetailsAutomobileComponent;
  let fixture: ComponentFixture<DetailsAutomobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsAutomobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsAutomobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
