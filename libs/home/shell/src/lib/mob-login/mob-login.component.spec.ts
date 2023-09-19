import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MobLoginComponent } from './mob-login.component';

describe('MobLoginComponent', () => {
  let component: MobLoginComponent;
  let fixture: ComponentFixture<MobLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MobLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
