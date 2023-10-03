import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MachineryRegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: MachineryRegisterComponent;
  let fixture: ComponentFixture<MachineryRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MachineryRegisterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MachineryRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
