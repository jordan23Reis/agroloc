import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessAluguelComponent } from './process-aluguel.component';

describe('ProcessAluguelComponent', () => {
  let component: ProcessAluguelComponent;
  let fixture: ComponentFixture<ProcessAluguelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessAluguelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcessAluguelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
