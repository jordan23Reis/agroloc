import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountLoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: AccountLoginComponent;
  let fixture: ComponentFixture<AccountLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
