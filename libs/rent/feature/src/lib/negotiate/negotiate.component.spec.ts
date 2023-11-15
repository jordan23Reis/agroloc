import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NegotiateComponent } from './negotiate.component';

describe('NegotiateComponent', () => {
  let component: NegotiateComponent;
  let fixture: ComponentFixture<NegotiateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NegotiateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NegotiateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
