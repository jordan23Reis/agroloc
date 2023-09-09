import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MobRegisterComponent } from './mob-register.component';

describe('MobRegisterComponent', () => {
  let component: MobRegisterComponent;
  let fixture: ComponentFixture<MobRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MobRegisterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
